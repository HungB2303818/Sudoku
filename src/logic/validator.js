export function isValid(board, row, col, num) {

    for (let i = 0; i < 9; i++) {

        // kiểm tra hàng
        if (board[row][i] === num && i !== col) {
            return false;
        }

        // kiểm tra cột
        if (board[i][col] === num && i !== row) {
            return false;
        }

        // kiểm tra khối 3x3
        const startRow = 3 * Math.floor(row / 3);
        const startCol = 3 * Math.floor(col / 3);

        const boxRow = startRow + Math.floor(i / 3);
        const boxCol = startCol + (i % 3);

        if (
            board[boxRow][boxCol] === num &&
            (boxRow !== row || boxCol !== col)
        ) {
            return false;
        }
    }

    return true;
}