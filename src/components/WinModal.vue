<template>
  <Teleport to="body">
    <div
      v-if="store.isCompleted"
      @click.self="close"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]"
    >
      <div class="bg-slate-800 p-8 rounded-2xl text-center space-y-4">
        <h2 class="text-2xl font-bold">🎉 Chúc mừng!</h2>
        <p>Bạn đã giải xong Sudoku</p>

        <button
          @click="close"
          class="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 rounded-lg font-bold"
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
