<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999]"
      @click.self="close"
    >
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-slate-800/60 border border-slate-700 rounded-xl p-4 backdrop-blur-xl">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-slate-400 text-sm">Total Games</p>
              <p class="text-3xl font-bold text-white">{{ store.totalGame }}</p>
              <p class="text-slate-500 text-sm">{{ store.totalWin }} wins</p>
            </div>
            <PuzzlePieceIcon class="w-6 h-6 text-cyan-300" />
          </div>
        </div>

        <div class="bg-slate-800/60 border border-slate-700 rounded-xl p-4 backdrop-blur-xl">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-slate-400 text-sm">Time Played</p>
              <p class="text-3xl font-bold text-white">{{ formatTime(store.totalTime) }}</p>
              <p class="text-slate-500 text-sm">all time</p>
            </div>
            <ClockIcon class="w-6 h-6 text-cyan-300" />
          </div>
        </div>

        <div class="bg-slate-800/60 border border-slate-700 rounded-xl p-4 backdrop-blur-xl col-span-2 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <div
              class="w-14 h-14 rounded-xl bg-yellow-500/20 flex items-center justify-center"
            >
              <LightBulbIcon class="w-6 h-6 text-yellow-400" />
            </div>

            <div>
              <p class="text-slate-400 text-sm">Total Hints Used</p>
              <p class="text-3xl font-bold text-white">{{ store.totalHint }}</p>
              <p class="text-slate-500 text-sm">avg {{ store.overallWinRate }} hints / game</p>
            </div>
          </div>

          <div class="space-y-2 w-32">
            <Bar label="E" color="bg-green-500" :value="30" />
            <Bar label="M" color="bg-yellow-400" :value="60" />
            <Bar label="H" color="bg-orange-500" :value="90" />
          </div>
        </div>

        <div class="bg-slate-800/60 border border-slate-700 rounded-xl p-4 backdrop-blur-xl col-span-2 flex items-center gap-6">
          <ProgressRing :percent="winRate" />

          <div>
            <p class="text-xl font-semibold text-white">Win Rate</p>
            <p class="text-slate-400">
              {{ store.totalWin }} wins out of {{ store.totalGame }} games
            </p>

            <div class="flex gap-4 mt-2">
              <span class="text-green-400">✔ {{ store.totalWin }}</span>
              <span class="text-red-400"
                >✖ {{ store.totalGame - store.totalWin }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from "vue";
import { useGameStore } from "../stores/gameStore";
import ProgressRing from "../components/ProgressRing.vue";
import Bar from "../components/Bar.vue";

import {
  PuzzlePieceIcon,
  ClockIcon,
  LightBulbIcon,
} from "@heroicons/vue/24/outline";

const store = useGameStore();

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const close = () => emit("update:modelValue", false);

const winRate = computed(() => {
  if (!store.totalGame) return 0;
  return Math.round((store.totalWin / store.totalGame) * 100);
});

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
}
</script>