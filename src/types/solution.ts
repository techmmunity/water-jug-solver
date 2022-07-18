import type { StepActionEnum } from "../enums/step-action";
import type { JugEnum } from "enums/jug";

interface BaseAction {
	type: StepActionEnum;
}

interface FillAction extends BaseAction {
	type: StepActionEnum.FILL;
	jug: JugEnum;
}

interface EmptyAction extends BaseAction {
	type: StepActionEnum.EMPTY;
	jug: JugEnum;
}

interface TransferAction extends BaseAction {
	type: StepActionEnum.TRANSFER;
	originJug: JugEnum;
	destinationJug: JugEnum;
}

type Action = EmptyAction | FillAction | TransferAction;

export interface SolutionStep {
	smallerJugContent: number;
	largerJugContent: number;
	index: string;
	action: Action;
}

export interface WaterJugSolution {
	solvable: boolean;
	minSteps: number;
	smallerJugCapacity: number;
	largerJugCapacity: number;
	steps: Array<SolutionStep>;
}
