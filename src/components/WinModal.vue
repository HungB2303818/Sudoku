<template>
  <Teleport to="body">
    <div
      v-if="showWin"
      @click.self="close"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]"
    >
      <div
        class="w-[360px] bg-[#161b33] border border-slate-700 rounded-2xl p-8 text-center shadow-2xl space-y-6"
      >
        <div
          class="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-green-400/10 ring-2 ring-green-400/40 text-green-400 text-3xl animate-bounce"
        >
          <PartyPopper class="w-9 h-9" />
        </div>

        <div class="space-y-1">
          <h2 class="text-2xl font-bold text-slate-100">Chúc mừng!</h2>
          <p class="text-slate-400 text-sm">Bạn đã hoàn thành Sudoku</p>
        </div>

        <div class="space-y-3">
          <div
            class="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800 border border-slate-700"
          >
            <span class="text-slate-400 text-sm">Thời gian</span>
            <span class="text-slate-200 font-semibold">
              {{ time.formattedTime }}
            </span>
          </div>

          <div
            class="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800 border border-slate-700"
          >
            <span class="text-slate-400 text-sm">Độ khó</span>
            <span class="text-slate-200 font-semibold">
              {{ store.difficulty }}
            </span>
          </div>

          <div
            class="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800 border border-slate-700"
          >
            <span class="text-slate-400 text-sm">Gợi ý đã dùng</span>
            <span class="text-slate-200 font-semibold">
              {{ store.hintCount }}
            </span>
          </div>
        </div>

        <div class="space-y-3 pt-2">
          <button
            @click="close"
            class="w-full py-3 rounded-xl bg-green-800 hover:bg-green-500 font-semibold text-white transition hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-900/30"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useGameStore } from "../stores/gameStore";
import { useTimeStore } from "../stores/timeStore";
import { PartyPopper } from "lucide-vue-next";
defineProps({
  showWin: Boolean,
});
const store = useGameStore();
const time = useTimeStore();

const emit = defineEmits(["update:showWin"]);
const close = () => {
  emit("update:showWin", false);
};
</script>
