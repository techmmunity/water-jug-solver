/* eslint-disable @typescript-eslint/no-magic-numbers */
import { getBiggerJug, getSmallerJug } from "./helpers";

import { StepActionEnum } from "../enums/step-action";
import type { WaterJugSolution, SolutionStep } from "../types/solution";
import { JugEnum } from "enums/jug";

interface SolveInput {
	firstJugCapacity: number;
	secondJugCapacity: number;
	desiredAmount: number;
}

export const solve = ({
	firstJugCapacity,
	secondJugCapacity,
	desiredAmount,
}: SolveInput): WaterJugSolution => {
	const smallerJugCapacity = getSmallerJug(firstJugCapacity, secondJugCapacity);
	const biggerJugCapacity = getBiggerJug(firstJugCapacity, secondJugCapacity);

	// Smaller Jug has the desired amount

	if (smallerJugCapacity === desiredAmount) {
		return {
			solvable: true,
			minSteps: 1,
			smallerJugCapacity,
			biggerJugCapacity,
			steps: [
				{
					smallerJugContent: smallerJugCapacity,
					biggerJugContent: 0,
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.SMALLER,
					},
				},
			],
		};
	}

	// Bigger Jug has the desired amount

	if (biggerJugCapacity === desiredAmount) {
		return {
			solvable: true,
			minSteps: 1,
			smallerJugCapacity,
			biggerJugCapacity,
			steps: [
				{
					smallerJugContent: 0,
					biggerJugContent: biggerJugCapacity,
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.BIGGER,
					},
				},
			],
		};
	}

	// The sum of the capacities is the desired amount

	if (desiredAmount === smallerJugCapacity + biggerJugCapacity) {
		return {
			solvable: true,
			minSteps: 2,
			smallerJugCapacity,
			biggerJugCapacity,
			steps: [
				{
					smallerJugContent: smallerJugCapacity,
					biggerJugContent: 0,
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.SMALLER,
					},
				},
				{
					smallerJugContent: smallerJugCapacity,
					biggerJugContent: biggerJugCapacity,
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.BIGGER,
					},
				},
			],
		};
	}

	// Unsolvable

	const diffBetweenCapacities = biggerJugCapacity - smallerJugCapacity;

	if (!Number.isInteger(diffBetweenCapacities / desiredAmount)) {
		return {
			solvable: false,
			minSteps: 0,
			smallerJugCapacity,
			biggerJugCapacity,
			steps: [],
		};
	}

	// Start from the smaller bucket

	let smallerJug = smallerJugCapacity;
	let biggerJug = 0;

	const solutionSteps: Array<SolutionStep> = [
		{
			smallerJugContent: smallerJugCapacity,
			biggerJugContent: 0,
			action: {
				type: StepActionEnum.FILL,
				jug: JugEnum.SMALLER,
			},
		},
	];

	while (smallerJug !== desiredAmount && biggerJug !== desiredAmount) {
		const maxPouredAmount = Math.min(smallerJug, biggerJugCapacity - biggerJug);

		biggerJug += maxPouredAmount;
		smallerJug -= maxPouredAmount;
		solutionSteps.push({
			smallerJugContent: smallerJug,
			biggerJugContent: biggerJug,
			action: {
				type: StepActionEnum.TRANSFER,
				originJug: JugEnum.SMALLER,
				destinationJug: JugEnum.BIGGER,
			},
		});

		if (smallerJug === desiredAmount || biggerJug === desiredAmount) {
			return {
				solvable: true,
				minSteps: solutionSteps.length,
				smallerJugCapacity,
				biggerJugCapacity,
				steps: solutionSteps,
			};
		}

		if (smallerJug === 0) {
			smallerJug = smallerJugCapacity;
			solutionSteps.push({
				smallerJugContent: smallerJug,
				biggerJugContent: biggerJug,
				action: {
					type: StepActionEnum.FILL,
					jug: JugEnum.SMALLER,
				},
			});
		}

		if (biggerJug === biggerJugCapacity) {
			biggerJug = 0;
			solutionSteps.push({
				smallerJugContent: smallerJug,
				biggerJugContent: biggerJug,
				action: {
					type: StepActionEnum.EMPTY,
					jug: JugEnum.BIGGER,
				},
			});
		}
	}

	return {
		solvable: true,
		minSteps: solutionSteps.length,
		smallerJugCapacity,
		biggerJugCapacity,
		steps: solutionSteps,
	};
};
