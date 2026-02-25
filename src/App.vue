<template>
  <div class="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white font-sans">
    
    <!-- MENU -->
    <div 
      v-if="view === 'menu'" 
      class="h-full w-full flex flex-col items-center justify-center space-y-14 animate-in fade-in duration-500"
    >
      <div class="text-center space-y-4">
        <h1 class="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-cyan-400 to-emerald-400 drop-shadow-lg">
          SUDOKU
        </h1>
        <p class="text-slate-500 tracking-[0.35em] uppercase text-xs font-bold">
          Tauri Desktop Pro
        </p>
      </div>

      <div class="flex flex-col space-y-4 w-80 backdrop-blur-xl bg-slate-900/40 p-6 rounded-3xl border border-slate-800 shadow-2xl">
        
        <button 
          @click="handleStartGame('easy')" 
          class="bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/30"
        >
          Dễ (Easy)
        </button>

        <button 
          @click="handleStartGame('medium')" 
          class="bg-amber-600 hover:bg-amber-500 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/30"
        >
          Trung bình (Medium)
        </button>

        <button 
          @click="handleStartGame('hard')" 
          class="bg-rose-600 hover:bg-rose-500 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-900/30"
        >
          Khó (Hard)
        </button>

        <div class="relative py-4">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-800"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-slate-900 px-3 text-slate-600 font-bold rounded-full">
              Hoặc
            </span>
          </div>
        </div>

        <button 
          @click="onLoadGame" 
          class="bg-slate-800/80 hover:bg-slate-700 border border-slate-700 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
        >
          <span class="text-lg">📂</span> Tiếp tục ván chơi
        </button>

      </div>
    </div>

    <!-- GAME -->
    <div 
      v-else 
      class="h-full w-full flex flex-col items-center p-6 animate-in zoom-in-95 duration-300"
    >
      <div class="w-full max-w-[85vmin] flex justify-between items-center mb-6">
        
        <button 
          @click="view = 'menu'" 
          class="text-slate-400 hover:text-white flex items-center gap-2 group transition-colors"
        >
          <span class="group-hover:-translate-x-1 transition-transform">←</span> Thoát
        </button>

        <div class="text-right">
          <p class="text-[10px] text-slate-500 uppercase font-black tracking-widest">
            Độ khó
          </p>
          <p class="text-emerald-400 font-mono font-bold text-lg">
            {{ difficulty.toUpperCase() }}
          </p>
        </div>
      </div>

      <!-- BOARD -->
      <div class="relative p-[1px] rounded-xl bg-gradient-to-br from-cyan-500/20 to-transparent shadow-[0_0_50px_rgba(0,0,0,0.8)]">
  <div class="p-4 rounded-xl bg-[#0a0f1e]/90 backdrop-blur-3xl border border-white/5">
    <SudokuBoard
      v-model="gameGrid" 
      :initial-grid="initialGrid" 
      class="w-[75vmin] h-[75vmin] max-w-[500px]"
    />
  </div>
</div>

      <!-- ACTIONS -->
      <div class="w-full max-w-[75vmin] grid grid-cols-2 gap-4 mt-8 mb-4">
        
        <button 
          @click="handleAutoSolve" 
          class="bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold shadow-lg shadow-blue-900/30 transition-all hover:scale-[1.03] active:scale-95"
        >
          Giải Vét Cạn
        </button>

        <button 
          @click="onSaveGame" 
          class="bg-white text-slate-900 hover:bg-slate-100 py-4 rounded-xl font-bold shadow-lg transition-all hover:scale-[1.03] active:scale-95"
        >
          Lưu Trạng Thái
        </button>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import SudokuBoard from './components/SudokuBoard.vue';
import { generateGame } from './logic/generator';
import { solveSudoku } from './logic/solver';
import { saveGameToFile, loadGameFromFile } from './logic/storage';

// State quản lý giao diện
const view = ref('menu'); 
const difficulty = ref('');

// State quản lý dữ liệu game
const gameGrid = ref([]);
const initialGrid = ref([]);
const solution = ref([]);

/**
 * Xử lý khi bắt đầu game mới
 * Đáp ứng: "Chức năng tự sinh ô số"
 */
const handleStartGame = (level) => {
  difficulty.value = level;
  const game = generateGame(level);
  
  gameGrid.value = game.currentBoard;
  initialGrid.value = game.initialBoard;
  solution.value = game.solution;
  
  view.value = 'playing';
};

/**
 * Xử lý giải game bằng thuật toán vét cạn
 * Đáp ứng: "Chức năng giải ô số bằng phương pháp vét cạn"
 */
const handleAutoSolve = () => {
  // Chúng ta clone lại bảng hiện tại để tránh lỗi tham chiếu
  const boardToSolve = JSON.parse(JSON.stringify(gameGrid.value));
  
  if (solveSudoku(boardToSolve)) {
    gameGrid.value = boardToSolve;
  } else {
    alert("Không tìm thấy lời giải cho trạng thái hiện tại!");
  }
};

/**
 * Xử lý lưu game vào file
 * Đáp ứng: "Chức năng lưu thành file trạng thái hiện tại"
 */
const onSaveGame = async () => {
  const gameState = {
    gameGrid: gameGrid.value,
    initialGrid: initialGrid.value,
    solution: solution.value,
    difficulty: difficulty.value
  };
  
  const success = await saveGameToFile(gameState);
  if (success) console.log("Lưu thành công");
};

/**
 * Xử lý nạp game từ file
 * Đáp ứng: "Nạp file trạng thái hiện tại của game"
 */
const onLoadGame = async () => {
  const data = await loadGameFromFile();
  if (data) {
    gameGrid.value = data.gameGrid;
    initialGrid.value = data.initialGrid;
    solution.value = data.solution;
    difficulty.value = data.difficulty;
    view.value = 'playing';
  }
};
</script>

<style>
/* Reset mặc định để đảm bảo không có thanh trượt trên Desktop app */
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
  }
/* Hiệu ứng chuyển cảnh đơn giản */
.animate-in {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}
</style>