/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { SolutionStep } from "../../types/solution";

interface AddStepToPossibleSolutions {
	previousStep: SolutionStep;
	step: SolutionStep;
	possibleSolutions: Array<Array<SolutionStep>>;
}

export const addStepToPossibleSolutions = ({
	previousStep,
	step,
	possibleSolutions,
}: AddStepToPossibleSolutions) => {
	const possibleSolutionsClone = JSON.parse(
		JSON.stringify(possibleSolutions),
	) as Array<Array<SolutionStep>>;

	const found = possibleSolutionsClone.find(states => {
		const lastIndex = states.at(-1)!;

		return lastIndex.index === previousStep.index;
	});

	if (found) {
		found.push(step);

		return {
			possibleSolutions: possibleSolutionsClone,
			solutionDeep: found.length,
		};
	}

	const foundSecondFromLast = possibleSolutionsClone.find(states => {
		const secondFromLast = states.at(-2)!;

		return secondFromLast.index === previousStep.index;
	});

	if (foundSecondFromLast) {
		possibleSolutionsClone.push([...foundSecondFromLast.slice(0, -1), step]);

		return {
			possibleSolutions: possibleSolutionsClone,
			solutionDeep: foundSecondFromLast.length,
		};
	}

	possibleSolutionsClone.push([previousStep, step]);

	return {
		possibleSolutions: possibleSolutionsClone,
		solutionDeep: 2,
	};
};
