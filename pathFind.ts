const validateInputs = (grid: Grid, start: number[], end: number[]): void => {
  if (start.length === 0) {
    throw new Error('Start vector cannot be empty');
  }
  if (end.length === 0) {
    throw new Error('End vector cannot be empty');
  }
  if (grid.length === 0) {
    throw new Error('Grid cannot be empty');
  }
  const [startX, startY] = start;
  if (startX < 0 || startX >= grid.length || startY < 0 || startY >= grid[0].length) {
    throw new Error('Start vector is out of range');
  }
  if (grid[startX][startY] === '#') {
    throw new Error('Start vector cannot be a blockage');
  }
  const [endX, endY] = end;
  if (endX < 0 || endX >= grid.length || endY < 0 || endY >= grid[0].length) {
    throw new Error('End vector is out of range');
  }
  if (grid[endX][endY] === '#') {
    throw new Error('End vector cannot be a blockage');
  }
};

export function pathFind(grid: Grid, start: Vector, end: Vector): number {
  validateInputs(grid, start, end);
  const [startX, startY] = start;
  const [endX, endY] = end;
  const queue: Vector[] = [[startX, startY]];
  const visited: boolean[][] = grid.map((row) => row.map((pos) => pos === '#'));
  const distance: number[][] = grid.map((row) => row.map((pos) => (pos === '#' ? -1 : 0)));
  visited[startX][startY] = true;
  while (queue.length > 0) {
    const [x, y] = queue.shift()!;
    if (x === endX && y === endY) {
      return distance[x][y];
    }
    const neighbours: Vector[] = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];
    for (const [neighbourX, neighbourY] of neighbours) {
      if (neighbourX < 0 || neighbourX >= grid.length || neighbourY < 0 || neighbourY >= grid[0].length) {
        continue;
      }
      if (visited[neighbourX][neighbourY]) {
        continue;
      }
      visited[neighbourX][neighbourY] = true;
      distance[neighbourX][neighbourY] = distance[x][y] + 1;
      queue.push([neighbourX, neighbourY]);
    }
  }
  return -1;
}
