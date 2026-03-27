import { isValid } from "../logic/validator";

export function validateBoard(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const value = board[r][c];

      if (value !== 0) {
        board[r][c] = 0;
        const valid = isValid(board, r, c, value);
        board[r][c] = value;

        if (!valid) return false;
      }
    }
  }
  return true;
}
