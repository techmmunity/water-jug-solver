import { makeEmptyJugAction } from "./empty-jug";
import { makeFillJugAction } from "./fill-jug";
import { makeTransferJugAction } from "./transfer-jug";
import type { ActionsState } from "./types";

export const makeActions = (actionsState: ActionsState) => {
	const emptyJug = makeEmptyJugAction(actionsState);
	const fillJug = makeFillJugAction(actionsState);
	const transferJug = makeTransferJugAction(actionsState);

	return {
		emptyJug,
		fillJug,
		transferJug,
	};
};
