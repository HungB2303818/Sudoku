<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 flex items-center justify-center z-[9999]"
      style="background: rgba(2, 6, 23, 0.85); backdrop-filter: blur(8px)"
      @click.self="close"
    >
      <div
        class="difficulty-modal w-[360px] rounded-2xl p-7"
        style="
          background: linear-gradient(160deg, #0f172a 0%, #1e293b 100%);
          border: 1px solid rgba(148, 163, 184, 0.12);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.04) inset;
        "
      >
        <!-- Header -->
        <div class="text-center mb-7">
          <p class="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-1">Sudoku</p>
          <h2 class="text-xl font-bold text-slate-100">Chọn độ khó</h2>
        </div>

        <!-- EASY -->
        <button
          @click="handleClick('easy')"
          class="difficulty-btn w-full flex items-center gap-4 p-4 mb-3 rounded-xl transition-all duration-200"
          style="
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 78, 59, 0.15) 100%);
            border: 1px solid rgba(52, 211, 153, 0.2);
          "
          @mouseenter="e => applyHover(e, 'easy')"
          @mouseleave="e => removeHover(e, 'easy')"
        >
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
            style="background: linear-gradient(135deg, #10b981, #059669); box-shadow: 0 0 16px rgba(16,185,129,0.4)"
          >

          </div>
          <div class="text-left flex-1">
            <p class="font-bold text-emerald-400 text-sm tracking-wide">EASY</p>
            <p class="text-xs text-slate-400 mt-0.5">Nhiều gợi ý · Ít ô trống</p>
          </div>
          <span class="text-emerald-600 text-sm">›</span>
        </button>

        <!-- MEDIUM -->
        <button
          @click="handleClick('medium')"
          class="difficulty-btn w-full flex items-center gap-4 p-4 mb-3 rounded-xl transition-all duration-200"
          style="
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(120, 53, 15, 0.15) 100%);
            border: 1px solid rgba(251, 191, 36, 0.2);
          "
          @mouseenter="e => applyHover(e, 'medium')"
          @mouseleave="e => removeHover(e, 'medium')"
        >
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
            style="background: linear-gradient(135deg, #f59e0b, #d97706); box-shadow: 0 0 16px rgba(245,158,11,0.4)"
          >
          </div>
          <div class="text-left flex-1">
            <p class="font-bold text-amber-400 text-sm tracking-wide">MEDIUM</p>
            <p class="text-xs text-slate-400 mt-0.5">Cân bằng · Thử thách vừa phải</p>
          </div>
          <span class="text-amber-600 text-sm">›</span>
        </button>

        <!-- HARD -->
        <button
          @click="handleClick('hard')"
          class="difficulty-btn w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
          style="
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(127, 29, 29, 0.15) 100%);
            border: 1px solid rgba(252, 165, 165, 0.2);
          "
          @mouseenter="e => applyHover(e, 'hard')"
          @mouseleave="e => removeHover(e, 'hard')"
        >
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
            style="background: linear-gradient(135deg, #ef4444, #dc2626); box-shadow: 0 0 16px rgba(239,68,68,0.4)"
          >
          </div>
          <div class="text-left flex-1">
            <p class="font-bold text-red-400 text-sm tracking-wide">HARD</p>
            <p class="text-xs text-slate-400 mt-0.5">Ít gợi ý · Đề bài phức tạp</p>
          </div>
          <span class="text-red-700 text-sm">›</span>
        </button>

        <!-- Divider -->
        <div class="my-6" style="height: 1px; background: linear-gradient(90deg, transparent, rgba(148,163,184,0.15), transparent)"></div>

        <!-- Cancel -->
        <button
          @click="close"
          class="w-full py-2 text-slate-500 hover:text-slate-300 text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-150"
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const prop = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue", "handleStartGame"]);

const handleClick = (level) => {
  emit("update:modelValue", false);
  emit("handleStartGame", level);
};
const close = () => emit("update:modelValue", false);

const hoverStyles = {
  easy: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.25) 100%)',
    border: '1px solid rgba(52, 211, 153, 0.4)',
    boxShadow: '0 0 20px rgba(16,185,129,0.12)',
  },
  medium: {
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(120, 53, 15, 0.25) 100%)',
    border: '1px solid rgba(251, 191, 36, 0.4)',
    boxShadow: '0 0 20px rgba(245,158,11,0.12)',
  },
  hard: {
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(127, 29, 29, 0.25) 100%)',
    border: '1px solid rgba(252, 165, 165, 0.4)',
    boxShadow: '0 0 20px rgba(239,68,68,0.12)',
  },
}

const defaultStyles = {
  easy: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 78, 59, 0.15) 100%)',
    border: '1px solid rgba(52, 211, 153, 0.2)',
    boxShadow: 'none',
  },
  medium: {
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(120, 53, 15, 0.15) 100%)',
    border: '1px solid rgba(251, 191, 36, 0.2)',
    boxShadow: 'none',
  },
  hard: {
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(127, 29, 29, 0.15) 100%)',
    border: '1px solid rgba(252, 165, 165, 0.2)',
    boxShadow: 'none',
  },
}

function applyHover(e, mode) {
  const s = hoverStyles[mode]
  Object.assign(e.currentTarget.style, s)
}

function removeHover(e, mode) {
  const s = defaultStyles[mode]
  Object.assign(e.currentTarget.style, s)
}
</script>
