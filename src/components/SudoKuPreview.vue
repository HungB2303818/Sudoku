<script setup>
import { computed } from "vue";

// Tạo grid Sudoku mẫu (cố định)
const PREVIEW_GRID = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9],
];

// (tuỳ chọn) random nhẹ cho preview sinh động hơn
const grid = computed(() => {
  return PREVIEW_GRID.map(row =>
    row.map(cell => {
      if (cell === 0 && Math.random() > 0.8) {
        return Math.floor(Math.random() * 9) + 1;
      }
      return cell;
    })
  );
});

// border phải
const getBorderRight = (c) => {
  return (c + 1) % 3 === 0 && c !== 8
    ? "border-r-2 border-r-white/40"
    : "border-r border-r-white/10";
};

// border dưới
const getBorderBottom = (r) => {
  return (r + 1) % 3 === 0 && r !== 8
    ? "border-b-2 border-b-white/40"
    : "border-b border-b-white/10";
};

// highlight số
const isHighlight = (cell) => {
  return [3, 5, 7].includes(cell);
};
</script>

<template>
  <div
    class="grid grid-cols-9 border-2 border-white/30 rounded-lg overflow-hidden"
    style="width: 180px; height: 180px"
  >
    <template v-for="(row, r) in grid" :key="r">
      <div
        v-for="(cell, c) in row"
        :key="`${r}-${c}`"
        class="flex items-center justify-center"
        :class="[getBorderRight(c), getBorderBottom(r)]"
      >
        <span
          v-if="cell !== 0"
          :class="[
            'text-[9px] font-bold',
            isHighlight(cell) ? 'text-yellow-300' : 'text-white/70'
          ]"
        >
          {{ cell }}
        </span>
      </div>
    </template>
  </div>
</template>