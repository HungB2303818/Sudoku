<template>
  <div class="min-h-screen flex flex-col">

    <!-- HEADER -->
    <div class="px-10 pt-6 flex justify-between items-center">
      <button
        @click="goBack"
        class="text-slate-400 hover:text-white flex items-center gap-2 group transition-colors"
      >
        <span class="group-hover:-translate-x-1 transition-transform">←</span>
        Thoát
      </button>

      <div class="text-right">
        <p class="text-[10px] text-slate-500 uppercase font-black tracking-widest">
          Độ khó
        </p>
        <p class="text-emerald-400 font-sans font-bold text-lg">
          {{ store.difficulty?.toUpperCase() }}
        </p>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="flex justify-center items-start gap-12 flex-1 pt-15 px-5">

      <!-- LEFT: BOARD -->
      <div class="flex-1 flex items-center justify-center">
        <SudokuBoard
          v-if="store.isStarted"
          v-model="store.gameGrid"
          :initial-grid="store.initialGrid"
          class="aspect-square max-h-full"
        />
      </div>

      <!-- RIGHT: NUMBER PAD -->
      <div class="w-[260px] flex flex-col justify-between pt-15">

        <!--BUTTON-->
        <div class="flex gap-4 pb-5">
  <button
    @click="store.inputNumber(0)"
    class="w-[60px] h-[60px] rounded-full 
           bg-slate-600 hover:bg-slate-500
           font-bold transition active:scale-95
           flex items-center justify-center"
  >
    Xóa
  </button>

  <button
    @click="store.undo()"
    class="w-[60px] h-[60px] rounded-full 
           bg-slate-600 hover:bg-slate-500
           font-bold transition active:scale-95
           flex items-center justify-center"
  >
    Undo
  </button>

  <button
    class="w-[60px] h-[60px] rounded-full 
           bg-slate-600 hover:bg-slate-500
           font-bold transition active:scale-95
           flex items-center justify-center"
  >
    H
  </button>
</div>
        <!-- NUMBER GRID -->
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="num in 9"
            :key="num"
            @click="store.inputNumber(num)"
            class="h-[70px] bg-slate-700 hover:bg-slate-600 
                   text-2xl font-bold 
                   transition active:scale-95"
          >
            {{ num }}
          </button>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="flex flex-col gap-3 mt-6">
          <button
            @click="store.autoSolve()"
            class="bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition active:scale-95"
          >
            Giải Vét Cạn
          </button>
        </div>

      </div>

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
  console.log(Object.keys(store))
})

const goBack = () => {
  router.push('/')
}
</script>