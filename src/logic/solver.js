import { isValid } from "./validator";
/**
 * Giải bảng Sudoku bằng thuật toán Backtracking.
 * @param {Array} board - Ma trận 9x9 sẽ bị thay đổi trực tiếp (in-place).
 * @returns {boolean} - Trả về true nếu tìm được lời giải.
 */

export function solveSudoku(board){
    for(let row=0;row<9;row++){
        for(let col=0;col<9;col++){
            //Tìm ô trống
            if(board[row][col] === 0){
                //Thử các số từ 1-9
                for(let num=1; num <= 9; num++){
                    if(isValid(board,row,col,num)){
                        board[col][row] = num;
                    }
                    //tiếp tục giải ô trống tiếp theo
                    if(solveSudoku(board)){
                        return true;
                    }
                    //Nếu ko giải được, đặt lại = 0 để backtracking
                    board[row][col]=0;
                }
            }
            //ko có số hợp lệ
            return false;
        }
    }
    //đã điền hết
    return true;
}