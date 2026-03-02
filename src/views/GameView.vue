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
          Hướng dẫn
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
      <div class="w-[260px] flex flex-col justify-between">
        <!--BUTTON-->
        <div class="flex items-center justify-end">
          <div
            class="flex flex-col items-end px-4 py-2 bg-slate-800/70 rounded-lg shadow-md"
          >
            <span class="text-xs uppercase tracking-wider text-slate-400">
              Thời gian
            </span>

            <span
              class="text-2xl font-mono font-bold text-white tabular-nums leading-tight"
            >
              {{ store.formattedTime }}
            </span>
          </div>
        </div>
        <div class="flex gap-4 pb-5">
          <button
            @click="store.inputNumber(0)"
            class="w-[60px] h-[60px] rounded-full bg-slate-600 hover:bg-slate-500 font-bold transition active:scale-95 flex items-center justify-center"
          >
            Xóa
          </button>

          <button
            @click="store.undo()"
            class="w-[60px] h-[60px] rounded-full bg-slate-600 hover:bg-slate-500 font-bold transition active:scale-95 flex items-center justify-center"
          >
            Undo
          </button>
          <button
            @click="store.hint()"
            class="w-[60px] h-[60px] rounded-full bg-slate-600 hover:bg-slate-500 font-bold transition active:scale-95 flex items-center justify-center"
          >
            Gợi ý<span>{{ store.remainingHints }}</span>
          </button>
        </div>
        <!-- NUMBER GRID -->
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="num in 9"
            :key="num"
            @click="store.inputNumber(num)"
            class="h-[70px] bg-slate-700 hover:bg-slate-600 text-2xl font-bold transition active:scale-95"
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/gameStore";
import SudokuBoard from "../components/SudokuBoard.vue";
import GuideModal from "../components/GuideModal.vue";

const showGuide = ref(false);
const router = useRouter();
const store = useGameStore();

onMounted(() => {
  // Nếu vào /game mà chưa có game → quay về menu
  if (!store.isStarted) {
    router.push("/");
  }
});

const goBack = () => {
  router.push("/");
};
</script>
