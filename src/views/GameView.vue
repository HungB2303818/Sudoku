<template>
  <div class="min-h-screen flex flex-col overflow-hidden">
    <div class="w-full flex flex-col flex-1 min-h-0">
      <!-- HEADER -->
      <div
        class="w-full px-6 sm:px-6 lg:px-10 pt-4 lg:pt-6 flex justify-between items-center flex-shrink-0"
      >
        <!-- LEFT -->
        <button
          @click="goBack"
          class="text-slate-400 hover:text-white flex items-center gap-1.5 group transition-colors"
        >
          <span
            class="group-hover:-translate-x-1 transition-transform text-sm lg:text-base"
            >←</span
          >
          <span class="text-sm lg:text-base">Thoát</span>
        </button>

        <!-- RIGHT -->
        <div class="flex items-center gap-3 sm:gap-4 lg:gap-6">
          <button
            @click="showGuide = true"
            class="bg-slate-700 hover:bg-slate-600 p-1.5 sm:p-2 rounded-lg transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </button>

          <div class="text-right">
            <p
              class="text-[9px] sm:text-[10px] text-slate-500 uppercase font-black tracking-widest"
            >
              Độ khó
            </p>
            <p
              :class="[
                'font-bold text-sm sm:text-base lg:text-lg',
                {
                  'text-emerald-400': store.difficulty === 'easy',
                  'text-yellow-400': store.difficulty === 'medium',
                  'text-red-400': store.difficulty === 'hard',
                },
              ]"
            >
              {{ store.difficulty?.toUpperCase() }}
            </p>
          </div>
        </div>
      </div>

      <GuideModal v-model="showGuide" />

      <!-- MAIN CONTENT: luôn ngang, căn giữa theo chiều dọc -->
      <div
        class="flex-1 flex flex-row items-center justify-center gap-8 px-6 py-4 min-h-0"
      >
        <!-- BOARD: vuông, chiếm hết chiều cao khả dụng -->
        <div class="flex-shrink-0 flex items-center justify-center h-full">
          <div class="h-full aspect-square max-h-full">
            <SudokuBoard
              v-if="store.isStarted"
              v-model="store.gameGrid"
              :initial-grid="store.initialGrid"
              class="h-full w-full"
            />
          </div>
        </div>

        <!-- RIGHT PANEL: co giãn theo board -->
        <div
          class="flex flex-col flex-1 min-w-0 gap-3 sm:gap-3 lg:gap-6 max-w-[200px] sm:max-w-[220px] lg:max-w-[260px] xl:max-w-[300px]"
        >
          <!-- TIMER CARD -->
          <div
            class="bg-slate-800/80 rounded-lg sm:rounded-xl py-2 sm:py-3 lg:py-4 flex flex-col items-center shadow-lg"
          >
            <span
              class="text-[9px] sm:text-xs text-slate-400 uppercase tracking-wider"
              >Thời gian</span
            >
            <span
              class="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-white tabular-nums"
            >
              {{ time.formattedTime }}
            </span>
          </div>

          <!-- TOOL BUTTONS -->
          <div class="flex justify-between gap-1.5 sm:gap-2 lg:gap-3">
            <button
              @click="store.inputNumber(0)"
              class="flex-1 h-9 sm:h-10 lg:h-12 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition active:scale-95"
            >
              <BackspaceIcon class="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
            </button>

            <button
              @click="store.undo()"
              class="flex-1 h-9 sm:h-10 lg:h-12 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition active:scale-95"
            >
              <ArrowUturnLeftIcon class="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
            </button>

            <button
              @click="store.hint()"
              class="relative flex-1 h-9 sm:h-10 lg:h-12 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition active:scale-95"
            >
              <LightBulbIcon class="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
              <span
                class="absolute -top-1 -right-1 bg-cyan-400 text-[10px] text-black rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"
              >
                {{ store.remainingHints }}
              </span>
            </button>
          </div>

          <!-- NUMBER PAD -->
          <div class="grid grid-cols-3 gap-1 sm:gap-1.5 lg:gap-2">
            <button
              v-for="num in 9"
              :key="num"
              @click="store.inputNumber(num)"
              class="aspect-square bg-slate-700 hover:bg-slate-600 rounded-md sm:rounded-lg text-base sm:text-lg lg:text-2xl font-semibold transition active:scale-95 flex items-center justify-center"
            >
              {{ num }}
            </button>
          </div>

          <!-- SOLVE BUTTON -->
          <button
            @click="solveGame"
            class="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl font-bold text-white shadow-lg transition active:scale-95 text-xs sm:text-sm lg:text-base"
          >
            GIẢI VÉT CẠN
          </button>
        </div>
      </div>

      <WinModal :showWin="store.isCompleted" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/gameStore";
import { useTimeStore } from "../stores/timeStore";
import {
  ArrowUturnLeftIcon,
  BackspaceIcon,
  LightBulbIcon,
} from "@heroicons/vue/24/outline";

import SudokuBoard from "../components/SudokuBoard.vue";
import GuideModal from "../components/GuideModal.vue";
import WinModal from "../components/WinModal.vue";

const showGuide = ref(false);
const router = useRouter();
const store = useGameStore();
const time = useTimeStore();

onMounted(() => {
  if (!store.isStarted && !store.isCompleted) {
    router.push("/");
    return;
  }

  if (!time.isRunning && !store.isCompleted) {
    time.startTimer();
  }
});
const goBack = () => {
  router.push("/");
  time.stopTimer();
};

function solveGame() {
  const result = store.autoSolve();

  if (result?.type === "STOP_TIMER") {
    time.stopTimer();
  }
}
</script>
