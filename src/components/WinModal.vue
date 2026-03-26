<template>
  <Teleport to="body">
    <div
      v-if="store.isCompleted"
      @click.self="close"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]"
    >
      <div
        class="w-[360px] bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl space-y-6"
      >
        <!-- Icon -->
        <div
          class="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-yellow-400/20 text-yellow-400 text-3xl"
        >
          ✨
        </div>

        <!-- Title -->
        <div class="space-y-1">
          <h2 class="text-2xl font-bold text-slate-100">Chúc mừng!</h2>
          <p class="text-slate-400 text-sm">Bạn đã hoàn thành Sudoku</p>
        </div>

        <!-- Stats -->
        <div class="space-y-3">
          <!-- Time -->
          <div
            class="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800 border border-slate-700"
          >
            <span class="text-slate-400 text-sm">Thời gian</span>
            <span class="text-slate-200 font-semibold">
              {{ time.formattedTime }}
            </span>
          </div>

          <!-- Difficulty -->
          <div
            class="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800 border border-slate-700"
          >
            <span class="text-slate-400 text-sm">Độ khó</span>
            <span class="text-slate-200 font-semibold">
              {{ store.difficulty }}
            </span>
          </div>

          <!-- Hints -->
          <div
            class="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800 border border-slate-700"
          >
            <span class="text-slate-400 text-sm">Gợi ý đã dùng</span>
            <span class="text-slate-200 font-semibold">
              {{ store.hintCount }}
            </span>
          </div>
        </div>

        <!-- Buttons -->
        <div class="space-y-3 pt-2">
          <button
            @click="close"
            class="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold text-white transition hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-900/30"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useGameStore } from "../stores/gameStore";
import { useTimeStore } from "../stores/timeStore"; 

defineProps({
  showWin: Boolean
})
const store = useGameStore();
const time = useTimeStore();

const close = () => {
  store.isCompleted = false;
};
</script>
