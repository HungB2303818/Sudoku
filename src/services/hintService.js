export function getHint(board, solution) {
  const emptyCells = [];

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        emptyCells.push({ row: r, col: c });
      }
    }
  }

  if (!emptyCells.length) return null;

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { row, col } = emptyCells[randomIndex];

  return {
    row,
    col,
    value: solution[row][col],
  };
}
