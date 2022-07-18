/* eslint-disable @typescript-eslint/no-magic-numbers */

export const isEven = (nbr: number) => nbr % 2 === 0;

export const isOdd = (nbr: number) => !isEven(nbr);
