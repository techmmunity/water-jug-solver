/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getStepIndex } from "../get-step-index";

import type { ActionsState } from "./types";

import { JugEnum } from "../../../enums/jug";
import { StepActionEnum } from "../../../enums/step-action";
import type { SolutionStep } from "../../../types/solution";

export interface TransferJugInput {
	previousStep: SolutionStep;
	target: JugEnum;
}

export type TransferJugType = (p: TransferJugInput) => SolutionStep;

export const makeTransferJugAction =
	({ smallerJugCapacity, largerJugCapacity }: ActionsState) =>
	({ previousStep, target }: TransferJugInput): SolutionStep => {
		const { smallerJugContent, largerJugContent } = previousStep;

		const targetJugCapacity =
			target === JugEnum.SMALLER ? smallerJugCapacity : largerJugCapacity;

		const originContent =
			target === JugEnum.SMALLER ? smallerJugContent : largerJugContent;
		const destinationContent =
			target === JugEnum.SMALLER ? largerJugContent : smallerJugContent;

		const toAvailability = targetJugCapacity - originContent;

		const newDestinationContent = Math.min(
			originContent + destinationContent,
			targetJugCapacity,
		);

		const newOriginContent = Math.max(originContent - toAvailability, 0);

		const newSmallerJugContent =
			target === JugEnum.SMALLER ? newOriginContent : newDestinationContent;
		const newLargerJugContent =
			target === JugEnum.SMALLER ? newDestinationContent : newOriginContent;

		const index = getStepIndex({
			smallerJugContent: newSmallerJugContent,
			largerJugContent: newLargerJugContent,
		});

		return {
			smallerJugContent: newSmallerJugContent,
			largerJugContent: newLargerJugContent,
			index,
			action: {
				type: StepActionEnum.TRANSFER,
				originJug: target === JugEnum.SMALLER ? JugEnum.LARGER : target,
				destinationJug: target === JugEnum.SMALLER ? target : JugEnum.LARGER,
			},
		};
	};
