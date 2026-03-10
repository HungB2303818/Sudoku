<template>
  <Teleport to="body">
    <div
      v-if="store.isCompleted"
      @click.self="close"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]"
    >
      <div
        class="w-[320px] bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl space-y-5"
      >
        <!-- Icon -->
        <div class="text-5xl">🎉</div>

        <!-- Title -->
        <h2 class="text-2xl font-bold text-slate-100">Chúc mừng!</h2>

        <!-- Message -->
        <p class="text-slate-400">Bạn đã hoàn thành Sudoku</p>

        <!-- Divider -->
        <div class="border-t border-slate-700"></div>

        <!-- Action -->
        <button
          @click="close"
          class="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold text-white transition hover:scale-105 active:scale-95 shadow-lg shadow-cyan-900/30"
        >
          Chơi lại
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useGameStore } from "../stores/gameStore";

const store = useGameStore();

const close = () => {
  store.isCompleted = false;
};
</script>
