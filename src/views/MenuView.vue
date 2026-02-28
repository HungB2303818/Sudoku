<template>
  <div class="h-full w-full flex flex-col items-center justify-center space-y-14 animate-in fade-in duration-500">

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
        @click="continueGame"
        class="bg-slate-800/80 hover:bg-slate-700 border border-slate-700 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
      >
        Tiếp tục ván chơi
      </button>

    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'

const router = useRouter()
const store = useGameStore()

const handleStartGame = (level) => {
  store.startNewGame(level)
  router.push('/game')
}

const continueGame = () => {
  if (store.hasSavedGame) {
    store.isStarted = true
    router.push('/game')
  }
}
</script>