/* eslint-disable @typescript-eslint/no-magic-numbers */

import { makeActions } from "./helpers/actions";
import { addStepToPossibleSolutions } from "./helpers/add-step-to-possible-solutions";
import { getJugs } from "./helpers/get-jugs";
import { getStates } from "./helpers/get-states";
import { getStepIndex } from "./helpers/get-step-index";
import { isEven, isOdd } from "./helpers/is-even-odd";
import { stepHasGoal } from "./helpers/state-has-goal";

import { JugEnum } from "../enums/jug";
import { StepActionEnum } from "../enums/step-action";
import type { WaterJugSolution, SolutionStep } from "../types/solution";

interface SolveInput {
	firstJugCapacity: number;
	secondJugCapacity: number;
	desiredAmount: number;
}
export const solve = ({
	firstJugCapacity,
	secondJugCapacity,
	desiredAmount,
}: // eslint-disable-next-line sonarjs/cognitive-complexity
SolveInput): WaterJugSolution => {
	const { smallerJugCapacity, largerJugCapacity } = getJugs({
		firstJugCapacity,
		secondJugCapacity,
	});

	const UNSOLVABLE: WaterJugSolution = {
		solvable: false,
		minSteps: 0,
		smallerJugCapacity,
		largerJugCapacity,
		steps: [],
	};

	// Desired amount can't be more water than the combined jugs.

	if (firstJugCapacity + secondJugCapacity < desiredAmount) {
		return UNSOLVABLE;
	}

	// If desired amount is odd and jugs are even, is impossible.

	if (
		isEven(firstJugCapacity) &&
		isEven(secondJugCapacity) &&
		isOdd(desiredAmount)
	) {
		return UNSOLVABLE;
	}

	// State

	const initialStep: SolutionStep = {
		smallerJugContent: 0,
		largerJugContent: 0,
		index: "0,0",
		action: {
			type: StepActionEnum.EMPTY,
			jug: JugEnum.SMALLER,
		},
	};

	const stepsToTryFrom: Array<SolutionStep> = [initialStep];
	let possibleSolutions: Array<Array<SolutionStep>> = [[initialStep]];
	const stepsMap = new Map();
	stepsMap.set(initialStep.index, []);

	const actions = makeActions({
		smallerJugCapacity,
		largerJugCapacity,
	});

	// Loop to solve

	while (stepsToTryFrom.length) {
		const previousStep = stepsToTryFrom.shift()!;
		const previousStepString = getStepIndex(previousStep);

		const nextStates = getStates({
			actions,
			previousStep,
		});

		for (const state of nextStates) {
			const stepString = getStepIndex(state);

			const seen = stepsMap.has(stepString);

			if (!seen) {
				stepsMap.set(stepString, []);
				stepsMap.get(previousStepString).push(stepString);

				const { possibleSolutions: newPossibleSolutions, solutionDeep } =
					addStepToPossibleSolutions({
						possibleSolutions,
						previousStep,
						step: state,
					});

				// eslint-disable-next-line max-depth
				if (solutionDeep >= 100) {
					return UNSOLVABLE;
				}

				possibleSolutions = newPossibleSolutions;

				stepsToTryFrom.push(state);
			}

			if (
				stepHasGoal({
					smallerJugContent: state.smallerJugContent,
					largerJugContent: state.largerJugContent,
					desiredAmount,
				})
			) {
				const solutionSteps = possibleSolutions
					.find(path => path.at(-1)?.index === state.index)!
					.slice(1);

				return {
					solvable: true,
					minSteps: solutionSteps.length,
					smallerJugCapacity,
					largerJugCapacity,
					steps: solutionSteps,
				};
			}
		}
	}

	return UNSOLVABLE;
};
