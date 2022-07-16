export const getSmallerJug = (
	firstJugCapacity: number,
	secondJugCapacity: number,
) =>
	firstJugCapacity < secondJugCapacity ? firstJugCapacity : secondJugCapacity;

export const getBiggerJug = (
	firstJugCapacity: number,
	secondJugCapacity: number,
) =>
	firstJugCapacity > secondJugCapacity ? firstJugCapacity : secondJugCapacity;
