import type { SolutionStep } from "../../types/solution";

export const getStepIndex = ({
	smallerJugContent,
	largerJugContent,
}: Pick<SolutionStep, "largerJugContent" | "smallerJugContent">) =>
	`${smallerJugContent},${largerJugContent}`;
