import { getSmallerJug } from "../../solution/helpers";

describe("getSmallerJug", () => {
	it("should return first jug (first is smaller)", () => {
		expect(getSmallerJug(5, 10)).toBe(5);
	});

	it("should return second jug (both same size)", () => {
		expect(getSmallerJug(5, 5)).toBe(5);
	});

	it("should return second jug (second is smaller)", () => {
		expect(getSmallerJug(10, 5)).toBe(5);
	});
});
