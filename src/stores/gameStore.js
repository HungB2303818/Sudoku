import { defineStore } from "pinia";
import { createNewGame, solveBoard } from "../services/gameService";
import { validateBoard } from "../services/validationService";
import { getHint } from "../services/hintService";

function createEmptyBoard() {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

function createEmptyNotes() {
  return Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => []));
}

export const useGameStore = defineStore("game", {
  state: () => ({
    gameGrid: createEmptyBoard(),
    initialGrid: createEmptyBoard(),
    solution: createEmptyBoard(),
    notes: createEmptyNotes(),

    stats: {
      easy: { totalWin: 0, totalGame: 0, totalTime: 0, totalHint: 0 },
      medium: { totalWin: 0, totalGame: 0, totalTime: 0, totalHint: 0 },
      hard: { totalWin: 0, totalGame: 0, totalTime: 0, totalHint: 0 },
    },

    difficulty: "",
    createdAt: null,

    //BOARD STATE
    isStarted: false,
    isCompleted: false,
    isValidBoard: true,

    //FOR UNDO
    history: [],
    redoStack: [],

    //HINT
    lastHint: null,
    hintCount: 0,
    maxHints: 0,

    isSolvedBySystem: false,
  }),

  getters: {
    hasSavedGame: (state) => {
      return state.gameGrid.flat().some((v) => v !== 0);
    },
    remainingHints: (state) => {
      return state.maxHints - state.hintCount;
    },
    totalGame: (state) => {
      return Object.values(state.stats).reduce(
        (sum, diff) => sum + diff.totalGame,
        0,
      );
    },
    totalWin: (state) => {
      return Object.values(state.stats).reduce(
        (sum, diff) => sum + diff.totalWin,
        0,
      );
    },
    totalHint: (state) => {
      return Object.values(state.stats).reduce(
        (sum, diff) => sum + diff.totalHint,
        0,
      );
    },
    totalTime: (state) => {
      return Object.values(state.stats).reduce(
        (sum, diff) => sum + diff.totalTime,
        0,
      );
    },
    formattedTotalTime: (getters) => {
      const totalSeconds = getters.totalTime;
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      if (h > 0) {
        return `${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
      }
      return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    },
    overallWinRate: (getters) => {
      if (getters.totalGame === 0) return 0;
      return Math.round((getters.totalWin / getters.totalGame) * 100);
    },
  },
  actions: {
    startNewGame(level) {
      const game = createNewGame(level);

      this.gameGrid = game.gameGrid;
      this.initialGrid = game.initialGrid;
      this.solution = game.solution;
      this.stats[level].totalGame++;
      this.notes = createEmptyNotes();
      this.difficulty = game.difficulty;
      this.createdAt = game.createdAt;

      this.isStarted = true;
      this.isCompleted = false;
      this.isValidBoard = true;

      this.history = [];
      this.redoStack = [];

      this.hintCount = 0;
      this.lastHint = null;

      this.maxHints = game.maxHints;
      this.isSolvedBySystem = false;
      return { type: "START_GAME" };
    },

    updateCell(row, col, value) {
      if (this.initialGrid[row][col] !== 0) return;

      const oldValue = this.gameGrid[row][col];
      if (oldValue === value) return;

      this.history.push({
        row,
        col,
        prevValue: oldValue,
        newValue: value,
        prevNotes: [...this.notes[row][col]],
      });
      this.redoStack = [];

      this.gameGrid[row][col] = value;
      this.notes[row][col] = [];
      this.clearRelatedNotes(row, col, value);

      this.isValidBoard = validateBoard(this.gameGrid);

      return this.checkCompletion();
    },

    autoSolve() {
      const solved = solveBoard(this.gameGrid);

      if (solved) {
        this.isSolvedBySystem = true;
        this.gameGrid = solved;
        this.isValidBoard = true;
        this.isCompleted = true;
        return { type: "STOP_TIMER" };
      }
    },
    checkCompletion() {
      if (this.isCompleted) return true;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (this.gameGrid[r][c] !== this.solution[r][c]) {
            return false;
          }
        }
      }

      this.isCompleted = true;
      return true;
    },

    recordWin(timeSpent, hintsUsed) {
      const s = this.stats[this.difficulty];
      if (!this.isSolvedBySystem) {
        s.totalWin++;
      }
      s.totalTime += timeSpent;
      s.totalHint += hintsUsed;
      this.isCompleted = true;
      // this.isSolvedBySystem = false;
    },
    resetStats() {
      Object.keys(this.stats).forEach((key) => {
        this.stats[key] = {
          totalWin: 0,
          totalGame: 0,
          totalTime: 0,
          totalHint: 0,
        };
      });
    },
    //NOTE
    toggleNote(row, col, value) {
      // không cho note vào ô có số gốc hoặc đã nhập
      if (this.gameGrid[row][col] !== 0) return;

      const cellNotes = this.notes[row][col];

      if (cellNotes.includes(value)) {
        this.notes[row][col] = cellNotes.filter((v) => v !== value);
      } else {
        this.notes[row][col].push(value);
        this.notes[row][col].sort();
      }
    },

    clearRelatedNotes(row, col, value) {
      // row
      for (let c = 0; c < 9; c++) {
        this.removeNote(row, c, value);
      }

      // col
      for (let r = 0; r < 9; r++) {
        this.removeNote(r, col, value);
      }

      // box
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;

      for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
          this.removeNote(r, c, value);
        }
      }
    },
    //helper
    removeNote(row, col, value) {
      this.notes[row][col] = this.notes[row][col].filter((v) => v !== value);
    },
    clearNotes(row, col) {
      this.notes[row][col] = [];
    },
    loadGame(data) {
      this.$patch({
        gameGrid: data.gameGrid,
        initialGrid: data.initialGrid,
        solution: data.solution,
        notes: data.notes || createEmptyNotes(),
        difficulty: data.difficulty,
        createdAt: data.createdAt,
        isStarted: true,
        isRunning: true,
      });
    },

    undo() {
      if (!this.history.length) return;
      const last = this.history.pop();
      this.gameGrid[last.row][last.col] = last.prevValue;

      this.redoStack.push(last);

      this.notes[last.row][last.col] = last.prevNotes;

      this.isValidBoard = validateBoard(this.gameGrid);
      this.isCompleted = false;
      this.lastHint = null;
    },

    //HINT
    hint() {
      if (this.hintCount >= this.maxHints) return;
      const hint = getHint(this.gameGrid, this.solution);
      if (!hint) return;
      this.hintCount++;
      console.log(this.hintCount);
      this.updateCell(hint.row, hint.col, hint.value);

      this.lastHint = { row: hint.row, col: hint.col };
      this.stats[this.difficulty].totalHint++;
    },

    resetGame() {
      this.gameGrid = createEmptyBoard();
      this.initialGrid = createEmptyBoard();
      this.solution = createEmptyBoard();
      this.notes = createEmptyNotes();
      this.difficulty = "";
      this.createdAt = null;

      this.isStarted = false;
      this.isCompleted = false;
      this.isValidBoard = true;

      this.history = [];
      this.redoStack = [];

      this.hintCount = 0;
      this.lastHint = null;
    },
    resetStats() {
      this.totalGame = 0;
      this.totalWin = 0;
      this.totalHint = 0;
      this.totalTime = 0;
    },
  },

  persist: {
    key: "sudoku-game",
    storage: localStorage,
    paths: [
      "gameGrid",
      "initialGrid",
      "solution",
      "notes",
      "difficulty",
      "createdAt",
      "stats",
      "elapsedSeconds",
      "isRunning",
      "isCompleted",
      "hintCount",
      "maxHints",
    ],
    afterRestore: ({ store }) => {
      const hasGame = store.gameGrid.flat().some((v) => v !== 0);

      if (hasGame) {
        store.isStarted = true;
        store.isValidBoard = validateBoard(store.gameGrid);
        store.checkCompletion();

        if (store.isRunning) {
          store.startTimer();
        }
      }
    },
  },
});
