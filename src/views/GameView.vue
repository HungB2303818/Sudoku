<template>
  <div class="h-full w-full flex flex-col items-center px-6 pt-4 pb-4">

    <div class="w-full max-w-[500px] h-[70px] flex justify-between items-center">
      <button
        @click="goBack"
        class="text-slate-400 hover:text-white flex items-center gap-2 group transition-colors"
      >
        <span class="group-hover:-translate-x-1 transition-transform">←</span> Thoát
      </button>

      <div class="text-right">
        <p class="text-[10px] text-slate-500 uppercase font-black tracking-widest">
          Độ khó
        </p>
        <p class="text-emerald-400 font-mono font-bold text-lg">
          {{ store.difficulty?.toUpperCase() }}
        </p>
      </div>
    </div>

    <!-- BOARD -->
    <div class="flex-1 flex items-center justify-center w-full">
  <SudokuBoard
    v-if="store.isStarted"
    v-model="store.gameGrid"
    :initial-grid="store.initialGrid"
    class="aspect-square max-h-full max-w-full"
  />
</div>

    <!-- ACTIONS -->
    <div class="w-full max-w-[75vmin] grid grid-cols-2 gap-4 mt-8 mb-4">

      <button
        @click="store.autoSolve()"
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
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import SudokuBoard from '../components/SudokuBoard.vue'

const router = useRouter()
const store = useGameStore()

onMounted(() => {
  // Nếu vào /game mà chưa có game → quay về menu
  if (!store.isStarted) {
    router.push('/')
  }
})

const goBack = () => {
  router.push('/')
}
</script>