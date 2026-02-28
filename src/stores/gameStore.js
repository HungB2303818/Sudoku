import { defineStore } from 'pinia'
import { generateGame } from '../logic/generator'
import { solveSudoku } from '../logic/solver'
import { isValid } from '../logic/validator'

function createEmptyBoard() {
  return Array.from({ length: 9 }, () => Array(9).fill(0))
}

export const useGameStore = defineStore('game', {
  state: () => ({
    gameGrid: createEmptyBoard(),
    initialGrid: createEmptyBoard(),
    solution: createEmptyBoard(),

    difficulty: '',
    createdAt: null,

    isStarted: false,
    isCompleted: false,
    isValidBoard: true
  }),

  getters: {
  hasSavedGame: (state) => {
    return state.gameGrid.flat().some(v => v !== 0)
  }
},
  actions: {
    /**
     * Bắt đầu game mới
     */
    startNewGame(level) {
      const game = generateGame(level)

      this.gameGrid = game.currentBoard
      this.initialGrid = game.initialBoard
      this.solution = game.solutionBoard

      this.difficulty = game.meta.difficulty
      this.createdAt = game.meta.createdAt

      this.isStarted = true
      this.isCompleted = false
      this.isValidBoard = true
    },

    /**
     * Cập nhật 1 ô
     */
    updateCell(row, col, value) {
      // Không cho sửa ô gốc
      if (this.initialGrid[row][col] !== 0) return

      this.gameGrid[row][col] = value

      // Validate sau khi cập nhật
      this.isValidBoard = this.validateCurrentBoard()

      // Kiểm tra hoàn thành
      this.checkCompletion()
    },

    /**
     * Giải tự động
     */
    autoSolve() {
      const boardCopy = JSON.parse(JSON.stringify(this.gameGrid))

      if (solveSudoku(boardCopy)) {
        this.gameGrid = boardCopy
        this.isCompleted = true
        this.isValidBoard = true
      }
    },

    /**
     * Validate toàn bộ bảng
     */
    validateCurrentBoard() {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const value = this.gameGrid[r][c]
          if (value !== 0) {
            this.gameGrid[r][c] = 0
            const valid = isValid(this.gameGrid, r, c, value)
            this.gameGrid[r][c] = value
            if (!valid) return false
          }
        }
      }
      return true
    },

    /**
     * Kiểm tra hoàn thành
     */
    checkCompletion() {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (this.gameGrid[r][c] === 0) return
        }
      }

      if (this.validateCurrentBoard()) {
        this.isCompleted = true
      }
    },

    /**
     * Load từ file
     */
    loadGame(data) {
      this.$patch({
        gameGrid: data.gameGrid,
        initialGrid: data.initialGrid,
        solution: data.solution,
        difficulty: data.difficulty,
        createdAt: data.createdAt,
        isStarted: true
      })
    },

    /**
     * Reset toàn bộ
     */
    resetGame() {
      this.gameGrid = createEmptyBoard()
      this.initialGrid = createEmptyBoard()
      this.solution = createEmptyBoard()

      this.difficulty = ''
      this.createdAt = null

      this.isStarted = false
      this.isCompleted = false
      this.isValidBoard = true
    }
  },

  persist: {
    key: 'sudoku-game',
    storage: localStorage,
    paths: [
      'gameGrid',
      'initialGrid',
      'solution',
      'difficulty',
      'createdAt'
    ],
    afterRestore: ({ store }) => {
      const hasGame = store.gameGrid.flat().some(v => v !== 0)

      if (hasGame) {
        store.isStarted = true
        store.isValidBoard = store.validateCurrentBoard()
        store.checkCompletion()
      }
    }
  }
})