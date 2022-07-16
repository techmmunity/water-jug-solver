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
			biggerJugCapacity: 10,
			smallerJugCapacity: 2,
			steps: [
				{
					biggerJugContent: 0,
					smallerJugContent: 2,
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.SMALLER,
					},
				},
			],
		});
	});

	it("should work with biggerJugCapacity = desiredAmount", () => {
		const result = solve({
			firstJugCapacity: 2,
			secondJugCapacity: 10,
			desiredAmount: 10,
		});

		expect(result).toStrictEqual({
			solvable: true,
			minSteps: 1,
			biggerJugCapacity: 10,
			smallerJugCapacity: 2,
			steps: [
				{
					biggerJugContent: 10,
					smallerJugContent: 0,
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.BIGGER,
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
			minSteps: 4,
			biggerJugCapacity: 10,
			smallerJugCapacity: 2,
			steps: [
				{
					biggerJugContent: 0,
					smallerJugContent: 2,
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.SMALLER,
					},
				},
				{
					biggerJugContent: 2,
					smallerJugContent: 0,
					action: {
						type: StepActionEnum.TRANSFER,
						originJug: JugEnum.SMALLER,
						destinationJug: JugEnum.BIGGER,
					},
				},
				{
					biggerJugContent: 2,
					smallerJugContent: 2,
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.SMALLER,
					},
				},
				{
					biggerJugContent: 4,
					smallerJugContent: 0,
					action: {
						type: StepActionEnum.TRANSFER,
						originJug: JugEnum.SMALLER,
						destinationJug: JugEnum.BIGGER,
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
			minSteps: 4,
			biggerJugCapacity: 9,
			smallerJugCapacity: 3,
			steps: [
				{
					biggerJugContent: 0,
					smallerJugContent: 3,
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.SMALLER,
					},
				},
				{
					biggerJugContent: 3,
					smallerJugContent: 0,
					action: {
						type: StepActionEnum.TRANSFER,
						originJug: JugEnum.SMALLER,
						destinationJug: JugEnum.BIGGER,
					},
				},
				{
					biggerJugContent: 3,
					smallerJugContent: 3,
					action: {
						type: StepActionEnum.FILL,
						jug: JugEnum.SMALLER,
					},
				},
				{
					biggerJugContent: 6,
					smallerJugContent: 0,
					action: {
						type: StepActionEnum.TRANSFER,
						originJug: JugEnum.SMALLER,
						destinationJug: JugEnum.BIGGER,
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
			biggerJugCapacity: 2,
			smallerJugCapacity: 2,
			steps: [
				{
					biggerJugContent: 0,
					smallerJugContent: 2,
					action: {
						jug: JugEnum.SMALLER,
						type: StepActionEnum.FILL,
					},
				},
				{
					biggerJugContent: 2,
					smallerJugContent: 2,
					action: {
						jug: JugEnum.BIGGER,
						type: StepActionEnum.FILL,
					},
				},
			],
		});
	});

	it('should return "solvable: false"', () => {
		const result = solve({
			firstJugCapacity: 3,
			secondJugCapacity: 9,
			desiredAmount: 4,
		});

		expect(result).toStrictEqual({
			solvable: false,
			minSteps: 0,
			biggerJugCapacity: 9,
			smallerJugCapacity: 3,
			steps: [],
		});
	});

	it.todo("should work starting by the bigger jug and then removing water");
});
