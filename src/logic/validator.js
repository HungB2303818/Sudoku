/**
 * Kiểm tra xem việc đặt một con số vào ô (row, col) có hợp lệ không.
 * @param {Array} board - Ma trận 2 chiều 9x9.
 * @param {number} row - Chỉ số hàng (0-8).
 * @param {number} col - Chỉ số cột (0-8).
 * @param {number} num - Con số cần kiểm tra (1-9).
 * @returns {boolean} - Trả về true nếu hợp lệ.
 */

export function isValid(board, row, col, num){
    for(let i=0;i<9;i++){
        //kiểm tra hàng ngang
        if(board[row][i] === num) return false;

        //kiểm tra hàng dọc
        if(board[i][col] === num ) return false;

        //kiểm tra khối 3x3
        //xác định tọa độ gốc của khối: (startRow, startCol) = (3*Math.floor(row/3), 3*Math.floor(col/3))
        const boxRow = 3*Math.floor(row/3)+Math.floor(i/3);
        const boxCol = 3*Math.floor(col/3) + i%3;
        if(board[boxRow][boxCol] === num) return false;
    }
    return true;
}