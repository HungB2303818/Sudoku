<template>
  <BackgroundNumber></BackgroundNumber>
  <div
    class="relative z-10 min-h-screen w-full flex flex-col items-center justify-center space-y-10 animate-in fade-in duration-500"
  >
    <div
      class="w-full max-w-2xl xl:max-w-3xl flex flex-col items-center gap-6 xl:gap-16 px-8"
    >
      <!-- Header -->
      <div class="flex justify-between items-center w-full px-5">
        <button
          @click="showStatistic = true"
          class="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/[0.09] hover:border-white/20 active:scale-95"
        >
          <ChartBarIcon></ChartBarIcon>
        </button>

        <button @click="showGuide = true" class="w-10 h-10">
          <BookOpenIcon></BookOpenIcon>
        </button>
      </div>
      <div class="text-center space-y-4 flex flex-col items-center">
        <SudokuPreview></SudokuPreview>

        <h1
          class="text-5xl font-black tracking-tighter text-[#c7d2fe] drop-shadow-[0_0_10px_rgba(199,210,254,0.2)]"
        >
          SUDOKU
        </h1>
      </div>
      <div class="flex flex-col space-y-4 w-75 p-4 rounded-3xl">
        <!-- START GAME -->
        <button
          @click="showMode = true"
          class="group relative overflow-hidden rounded-2xl"
        >
          <div
            class="flex items-center justify-between rounded-2xl px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 transition-all duration-300"
          >
            <!-- LEFT -->
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white text-xl"
              >
                ▶
              </div>

              <div class="text-left">
                <div class="text-white font-semibold text-base">
                  Start New Game
                </div>
                <div class="text-white/80 text-sm">Choose difficulty</div>
              </div>
            </div>

            <!-- RIGHT -->
            <div
              class="text-white text-xl opacity-80 group-hover:translate-x-1 transition"
            >
              ›
            </div>
          </div>
        </button>

        <!-- CONTINUE -->
        <button
          @click="continueGame"
          class="group relative overflow-hidden rounded-2xl"
        >
          <div
            class="flex items-center justify-between rounded-2xl px-5 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
          >
            <!-- LEFT -->
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white text-xl"
              >
                ↻
              </div>

              <div class="text-left">
                <div class="text-white font-semibold text-base">
                  Continue Game
                </div>
                <div class="text-white/80 text-sm">
                  {{ store.difficulty ?? "" }} - {{ time.formattedTime }}
                </div>
              </div>
            </div>

            <!-- RIGHT -->
            <div
              class="text-white text-xl opacity-80 group-hover:translate-x-1 transition"
            >
              ›
            </div>
          </div>
        </button>
      </div>
      <MenuModal
        v-model="showMode"
        @handleStartGame="handleStartGame"
      ></MenuModal>
      <StatisticModal v-model="showStatistic"></StatisticModal>
      <GuideModal v-model="showGuide"></GuideModal>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/gameStore";
import { useTimeStore } from "../stores/timeStore";
import { useUIStore } from "../stores/uiStore";
import { ref } from "vue";
import MenuModal from "../components/MenuModal.vue";
import StatisticModal from "../components/StatisticModal.vue";
import GuideModal from "../components/GuideModal.vue";
import SudokuPreview from "../components/SudoKuPreview.vue";
import BackgroundNumber from "../components/BackGroundNumber.vue";

import {
  ChartBarIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon
} from "@heroicons/vue/24/outline";

const router = useRouter();
const store = useGameStore();
const time = useTimeStore();
const ui = useUIStore();
const showMode = ref(false);
const showStatistic = ref(false);
const showGuide = ref(false);
const level = ref("");

const handleStartGame = (data) => {
  level.value = data;
  store.startNewGame(level.value);

  ui.clearSelection();
  ui.noteMode = false;
  time.resetTimer();
  time.startTimer();

  router.push("/game");
};

const continueGame = () => {
  if (store.hasSavedGame && !store.isCompleted) {
    store.isStarted = true;
    router.push("/game");
  }
};
</script>
