<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-[#0a0f1e]/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
      @click.self="close"
    >
      <div
        class="relative w-full max-w-[350px] bg-[#161b33] border border-white/10 rounded-xl p-6 shadow-2xl"
      >
        <button
          @click="close"
          class="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="text-center mb-8">
          <p class="text-white font-bold text-lg mt-3">CHỌN ĐỘ KHÓ</p>
        </div>

        <div class="space-y-3">
          <button
            @click="handleClick('easy')"
            :class="[
              'w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300',
              'border border-white/10 bg-gradient-to-br from-white/5 to-white/0',
              'hover:bg-white/10 hover:border-white/20',
              'active:opacity-80',
            ]"
          >
            <!-- ICON -->
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border border-yellow-300/30 shadow-[inset_0_0_10px_rgba(255,215,0,0.25)]"
            >
              <span
                class="text-xl text-yellow-300 drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]"
              >
                ★
              </span>
            </div>

            <!-- TEXT -->
            <div class="text-left flex-1">
              <p class="font-semibold text-white text-base tracking-wide">
                Easy
              </p>
              <p class="text-xs text-white/50">Nhiều gợi ý - ít ô trống</p>
            </div>
          </button>

          <button
            @click="handleClick('medium')"
            :class="[
              'w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300',
              'border border-white/10 bg-gradient-to-br from-white/5 to-white/0',
              'hover:bg-white/10 hover:border-white/20',
              'active:opacity-80',
            ]"
          >
            <!-- ICON -->
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border border-yellow-300/30 shadow-[inset_0_0_10px_rgba(255,215,0,0.25)]"
            >
              <span
                class="text-lg text-yellow-300 drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]"
              >
                ★★
              </span>
            </div>

            <!-- TEXT -->
            <div class="text-left flex-1">
              <p class="font-semibold text-white text-base tracking-wide">
                Medium
              </p>
              <p class="text-xs text-white/50">Cân bằng - thử thách vừa phải</p>
            </div>
          </button>

          <button
            @click="handleClick('hard')"
            :class="[
              'w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300',
              'border border-white/10 bg-gradient-to-br from-white/5 to-white/0',
              'hover:bg-white/10 hover:border-white/20',
              'active:opacity-80',
            ]"
          >
            <!-- ICON -->
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border border-yellow-300/30 shadow-[inset_0_0_10px_rgba(255,215,0,0.25)]"
            >
              <div
                class="flex flex-col items-center leading-none text-lg text-yellow-300 drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]"
              >
                <span>★</span>
                <div class="flex gap-1 -mt-1">
                  <span v-for="i in 2" :key="i">★</span>
                </div>
              </div>
            </div>

            <!-- TEXT -->
            <div class="text-left flex-1">
              <p class="font-semibold text-white text-base tracking-wide">
                Hard
              </p>
              <p class="text-xs text-white/50">Đề bài phức tạp - ít gợi ý</p>
            </div>
          </button>
        </div>
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
</script>
