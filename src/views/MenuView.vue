<template>
  <div
    class="h-full w-full flex flex-col items-center justify-center space-y-14 animate-in fade-in duration-500"
  >
    <!-- Wrapper giới hạn chiều rộng, scale đẹp trên màn lớn -->
    <div
      class="w-full max-w-2xl xl:max-w-3xl flex flex-col items-center gap-12 xl:gap-16 px-8"
    >
      <!-- Header -->
      <div class="flex justify-between items-center w-full px-15">
        <button
          @click="showStatistic = true"
          class="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center transition-all hover:bg-white/[0.09] hover:border-white/20 active:scale-95"
        >
          <ChartBarIcon></ChartBarIcon>
        </button>

        <button @click="showGuide = true" class="w-10 h-10">
          <QuestionMarkCircleIcon></QuestionMarkCircleIcon>
        </button>
      </div>
      <div class="text-center space-y-4">
        <h1
          class="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-cyan-400 to-emerald-400 drop-shadow-lg"
        >
          SUDOKU
        </h1>
      </div>
      <div
        class="flex flex-col space-y-4 w-80 backdrop-blur-xl bg-slate-900/40 p-6 rounded-3xl border border-slate-800 shadow-2xl"
      >
        <!-- START GAME -->
        <button
          @click="showMode = true"
          class="group relative overflow-hidden rounded-2xl p-[2px] bg-gradient-to-r from-indigo-500 to-purple-600"
        >
          <div
            class="flex items-center justify-between bg-slate-900/80 rounded-2xl px-5 py-4 transition-all group-hover:bg-slate-900/60"
          >
            <!-- LEFT -->
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white text-xl"
              >
                ▶
              </div>

              <div class="text-left">
                <div class="text-white font-semibold text-lg">
                  Start New Game
                </div>
                <div class="text-slate-400 text-sm">Choose difficulty</div>
              </div>
            </div>

            <!-- RIGHT -->
            <div
              class="text-white text-xl opacity-70 group-hover:translate-x-1 transition"
            >
              ›
            </div>
          </div>
        </button>

        <!-- CONTINUE -->
        <button
          @click="continueGame"
          class="group relative overflow-hidden rounded-2xl p-[2px] bg-gradient-to-r from-cyan-500 to-blue-600"
        >
          <div
            class="flex items-center justify-between bg-slate-900/80 rounded-2xl px-5 py-4 transition-all group-hover:bg-slate-900/60"
          >
            <!-- LEFT -->
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white text-xl"
              >
                ↻
              </div>

              <div class="text-left">
                <div class="text-white font-semibold text-lg">
                  Continue Game
                </div>
                <div class="text-slate-400 text-sm">
                  Resume — {{ store.difficulty ?? '' }}
                  <div>{{ time.formattedTime }}</div>
                </div>
              </div>
            </div>

            <!-- RIGHT -->
            <div
              class="text-white text-xl opacity-70 group-hover:translate-x-1 transition"
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
import {useTimeStore} from "../stores/timeStore";
import { ref } from "vue";
import MenuModal from "../components/MenuModal.vue";
import StatisticModal from "../components/StatisticModal.vue";
import GuideModal from "../components/GuideModal.vue";

import {
  ChartBarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const store = useGameStore();
const time = useTimeStore();
const showMode = ref(false);
const showStatistic = ref(false);
const showGuide = ref(false);
const level = ref("");

const handleStartGame = (data) => {
  level.value = data;
  store.startNewGame(level.value);
  router.push("/game");
};

const continueGame = () => {
  if (store.hasSavedGame) {
    store.isStarted = true;
    router.push("/game");
  }
};
</script>
