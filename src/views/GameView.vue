<template>
  <div class="min-h-screen flex flex-col overflow-hidden">
    <div class="w-full flex flex-col flex-1 min-h-0">
      <!-- HEADER -->
      <div
        class="w-full px-6 sm:px-15 lg:px-10 pt-4 lg:pt-6 flex justify-between items-center flex-shrink-0"
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
          <span class="text-base lg:text-base">Thoát</span>
        </button>

        <!-- RIGHT -->
        <div class="flex items-center gap-3 sm:gap-4 lg:gap-6">
          <button
            @click="showGuide = true"
            class="w-9 h-9 flex items-center justify-center rounded-lg transition duration-200 hover:bg-white/10 hover:scale-110"
          >
            <BookOpenIcon class="w-8 h-8"></BookOpenIcon>
          </button>

          <div class="text-right">
            <p
              class="relative font-sans text-[9px] sm:text-sm text-slate-500 uppercase font-black tracking-widest"
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

      <div
        class="flex-1 flex flex-row items-center justify-center gap-8 px-6 py-4 min-h-0"
      >
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

        <!-- RIGHT PANEL -->
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
              @click="inputNumber(0)"
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
              @click="ui.toggleNoteMode()"
              :class="
                ui.noteMode
                  ? 'flex-1 h-9 sm:h-10 lg:h-12 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition active:scale-95 text-yellow-300'
                  : 'flex-1 h-9 sm:h-10 lg:h-12 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition active:scale-95'
              "
            >
              <PencilIcon class="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
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
              @click="inputNumber(num)"
              class="aspect-square bg-slate-700 hover:bg-slate-600 rounded-md sm:rounded-lg text-base sm:text-2xl lg:text-2xl transition active:scale-95 flex items-center justify-center"
            >
              {{ num }}
            </button>
          </div>
          <button
            @click="showSolveModal = true"
            class="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl font-bold text-white shadow-lg transition active:scale-95 text-xs sm:text-sm lg:text-base"
          >
            GIẢI VÉT CẠN
          </button>
        </div>
      </div>

      <WinModal v-model:showWin="showWinModal" />
      <ConfirmModal
        :is-open="showSolveModal && !store.isCompleted"
        @cancel="showSolveModal = false"
        @confirm="handleSolveConfirmed"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/gameStore";
import { useTimeStore } from "../stores/timeStore";
import { useUIStore } from "../stores/uiStore";

import {} from "@heroicons/vue/24/outline";

import {
  ArrowUturnLeftIcon,
  LightBulbIcon,
  BackspaceIcon,
  PencilIcon,
} from "@heroicons/vue/24/solid";

import { BookOpenIcon } from "@heroicons/vue/24/outline";
import SudokuBoard from "../components/SudokuBoard.vue";
import GuideModal from "../components/GuideModal.vue";
import WinModal from "../components/WinModal.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

const showGuide = ref(false);
const router = useRouter();
const store = useGameStore();
const time = useTimeStore();
const showWinModal = ref(false);
const ui = useUIStore();
const showSolveModal = ref(false);
watch(
  () => store.isCompleted,
  (completed) => {
    if (completed) {
      time.stopTimer();
      if (!store.isSolvedBySystem) {
        showWinModal.value = true;
      }
    }
  },
);

onMounted(() => {
  if (!store.isStarted && !store.isCompleted) {
    router.push("/");
    return;
  }

  if (!time.isRunning && !store.checkCompletion()) {
    time.startTimer();
  }
});
const goBack = () => {
  router.push("/");
  time.stopTimer();
};

const inputNumber = (num) => {
  if (store.checkCompletion()) return;

  const row = ui.selectedRow;
  const col = ui.selectedCol;

  if (row === null || col === null) return;
  if (store.initialGrid[row][col] !== 0) return;

  if (num === 0) {
    if (ui.noteMode) {
      if (ui.selectedNumber) {
        store.removeNote(row, col, ui.selectedNumber);
      } else {
        store.clearNotes(row, col);
      }
    } else {
      store.updateCell(row, col, 0);
    }
    return;
  }
  if (ui.noteMode) {
    store.toggleNote(row, col, num);
  } else {
    const isWin = store.updateCell(row, col, num);
    if (isWin) {
      time.stopTimer();
      store.recordWin(time.elapsedSeconds, store.hintCount);
    }
  }
};
function handleSolveConfirmed() {
  showSolveModal.value = false;
  store.autoSolve();
  // store.recordWin(time.elapsedSeconds, store.hintCount);
}
</script>
