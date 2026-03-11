<template>
  <div class="min-h-screen flex flex-col">
    <!-- HEADER -->
    <div class="px-10 pt-6 flex justify-between items-center">
      <!--LEFT-->
      <button
        @click="goBack"
        class="text-slate-400 hover:text-white flex items-center gap-2 group transition-colors"
      >
        <span class="group-hover:-translate-x-1 transition-transform">←</span>
        Thoát
      </button>

      <!--RIGHT-->
      <div class="flex items-center gap-6">
        <!-- Hướng dẫn -->
        <button
          @click="showGuide = true"
          class="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
        </button>

        <!-- Độ khó -->
        <div class="text-right">
          <p
            class="text-[10px] text-slate-500 uppercase font-black tracking-widest"
          >
            Độ khó
          </p>
          <p class="text-emerald-400 font-sans font-bold text-lg">
            {{ store.difficulty?.toUpperCase() }}
          </p>
        </div>
      </div>
    </div>
    <GuideModal v-model="showGuide"></GuideModal>

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
      <div class="w-[260px] flex flex-col gap-6">
        <!-- TIMER CARD -->
        <div
          class="bg-slate-800/80 rounded-xl py-4 flex flex-col items-center shadow-lg"
        >
          <span class="text-xs text-slate-400 uppercase tracking-wider">
            Thời gian
          </span>

          <span class="text-3xl font-mono font-bold text-white tabular-nums">
            {{ store.formattedTime }}
          </span>
        </div>

        <!-- TOOL BUTTONS -->
        <div class="flex justify-between gap-3">
          <button
            @click="store.inputNumber(0)"
            class="flex-1 h-12 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition active:scale-95"
          >
            <BackspaceIcon class="w-7 h-7" />
          </button>

          <button
            @click="store.undo()"
            class="flex-1 h-12 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition active:scale-95"
          >
            <ArrowUturnLeftIcon class="w-7 h-7" />
          </button>

          <button
            @click="store.hint()"
            class="relative flex-1 h-12 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition active:scale-95"
          >
            <LightBulbIcon class="w-7 h-7" />

            <span
              class="absolute -top-1 -right-1 bg-cyan-400 text-xs text-black rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ store.remainingHints }}
            </span>
          </button>
        </div>

        <!-- NUMBER PAD -->
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="num in 9"
            :key="num"
            @click="store.inputNumber(num)"
            class="h-[65px] bg-slate-700 hover:bg-slate-600 rounded-lg text-2xl transition active:scale-95 flex items-center justify-center"
          >
            {{ num }}
          </button>
        </div>

        <!-- SOLVE BUTTON -->
        <button
          @click="solveGame"
          class="mt-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 py-3 rounded-xl font-bold text-white shadow-lg transition active:scale-95"
        >
          GIẢI VÉT CẠN
        </button>
      </div>
    </div>
    <WinModal :showWin="store.isCompleted"></WinModal>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/gameStore";

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

onMounted(() => {
  // Nếu vào /game mà chưa có game → quay về menu
  if (!store.isStarted && !store.isCompleted) {
    router.push("/");
    return;
  }
   store.startTimer();
});

const goBack = () => {
  router.push("/");
  store.stopTimer();
};

function solveGame() {
  store.autoSolve();
  store.stopTimer();
}
</script>
