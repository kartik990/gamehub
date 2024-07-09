export function isSafe(
  board: string[][],
  r: number,
  c: number,
  val: string
): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[i][c] === val || board[r][i] === val) {
      return false;
    }
  }

  let startRow = r - (r % 3);
  let startCol = c - (c % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === val) {
        return false;
      }
    }
  }

  return true;
}
