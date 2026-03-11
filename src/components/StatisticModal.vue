<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999]"
      @click.self="close"
    >
      <div
        class="w-[420px] rounded-2xl p-8 bg-gradient-to-b from-[#0b2239] to-[#071829] border border-cyan-400/20 shadow-[0_0_40px_rgba(0,255,255,0.08)]"
      >
        <!-- TITLE -->
        <div class="text-center mb-8">
          <h2
            class="text-2xl font-bold tracking-wider text-cyan-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]"
          >
            GAME STATISTICS
          </h2>

          <div class="w-16 h-[3px] bg-cyan-400 mx-auto mt-2 rounded"></div>
        </div>

        <!-- STAT LIST -->
        <div class="space-y-5">
          <!-- Total Games -->
          <div
            class="flex items-center justify-between bg-[#0f2a44] border border-cyan-400/10 rounded-xl px-4 py-4 hover:shadow-[0_0_12px_rgba(0,255,255,0.2)] transition"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300 text-lg"
              >
                <PuzzlePieceIcon></PuzzlePieceIcon>
              </div>

              <span class="text-slate-300">Total Games</span>
            </div>

            <span
              class="text-cyan-300 font-bold text-lg drop-shadow-[0_0_6px_rgba(0,255,255,0.7)]"
            >
              {{ store.totalGame ?? 0 }}
            </span>
          </div>

          <!-- Time Played -->
          <div
            class="flex items-center justify-between bg-[#0f2a44] border border-cyan-400/10 rounded-xl px-4 py-4 hover:shadow-[0_0_12px_rgba(0,255,255,0.2)] transition"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300 text-lg"
              >
                <ClockIcon></ClockIcon>
              </div>

              <span class="text-slate-300">Time Played</span>
            </div>

            <span
              class="text-cyan-300 font-bold text-lg drop-shadow-[0_0_6px_rgba(0,255,255,0.7)]"
            >
              {{ formatTime(store.totalTime) ?? 0 }}
            </span>
          </div>

          <!-- Hints -->
          <div
            class="flex items-center justify-between bg-[#0f2a44] border border-cyan-400/10 rounded-xl px-4 py-4 hover:shadow-[0_0_12px_rgba(0,255,255,0.2)] transition"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300 text-lg"
              >
                <LightBulbIcon></LightBulbIcon>
              </div>

              <span class="text-slate-300">Hints Used</span>
            </div>

            <span
              class="text-cyan-300 font-bold text-lg drop-shadow-[0_0_6px_rgba(0,255,255,0.7)]"
            >
              {{ store.totalHint ?? 0 }}
            </span>
          </div>
        </div>

        <!-- BUTTON -->
        <button
          @click="close"
          class="mt-8 w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 text-black font-semibold tracking-wider hover:brightness-110 transition"
        >
          Quay lại
        </button>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import { useGameStore } from "../stores/gameStore";
import { PuzzlePieceIcon, ClockIcon, LightBulbIcon } from "@heroicons/vue/24/outline";

const store = useGameStore();

const prop = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const close = () => emit("update:modelValue", false);

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
}
</script>
