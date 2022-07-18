interface StepHasGoal {
	smallerJugContent: number;
	largerJugContent: number;
	desiredAmount: number;
}

export const stepHasGoal = ({
	smallerJugContent,
	largerJugContent,
	desiredAmount,
}: StepHasGoal): boolean =>
	[smallerJugContent, largerJugContent].includes(desiredAmount) ||
	smallerJugContent + largerJugContent === desiredAmount;
