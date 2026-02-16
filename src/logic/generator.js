import { isValid } from "./validator";

function fillRandom(board){
    for(let row=0;row<9;row++){
        for(let col=0; col < 9; col++){
            if(board[row][col] === 0){
                let nums=[1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
                for(let num of nums){
                    if(isValid(board, row, col, num)){
                        board[row][col]=num;
                        if(fillRandom(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

export function generateGame(difficulty = 'easy'){
    //Tạo bảng đáp án
    let solutionBoard = Array.from({length: 9}, () => Array(9).fill(0));
    fillRandom(solutionBoard);

    //Tạo bảng chơi
    let puzzleBoard = solutionBoard.map(row => [...row]);

    //Xóa ô dựa trên độ khó
    let removedCells;
    if(difficulty = "easy") removedCells = 35;
    else if(difficulty = "medium") removedCells = 45;
    else removedCells = 55;
    
    while(removedCells > 0){
        let r = Math.floor(Math.random() * 9);
        let c = Math.floor(Math.random() * 9);
        if (puzzleBoard[r][c] != 0){
            puzzleBoard[r][c] = 0;
            removedCells--;
        }
    }
    //Trả về cấu trúc dữ liệu
    return {
        initialBoard: puzzleBoard.map(row => [...row]), //Bảng gốc
        currentBoard: puzzleBoard.map(row => [...row]), //Trạng thái hiện tại
        solution: solutionBoard,                        // Đáp án
        difficulty: difficulty,
        createAt: new Date().toISOString()
    };
}