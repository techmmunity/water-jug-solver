import type { EmptyJugType } from "./actions/empty-jug";
import type { FillJugType } from "./actions/fill-jug";
import type { TransferJugType } from "./actions/transfer-jug";

import { JugEnum } from "../../enums/jug";
import type { SolutionStep } from "../../types/solution";

export interface GetStates {
	actions: {
		emptyJug: EmptyJugType;
		fillJug: FillJugType;
		transferJug: TransferJugType;
	};
	previousStep: SolutionStep;
}

export const getStates = ({ actions, previousStep }: GetStates) => {
	const { emptyJug, fillJug, transferJug } = actions;

	return [
		fillJug({
			previousStep,
			target: JugEnum.SMALLER,
		}),
		fillJug({
			previousStep,
			target: JugEnum.LARGER,
		}),
		emptyJug({
			previousStep,
			target: JugEnum.SMALLER,
		}),
		emptyJug({
			previousStep,
			target: JugEnum.LARGER,
		}),
		transferJug({
			previousStep,
			target: JugEnum.SMALLER,
		}),
		transferJug({
			previousStep,
			target: JugEnum.LARGER,
		}),
	];
};
