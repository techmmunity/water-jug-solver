<div align="center">

<img src="https://github.com/techmmunity/water-jug-solver/raw/master/resources/banner.jpg" width="600" height="450">

# Techmmunity - Water Jug Challenge Solver

<a href="https://github.com/techmmunity/eslint-config">
	<img src="https://img.shields.io/badge/style%20guide-Techmmunity-01d2ce?style=for-the-badge" alt="Style Guide: Techmmunity">
</a>
<a href="https://coveralls.io/github/techmmunity/water-jug-solver?branch=master">
	<img src="https://img.shields.io/coveralls/github/techmmunity/water-jug-solver/master?style=for-the-badge" alt="Coveralls">
</a>
<a href="https://github.com/techmmunity/water-jug-solver/actions/workflows/coverage.yml">
	<img src="https://img.shields.io/github/workflow/status/techmmunity/water-jug-solver/tests?label=tests&logo=github&style=for-the-badge" alt="Tests">
</a>
<a href="https://www.npmjs.com/package/@techmmunity/water-jug-solver">
	<img src="https://img.shields.io/npm/v/@techmmunity/water-jug-solver.svg?color=CC3534&style=for-the-badge" alt="Npm">
</a>
<a href="https://www.npmjs.com/package/@techmmunity/water-jug-solver">
	<img src="https://img.shields.io/npm/dw/@techmmunity/water-jug-solver.svg?style=for-the-badge" alt="Downloads">
</a>

<br>
<br>

</div>

Given two water jugs with capacities X and Y litres. Initially, both the jugs are empty. Also given that there is an infinite amount of water available. The jugs do not have markings to measure smaller quantities.
One can perform the following operations on the jug:

- Fill any of the jugs completely with water.
- Pour water from one jug to the other until one of the jugs is either empty or full, (X, Y) -> (X – d, Y + d)
- Empty any of the jugs

The task is to determine whether it is possible to measure Z litres of water using both the jugs. And if true, print any of the possible ways.

**ALERT:** It still doesn't find the most efficient solution for all cases. If you want to fix this, please send a PR to this repo.

## Install

With Yarn:

```sh
yarn add @techmmunity/water-jug-solver
```

With NPM:

```sh
npm i @techmmunity/water-jug-solver
```

## Usage

With TypeScript:

```ts
import { solveWaterJugChallenge } from "@techmmunity/water-jug-solver";

console.log(
	solveWaterJugChallenge({
		firstJugCapacity: 2,
		secondJugCapacity: 10,
		desiredAmount: 4,
	})
);

// Output

{
	solvable: true,
	minSteps: 4,
	smallerJugCapacity: 2,
	biggerJugCapacity: 10,
	steps: [
		{
			smallerJugContent: 2,
			biggerJugContent: 0,
			action: {
				type: "FILL",
				bucket: "SMALLER",
			},
		},
		{
			smallerJugContent: 0,
			biggerJugContent: 2,
			action: {
				type: "TRANSFER",
				originJug: "SMALLER",
				destinationJug: "BIGGER",
			},
		},
		{
			smallerJugContent: 2,
			biggerJugContent: 2,
			action: {
				type: "FILL",
				bucket: "SMALLER",
			},
		},
		{
			smallerJugContent: 0,
			biggerJugContent: 4,
			action: {
				type: "TRANSFER",
				originJug: "SMALLER",
				destinationJug: "BIGGER",
			},
		},
	],
}
```

## How to contribute?

All the details about contributing to the project are [described here](https://github.com/techmmunity/base-project-services/blob/master/CONTRIBUTING.md).
