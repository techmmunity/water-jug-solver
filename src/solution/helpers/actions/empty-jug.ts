/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getStepIndex } from "../get-step-index";

import type { ActionsState } from "./types";

import { JugEnum } from "../../../enums/jug";
import { StepActionEnum } from "../../../enums/step-action";
import type { SolutionStep } from "../../../types/solution";

export interface EmptyJugInput {
	previousStep: SolutionStep;
	target: JugEnum;
}

export type EmptyJugType = (p: EmptyJugInput) => SolutionStep;

export const makeEmptyJugAction =
	(_state: ActionsState) =>
	({ previousStep, target }: EmptyJugInput): SolutionStep => {
		const { smallerJugContent, largerJugContent } = previousStep;

		return {
			smallerJugContent: target === JugEnum.SMALLER ? 0 : smallerJugContent,
			largerJugContent: target === JugEnum.LARGER ? 0 : largerJugContent,
			index: getStepIndex({ smallerJugContent, largerJugContent }),
			action: {
				type: StepActionEnum.EMPTY,
				jug: target,
			},
		};
	};
