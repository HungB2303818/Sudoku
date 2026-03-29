<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-[#0a0f1e]/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
      @click.self="close"
    >
      <div
        class="relative w-full max-w-md bg-[#161b33] border border-white/10 rounded-[2rem] p-6 shadow-2xl"
      >
        <button
          @click="close"
          class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all active:scale-90 z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div class="flex bg-[#1f2644] p-1 rounded-2xl mb-8 mt-4 relative">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="flex-1 py-2 text-sm font-medium rounded-xl transition-all duration-300 relative z-10"
            :class="
              activeTab === tab.id
                ? 'text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            "
          >
            {{ tab.label }}
            <div
              v-if="activeTab === tab.id"
              class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl -z-10 shadow-[0_0_15px_rgba(79,70,229,0.5)]"
            ></div>
          </button>
        </div>
        <div
          v-if="activeTab === 'overview'"
          class="space-y-6 max-h-[65vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <div
            class="bg-slate-800/60 border border-slate-700 rounded-xl p-4 backdrop-blur-xl"
          >
            <div class="flex justify-between items-start">
              <div>
                <p class="text-slate-400 text-sm">Total Games</p>
                <p class="text-3xl font-bold text-white">
                  {{ store.totalGame }}
                </p>
                <p class="text-slate-500 text-sm">{{ store.totalWin }} wins</p>
              </div>
              <PuzzlePieceIcon class="w-6 h-6 text-cyan-300" />
            </div>
          </div>

          <div
            class="bg-slate-800/60 border border-slate-700 rounded-xl p-4 backdrop-blur-xl"
          >
            <div class="flex justify-between items-start">
              <div>
                <p class="text-slate-400 text-sm">Time Played</p>
                <p class="text-3xl font-bold text-white">
                  {{ formatTime(store.totalTime) }}
                </p>
                <p class="text-slate-500 text-sm">all time</p>
              </div>
              <ClockIcon class="w-6 h-6 text-cyan-300" />
            </div>
          </div>

          <div
            class="bg-slate-800/60 border border-slate-700 rounded-xl p-4 backdrop-blur-xl col-span-2 flex justify-between items-center"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 rounded-xl bg-yellow-500/20 flex items-center justify-center"
              >
                <LightBulbIcon class="w-6 h-6 text-yellow-400" />
              </div>

              <div>
                <p class="text-slate-400 text-sm">Total Hints Used</p>
                <p class="text-3xl font-bold text-white">
                  {{ store.totalHint }}
                </p>
                <p class="text-slate-500 text-sm">
                  avg {{ store.overallWinRate }} hints / game
                </p>
              </div>
            </div>

            <div class="space-y-2 w-32">
              <Bar label="E" color="bg-green-500" :value="30" />
              <Bar label="M" color="bg-yellow-400" :value="60" />
              <Bar label="H" color="bg-orange-500" :value="90" />
            </div>
          </div>

          <div
            class="bg-slate-800/60 border border-slate-700 rounded-xl p-4 backdrop-blur-xl col-span-2 flex items-center gap-6"
          >
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
        <!-- DIFFICULTY -->
        <div
          v-if="activeTab === 'difficulty'"
          class="space-y-6 max-h-[65vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <div
            v-for="level in difficultyLevels"
            :key="level.key"
            class="bg-[#1f2644]/40 border rounded-[2rem] p-5 relative overflow-hidden transition-all duration-300 hover:bg-[#1f2644]/60 shadow-xl"
            :style="{ borderColor: `rgba(${level.rgb}, 0.2)` }"
          >
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-3">
                <div
                  class="w-2.5 h-2.5 rounded-full shadow-[0_0_10px]"
                  :class="[level.colorClass, level.shadowClass]"
                ></div>
                <h3 class="text-white text-xl font-bold tracking-tight">
                  {{ level.label }}
                </h3>
              </div>
              <span class="text-slate-500 text-sm font-medium">
                {{ store.stats[level.key].totalGame }} games
              </span>
            </div>

            <div class="grid grid-cols-3 gap-3 mb-6">
              <div
                class="bg-[#161b33]/80 rounded-2xl p-4 text-center border border-white/5 group transition-all"
              >
                <TrophyIcon
                  class="w-5 h-5 mx-auto mb-2 opacity-70 group-hover:opacity-100"
                  :class="level.textClass"
                />
                <p class="text-2xl font-bold text-white">
                  {{ getLevelWinRate(level.key) }}%
                </p>
                <p
                  class="text-[10px] uppercase text-slate-500 font-bold tracking-tighter"
                >
                  Win Rate
                </p>
              </div>

              <div
                class="bg-[#161b33]/80 rounded-2xl p-4 text-center border border-white/5 group transition-all"
              >
                <ClockIcon
                  class="w-5 h-5 mx-auto mb-2 opacity-70 group-hover:opacity-100"
                  :class="level.textClass"
                />
                <p class="text-2xl font-bold text-white">
                  {{ getLevelAvgTime(level.key) }}
                </p>
                <p
                  class="text-[10px] uppercase text-slate-500 font-bold tracking-tighter"
                >
                  Avg Time
                </p>
              </div>

              <div
                class="bg-[#161b33]/80 rounded-2xl p-4 text-center border border-white/5 group transition-all"
              >
                <LightBulbIcon
                  class="w-5 h-5 mx-auto mb-2 opacity-70 group-hover:opacity-100"
                  :class="level.textClass"
                />
                <p class="text-2xl font-bold text-white">
                  {{ store.stats[level.key].totalHint }}
                </p>
                <p
                  class="text-[10px] uppercase text-slate-500 font-bold tracking-tighter"
                >
                  Hints
                </p>
              </div>
            </div>

            <div class="space-y-2">
              <div
                class="flex justify-between text-[11px] font-bold uppercase tracking-wider"
              >
                <span class="text-slate-500">Win rate progress</span>
                <span :class="[level.textClass]"
                  >{{ getLevelWinRate(level.key) }}%</span
                >
              </div>
              <div
                class="h-2.5 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/5"
              >
                <div
                  class="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px]"
                  :class="[level.colorClass, level.shadowClass, level.textClass]"
                  :style="{ width: `${getLevelWinRate(level.key)}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref } from "vue";
import { useGameStore } from "../stores/gameStore";
import ProgressRing from "../components/ProgressRing.vue";
import Bar from "../components/Bar.vue";

import {
  PuzzlePieceIcon,
  ClockIcon,
  LightBulbIcon,
  TrophyIcon,
} from "@heroicons/vue/24/outline";

const store = useGameStore();

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
const close = () => emit("update:modelValue", false);

const activeTab = ref("overview");
const tabs = [
  { id: "overview", label: "Overview" },
  { id: "difficulty", label: "Difficulty" },
];

const winRate = computed(() => {
  if (!store.totalGame) return 0;
  return Math.round((store.totalWin / store.totalGame) * 100);
});
// Cấu hình UI cho các cấp độ (không chứa dữ liệu logic)
const difficultyLevels = [
  {
    key: "easy",
    label: "Easy",
    colorClass: "bg-emerald-500",
    shadowClass: "shadow-emerald-500/80",
    textClass: "text-emerald-400",
    rgb: "16, 185, 129",
  },
  {
    key: "medium",
    label: "Medium",
    colorClass: "bg-amber-500",
    shadowClass: "shadow-amber-500/80",
    textClass: "text-amber-400",
    rgb: "245, 158, 11",
  },
  {
    key: "hard",
    label: "Hard",
    colorClass: "bg-red-500",
    shadowClass: "shadow-red-500",
    textClass: "text-red-400",
    rgb: "249, 115, 22",
  },
];

// Hàm tính Win Rate nhanh cho từng cấp độ (vì getter store chỉ tính overall)
const getLevelWinRate = (levelKey) => {
  const s = store.stats[levelKey];
  if (!s.totalGame) return 0;
  return Math.round((s.totalWin / s.totalGame) * 100);
};

// Hàm tính thời gian trung bình (mm:ss) cho từng cấp độ
const getLevelAvgTime = (levelKey) => {
  const s = store.stats[levelKey];
  if (!s.totalWin) return "00:00";
  const avg = Math.floor(s.totalTime / s.totalWin);
  const m = Math.floor(avg / 60);
  const s_rem = avg % 60;
  return `${m.toString().padStart(2, "0")}:${s_rem.toString().padStart(2, "0")}`;
};

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
}
</script>
