export function indexToPosition(row: number, col: number): string {
  const cols = "abcdefgh";
  const rows = "87654321";
  return `${cols[col]}${rows[row]}`;
}
