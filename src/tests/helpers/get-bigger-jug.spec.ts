import { getBiggerJug } from "solution/helpers";

describe("getBiggerJug", () => {
	it("should return first jug (first is bigger)", () => {
		expect(getBiggerJug(10, 5)).toBe(10);
	});

	it("should return second jug (both same size)", () => {
		expect(getBiggerJug(5, 5)).toBe(5);
	});

	it("should return second jug (second is bigger)", () => {
		expect(getBiggerJug(5, 10)).toBe(10);
	});
});
