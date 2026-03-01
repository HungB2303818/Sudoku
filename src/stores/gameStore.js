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
    isValidBoard: true,

    selectedRow: null,
    selectedCol: null,

    history: [],
    redoStack: []
  }),

  getters: {
  hasSavedGame: (state) => {
    return state.gameGrid.flat().some(v => v !== 0)
  }
},
  actions: {

    //UI
    selectCell(row, col) {
      if (this.initialGrid[row][col] !== 0) return
      this.selectedRow = row
      this.selectedCol = col
    },

    clearSelection() {
      this.selectedRow = null
      this.selectedCol = null
    },
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

      this.history = []
      this.redoStack = []

      this.clearSelection()
    },

    /**
     * Cập nhật 1 ô
     */
    updateCell(row, col, value) {
  // Không cho sửa ô gốc
  if (this.initialGrid[row][col] !== 0) return

  const oldValue = this.gameGrid[row][col]

  // Không lưu nếu không thay đổi
  if (oldValue === value) return

  // Lưu history
  this.history.push({
    row,
    col,
    prevValue: oldValue,
    newValue: value
  })

  // Clear redo nếu có thao tác mới
  this.redoStack = []

  this.gameGrid[row][col] = value

  this.isValidBoard = this.validateCurrentBoard()
  this.checkCompletion()
},

    inputNumber(value) {
      if (this.selectedRow === null) return

      this.updateCell(
        this.selectedRow,
        this.selectedCol,
        value
      )
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

    undo() {
  if (this.history.length === 0) return

  const lastMove = this.history.pop()

  this.gameGrid[lastMove.row][lastMove.col] = lastMove.prevValue

  this.redoStack.push(lastMove)

  this.isValidBoard = this.validateCurrentBoard()
  this.isCompleted = false
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

      this.history = []
      this.redoStack = []
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