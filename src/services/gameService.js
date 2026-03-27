import { generateGame } from "../logic/generator";
import { solveSudoku } from "../logic/solver";

export function createNewGame(level) {
  const game = generateGame(level);

  const hintByDifficulty = {
    easy: 5,
    medium: 3,
    hard: 2,
  };

  return {
    gameGrid: game.currentBoard,
    initialGrid: game.initialBoard,
    solution: game.solutionBoard,
    difficulty: game.meta.difficulty,
    createdAt: game.meta.createdAt,
    maxHints: hintByDifficulty[level],
  };
}

export function solveBoard(board) {
  const boardCopy = JSON.parse(JSON.stringify(board));

  const solved = solveSudoku(boardCopy);

  return solved ? boardCopy : null;
}
