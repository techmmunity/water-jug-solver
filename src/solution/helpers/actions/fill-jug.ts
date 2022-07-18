/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getStepIndex } from "../get-step-index";

import type { ActionsState } from "./types";

import { JugEnum } from "../../../enums/jug";
import { StepActionEnum } from "../../../enums/step-action";
import type { SolutionStep } from "../../../types/solution";

export interface FillJugInput {
	previousStep: SolutionStep;
	target: JugEnum;
}

export type FillJugType = (p: FillJugInput) => SolutionStep;

export const makeFillJugAction =
	({ smallerJugCapacity, largerJugCapacity }: ActionsState) =>
	({ previousStep, target }: FillJugInput): SolutionStep => {
		const { smallerJugContent, largerJugContent } = previousStep;

		const jugCapacity =
			target === JugEnum.SMALLER ? smallerJugCapacity : largerJugCapacity;

		const newSmallerJugContent =
			target === JugEnum.SMALLER ? jugCapacity : smallerJugContent;
		const newLargerJugContent =
			target === JugEnum.LARGER ? jugCapacity : largerJugContent;

		const index = getStepIndex({
			smallerJugContent: newSmallerJugContent,
			largerJugContent: newLargerJugContent,
		});

		return {
			smallerJugContent: newSmallerJugContent,
			largerJugContent: newLargerJugContent,
			index,
			action: {
				type: StepActionEnum.FILL,
				jug: target,
			},
		};
	};
