import { isValid } from "./validator"


//Tạo ma trận 9x9 rỗng
function createEmptyBoard() {
  return Array.from({ length: 9 }, () => Array(9).fill(0))
}


//Shuffle mảng (Fisher-Yates chuẩn)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

/**
 * Sinh full board hợp lệ bằng backtracking
 */
function fillBoard(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const numbers = shuffle([1,2,3,4,5,6,7,8,9])

        for (let num of numbers) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num

            if (fillBoard(board)) return true

            board[row][col] = 0
          }
        }

        return false
      }
    }
  }
  return true
}

/**
 * Số ô bị xóa theo độ khó
 */
function getRemovedCells(difficulty) {
  const levels = {
    easy: 35,
    medium: 45,
    hard: 55
  }

  return levels[difficulty] ?? levels.easy
}

/**
 * Xóa ô khỏi board
 */
function removeCells(board, difficulty) {
  let removed = getRemovedCells(difficulty)

  while (removed > 0) {
    const r = Math.floor(Math.random() * 9)
    const c = Math.floor(Math.random() * 9)

    if (board[r][c] !== 0) {
      board[r][c] = 0
      removed--
    }
  }

  return board
}

/**
 * Hàm public export
 */
export function generateGame(difficulty = "easy") {
  // 1. Tạo đáp án đầy đủ
  const solutionBoard = createEmptyBoard()
  fillBoard(solutionBoard)

  // 2. Tạo puzzle từ solution
  const puzzleBoard = solutionBoard.map(row => [...row])
  removeCells(puzzleBoard, difficulty)

  // 3. Trả về cấu trúc chuẩn
  return {
    meta: {
      difficulty,
      createdAt: Date.now()
    },
    initialBoard: puzzleBoard.map(row => [...row]),
    currentBoard: puzzleBoard.map(row => [...row]),
    solutionBoard: solutionBoard.map(row => [...row])
  }
}