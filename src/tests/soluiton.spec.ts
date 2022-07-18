import { solve } from "solution";

import { JugEnum } from "enums/jug";
import { StepActionEnum } from "enums/step-action";

describe("solve", () => {
	it("should work with smallerJugCapacity = desiredAmount", () => {
		const result = solve({
			firstJugCapacity: 2,
			secondJugCapacity: 10,
			desiredAmount: 2,
		});

		expect(result).toStrictEqual({
			solvable: true,
			minSteps: 1,
			smallerJugCapacity: 2,
			largerJugCapacity: 10,
			steps: [
				{
					smallerJugContent: 2,
					largerJugContent: 0,
					index: "2,0",
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.SMALLER,
					},
				},
			],
		});
	});

	it("should work with largerJugCapacity = desiredAmount", () => {
		const result = solve({
			firstJugCapacity: 2,
			secondJugCapacity: 10,
			desiredAmount: 10,
		});

		expect(result).toStrictEqual({
			solvable: true,
			minSteps: 1,
			smallerJugCapacity: 2,
			largerJugCapacity: 10,
			steps: [
				{
					smallerJugContent: 0,
					largerJugContent: 10,
					index: "0,10",
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.LARGER,
					},
				},
			],
		});
	});

	it("should work with even values", () => {
		const result = solve({
			firstJugCapacity: 2,
			secondJugCapacity: 10,
			desiredAmount: 4,
		});

		expect(result).toStrictEqual({
			solvable: true,
			minSteps: 2,
			smallerJugCapacity: 2,
			largerJugCapacity: 10,
			steps: [
				{
					smallerJugContent: 2,
					largerJugContent: 0,
					index: "2,0",
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.SMALLER,
					},
				},
				{
					smallerJugContent: 2,
					largerJugContent: 2,
					index: "2,2",
					action: {
						type: StepActionEnum.TRANSFER,
						originJug: JugEnum.LARGER,
						destinationJug: JugEnum.SMALLER,
					},
				},
			],
		});
	});

	it("should work with odd values", () => {
		const result = solve({
			firstJugCapacity: 3,
			secondJugCapacity: 9,
			desiredAmount: 6,
		});

		expect(result).toStrictEqual({
			solvable: true,
			minSteps: 2,
			smallerJugCapacity: 3,
			largerJugCapacity: 9,
			steps: [
				{
					smallerJugContent: 3,
					largerJugContent: 0,
					index: "3,0",
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.SMALLER,
					},
				},
				{
					smallerJugContent: 3,
					largerJugContent: 3,
					index: "3,3",
					action: {
						type: StepActionEnum.TRANSFER,
						destinationJug: JugEnum.SMALLER,
						originJug: JugEnum.LARGER,
					},
				},
			],
		});
	});

	it("should work with equal capacities", () => {
		const result = solve({
			firstJugCapacity: 2,
			secondJugCapacity: 2,
			desiredAmount: 4,
		});

		expect(result).toStrictEqual({
			solvable: true,
			minSteps: 2,
			smallerJugCapacity: 2,
			largerJugCapacity: 2,
			steps: [
				{
					smallerJugContent: 2,
					largerJugContent: 0,
					index: "2,0",
					action: {
						jug: JugEnum.SMALLER,
						type: StepActionEnum.FILL,
					},
				},
				{
					smallerJugContent: 2,
					largerJugContent: 2,
					index: "2,2",
					action: {
						jug: JugEnum.LARGER,
						type: StepActionEnum.FILL,
					},
				},
			],
		});
	});

	it('should return "solvable: false" (Solution require more than 100 steps)', () => {
		const result = solve({
			firstJugCapacity: 3,
			secondJugCapacity: 9,
			desiredAmount: 4,
		});

		expect(result).toStrictEqual({
			solvable: false,
			minSteps: 0,
			largerJugCapacity: 9,
			smallerJugCapacity: 3,
			steps: [],
		});
	});

	it("should work starting by the larger jug and then removing water", () => {
		const result = solve({
			firstJugCapacity: 3,
			secondJugCapacity: 5,
			desiredAmount: 4,
		});

		expect(result).toStrictEqual({
			solvable: true,
			minSteps: 3,
			smallerJugCapacity: 3,
			largerJugCapacity: 5,
			steps: [
				{
					smallerJugContent: 0,
					largerJugContent: 5,
					index: "0,5",
					action: {
						jug: JugEnum.LARGER,
						type: StepActionEnum.FILL,
					},
				},
				{
					smallerJugContent: 0,
					largerJugContent: 3,
					index: "0,3",
					action: {
						destinationJug: JugEnum.SMALLER,
						originJug: JugEnum.LARGER,
						type: StepActionEnum.TRANSFER,
					},
				},
				{
					smallerJugContent: 3,
					largerJugContent: 1,
					index: "3,1",
					action: {
						destinationJug: JugEnum.LARGER,
						originJug: JugEnum.LARGER,
						type: StepActionEnum.TRANSFER,
					},
				},
			],
		});
	});
});
