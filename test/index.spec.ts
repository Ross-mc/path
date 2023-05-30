import { pathFind } from '../pathFind';

describe('Path Find test', () => {
  describe('when given invalid inputs', () => {
    it('throws an error when given an empty start vector', () => {
      const grid: Grid = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
      ];
      const start: number[] = [];
      const end: Vector = [0, 0];
      // @ts-expect-error
      expect(() => pathFind(grid, start, end)).toThrowError();
    });
    it('throws an error when given an empty end vector', () => {
      const grid: Grid = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
      ];

      const start: Vector = [0, 0];
      const end: number[] = [];
      // @ts-expect-error
      expect(() => pathFind(grid, start, end)).toThrowError();
    });
    it('throws an error when given an empty grid', () => {
      const grid: Grid = [];
      const start: Vector = [0, 0];
      const end: Vector = [0, 0];
      expect(() => pathFind(grid, start, end)).toThrowError();
    });
    it('throws an error when given a grid where the start point is out of range', () => {
      const grid: Grid = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
      ];
      const start: Vector = [3, 3];
      const end: Vector = [0, 0];
      expect(() => pathFind(grid, start, end)).toThrowError();
    });
    it('throws an error when given a grid where the end point is out of range', () => {
      const grid: Grid = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
      ];
      const start: Vector = [0, 0];
      const end: Vector = [3, 3];
      expect(() => pathFind(grid, start, end)).toThrowError();
    });
    it('throws an error when given a grid where the start point is a blockage', () => {
      const grid: Grid = [
        ['#', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
      ];
      const start: Vector = [0, 0];
      const end: Vector = [0, 0];
      expect(() => pathFind(grid, start, end)).toThrowError();
    });
    it('throws an error when given a grid where the end point is a blockage', () => {
      const grid: Grid = [
        ['.', '.', '.'],
        ['.', '#', '.'],
        ['.', '.', '.'],
      ];
      const start: Vector = [0, 0];
      const end: Vector = [1, 1];
      expect(() => pathFind(grid, start, end)).toThrowError();
    });
  });

  describe("when given a grid where there's no path from start to end", () => {
    it('returns -1', () => {
      const grid: Grid = [
        ['.', '#', '.'],
        ['#', '#', '.'],
        ['.', '.', '.'],
      ];
      const start: Vector = [0, 0];
      const end: Vector = [2, 2];
      expect(pathFind(grid, start, end)).toBe(-1);
    });
  });

  describe('when given valid inputs, it returns the correct number of steps', () => {
    it('returns 4 for a 3x3 empty grid', () => {
      const grid: Grid = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
      ];
      const start: Vector = [0, 0];
      const end: Vector = [2, 2];
      expect(pathFind(grid, start, end)).toBe(4);
    });
    it('returns 4 for a 5x5 grid with blockages', () => {
      const grid: Grid = [
        ['.', '.', '#', '.', '.'],
        ['.', '#', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
      ];
      const start: Vector = [0, 1];
      const end: Vector = [4, 4];
      expect(pathFind(grid, start, end)).toBe(9);
    });
    it('returns 14 for a 7x7 grid with lots of blockages', () => {
      const grid: Grid = [
        ['.', '.', '#', '.', '.', '.', '.'],
        ['.', '.', '#', '.', '.', '.', '.'],
        ['.', '.', '#', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '#', '.', '#'],
        ['.', '.', '#', '#', '.', '.', '.'],
        ['.', '.', '#', '.', '.', '.', '.'],
        ['.', '.', '#', '.', '.', '.', '.'],
      ];
      const start: Vector = [0, 0];
      const end: Vector = [6, 6];
      expect(pathFind(grid, start, end)).toBe(14);
    });
    it('returns 6 for a 5x5 grid with a centrally located end goal', () => {
      const grid: Grid = [
        ['.', '.', '.', '.', '.'],
        ['.', '#', '#', '#', '.'],
        ['.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
      ];
      const start: Vector = [0, 1];
      const end: Vector = [3, 2];
      expect(pathFind(grid, start, end)).toBe(6);
    });
  });
});
