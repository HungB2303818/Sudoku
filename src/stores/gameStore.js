import { defineStore } from "pinia";
import { createNewGame, solveBoard } from "../services/gameService";
import { validateBoard } from "../services/validationService";
import { getHint } from "../services/hintService";

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

    //FOR UNDO
    history: [],
    redoStack: [],

    //HINT
    lastHint: null,
    hintCount: 0,
    maxHints: 0,

    //STATISTIC
    totalGame: 0,
    totalTime: 0,
    totalHint: 0,
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
    startNewGame(level) {
      const game = createNewGame(level);

      console.log("bucciarati", game);

      this.gameGrid = game.gameGrid;
      this.initialGrid = game.initialGrid;
      this.solution = game.solution;

      this.difficulty = game.difficulty;
      this.createdAt = game.createdAt;

      this.isStarted = true;
      this.isCompleted = false;
      this.isValidBoard = true;

      this.history = [];
      this.redoStack = [];

      this.hintCount = 0;
      this.hintCells = [];

      this.maxHints = game.maxHints;
      //STATISTIC
      this.totalGame++;

      return { type: "START_GAME" };
    },

    updateCell(row, col, value) {
      if (this.initialGrid[row][col] !== 0) return;

      const oldValue = this.gameGrid[row][col];
      if (oldValue === value) return;

      this.history.push({ row, col, prevValue: oldValue, newValue: value });
      this.redoStack = [];

      this.gameGrid[row][col] = value;

      this.isValidBoard = validateBoard(this.gameGrid);

      return this.checkCompletion();
    },

    autoSolve() {
      const solved = solveBoard(this.gameGrid);

      if (solved) {
        this.gameGrid = solved;
        this.isCompleted = true;
        this.isValidBoard = true;

        return { type: "STOP_TIMER" };
      }
    },
    checkCompletion() {
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
    loadGame(data) {
      this.$patch({
        gameGrid: data.gameGrid,
        initialGrid: data.initialGrid,
        solution: data.solution,
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

      this.isValidBoard = validateBoard(this.gameGrid);
      this.isCompleted = false;
      this.lastHint = null;
    },

    //HINT
    hint() {
      if (this.hintCount >= this.maxHints) return;

      const hint = getHint(this.gameGrid, this.solution);
      if (!hint) return;

      this.updateCell(hint.row, hint.col, hint.value);

      this.lastHint = { row: hint.row, col: hint.col };
      this.hintCount++;
    },

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
