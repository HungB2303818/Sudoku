import { defineStore } from "pinia";
import { generateGame } from "../logic/generator";
import { solveSudoku } from "../logic/solver";
import { isValid } from "../logic/validator";
import { useTimeStore } from "../stores/timeStore";

function createEmptyBoard() {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

export const useGameStore = defineStore("game", {
  state: () => ({
    gameGrid: createEmptyBoard(),
    initialGrid: createEmptyBoard(),
    solution: createEmptyBoard(),

    difficulty: "",
    createdAt: null,

    //BOARD STATE
    isStarted: false,
    isCompleted: false,
    isValidBoard: true,

    //CELL
    selectedRow: null,
    selectedCol: null,
    noteMode: false,

    //FOR UNDO
    history: [],
    redoStack: [],


    //HINT
    hintCells: [],
    hintCount: 0,
    maxHints: 0,

    //STATISTIC
    totalGame: 0,
    totalTime: 0,
    totalHint: 0
  }),

  getters: {
    hasSavedGame: (state) => {
      return state.gameGrid.flat().some((v) => v !== 0);
    },
    remainingHints: (state) => {
      return state.maxHints - state.hintCount;
    },
  },
  actions: {
    //UI
    selectCell(row, col) {
      if (this.initialGrid[row][col] !== 0) return;
      this.selectedRow = row;
      this.selectedCol = col;
    },


    clearSelection() {
      this.selectedRow = null;
      this.selectedCol = null;
    },
    /**
     * Bắt đầu game mới
     */
    startNewGame(level) {

      const game = generateGame(level);

      const timeStore = useTimeStore();
      timeStore.stopTimer();
      timeStore.resetTimer();
      timeStore.startTimer();

      this.gameGrid = game.currentBoard;
      this.initialGrid = game.initialBoard;
      this.solution = game.solutionBoard;

      this.difficulty = game.meta.difficulty;
      this.createdAt = game.meta.createdAt;

      this.isStarted = true;
      this.isCompleted = false;
      this.isValidBoard = true;

      this.history = [];
      this.redoStack = [];

      this.hintCount = 0;
      this.hintCells = [];
      
      const hintByDifficulty = {
        easy: 5,
        medium: 3,
        hard: 2
      }
      this.maxHints = hintByDifficulty[level];
      this.clearSelection();

      //STATISTIC
      this.totalGame++;

    },

    /**
     * Cập nhật 1 ô
     */
    updateCell(row, col, value) {
      // Không cho sửa ô gốc
      if (this.initialGrid[row][col] !== 0) return;

      const oldValue = this.gameGrid[row][col];

      // Không lưu nếu không thay đổi
      if (oldValue === value) return;

      // Lưu history
      this.history.push({
        row,
        col,
        prevValue: oldValue,
        newValue: value,
      });

      // Clear redo nếu có thao tác mới
      this.redoStack = [];

      this.gameGrid[row][col] = value;

      this.isValidBoard = this.validateCurrentBoard();
      this.checkCompletion();
    },

    inputNumber(value) {
      if (this.selectedRow === null) return;

      this.updateCell(this.selectedRow, this.selectedCol, value);

      this.checkCompletion();
    },
    /**
     * Giải tự động
     */
    autoSolve() {
      const boardCopy = JSON.parse(JSON.stringify(this.gameGrid));

      if (solveSudoku(boardCopy)) {
        this.gameGrid = boardCopy;
        this.isCompleted = true;
        this.isValidBoard = true;

        const timeStore = useTimeStore();
        timeStore.stopTimer();
      }
    },

    /**
     * Validate toàn bộ bảng
     */
    validateCurrentBoard() {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const value = this.gameGrid[r][c];
          if (value !== 0) {
            this.gameGrid[r][c] = 0;
            const valid = isValid(this.gameGrid, r, c, value);
            this.gameGrid[r][c] = value;
            if (!valid) return false;
          }
        }
      }
      return true;
    },

    /**
     * Kiểm tra hoàn thành
     */
    checkCompletion() {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (this.gameGrid[r][c] == 0) return;
        }
      }
      this.isCompleted = this.validateCurrentBoard();
      // this.isCompleted = true;

      //????????
      if(this.isCompleted){
        const timeStore = useTimeStore();
        timeStore.stopTimer();

        this.totalHint += this.hintCount;
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
        isStarted: true,
        isRunning: true
      });
      if(!this.isCompleted){
        this.startTimer();
      }
    },

    undo() {
      if (this.history.length === 0) return;

      const lastMove = this.history.pop();

      this.gameGrid[lastMove.row][lastMove.col] = lastMove.prevValue;

      this.redoStack.push(lastMove);

      this.isValidBoard = this.validateCurrentBoard();
      this.isCompleted = false;
    },

    //HINT
    hint() {
      if (this.hintCount >= this.maxHints) return;

      // 1. Lấy danh sách các ô trống
      const emptyCells = [];

      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (this.gameGrid[r][c] === 0) {
            emptyCells.push({ row: r, col: c });
          }
        }
      }

      // Không còn ô trống
      if (emptyCells.length === 0) return;

      // 2. Random một ô
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const { row, col } = emptyCells[randomIndex];

      // 3. Lấy giá trị đúng
      const correctValue = this.solution[row][col];

      // 4. Update bằng updateCell để giữ undo + validate
      this.updateCell(row, col, correctValue);

      this.hintCells.push({ row, col });

      this.hintCount++;
    },
    /**
     * Reset toàn bộ
     */
    resetGame() {
      this.gameGrid = createEmptyBoard();
      this.initialGrid = createEmptyBoard();
      this.solution = createEmptyBoard();

      this.difficulty = "";
      this.createdAt = null;

      this.isStarted = false;
      this.isCompleted = false;
      this.isValidBoard = true;

      this.history = [];
      this.redoStack = [];

      this.hintCount = 0;
      this.hintCells = [];
      
      this.elapsedSeconds = 0;
      this.resetTimer();
    },
  },

  persist: {
    key: "sudoku-game",
    storage: localStorage,
    paths: [
      "gameGrid",
      "initialGrid",
      "solution",
      "difficulty",
      "createdAt",
      "elapsedSeconds",
      "isRunning",
    ],
    afterRestore: ({ store }) => {
      const hasGame = store.gameGrid.flat().some((v) => v !== 0);

      if (hasGame) {
        store.isStarted = true;
        store.isValidBoard = store.validateCurrentBoard();
        store.checkCompletion();

        if (store.isRunning) {
          store.startTimer();
        }
      }
    },
  },
});
