<template>
  <div class="flex flex-col items-center gap-8 p-6 bg-slate-50 rounded-2xl shadow-inner">
    <div class="bg-slate-900 p-1.5 shadow-2xl rounded-xl overflow-hidden border-4 border-slate-900">
      <div v-for="(row, rIdx) in board" :key="rIdx" class="flex">
        <SudokuCell 
          v-for="(cell, cIdx) in row" 
          :key="cIdx"
          v-model="board[rIdx][cIdx]"
          :isBoldRight="(cIdx + 1) % 3 === 0 && cIdx !== 8"
          :isBoldBottom="(rIdx + 1) % 3 === 0 && rIdx !== 8"
        />
      </div>
    </div>

    <div class="flex gap-4">
      <button 
        @click="handleSolve" 
        class="flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-200"
      >
        <span>🪄</span> Giải tự động
      </button>
      
      <button 
        @click="clear" 
        class="flex items-center gap-2 bg-white text-slate-600 px-8 py-3 rounded-xl font-bold border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
      >
        <span>🗑️</span> Xóa bảng
      </button>
    </div>
  </div>
</template>

<script setup>
import SudokuCell from './SudokuCell.vue';
import { useSudoku } from '../composables/useSudoku';

const { board, solve } = useSudoku();

const handleSolve = () => {
  // Tạo bản sao sâu để thực hiện thuật toán đệ quy
  const gridCopy = JSON.parse(JSON.stringify(board.value));
  if (solve(gridCopy)) {
    board.value = gridCopy;
  } else {
    alert("Không tìm thấy lời giải cho bảng hiện tại!");
  }
};

const clear = () => {
  // Reset bảng về trạng thái trống
  board.value = Array(9).fill().map(() => Array(9).fill(0));
};
</script>