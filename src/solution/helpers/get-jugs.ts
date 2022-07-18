export interface GetJugsInput {
	firstJugCapacity: number;
	secondJugCapacity: number;
}

export const getJugs = ({
	firstJugCapacity,
	secondJugCapacity,
}: GetJugsInput) => {
	const [smaller, larger] = [firstJugCapacity, secondJugCapacity].sort(
		(a, b) => a - b,
	);

	return {
		smallerJugCapacity: smaller,
		largerJugCapacity: larger,
	};
};
