<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 flex items-center justify-center z-[9999] px-4"
      style="background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(12px)"
      @click.self="close"
    >
      <div
        class="relative w-full max-w-[350px] bg-[#1a161f] rounded-[16px] p-8 shadow-2xl border border-white/5"
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
          <p class="text-white font-bold text-lg mt-3">
            CHỌN ĐỘ KHÓ
          </p>
        </div>

        <div class="space-y-3">
          <button
            @click="handleClick('easy')"
            :class="[
              'w-full flex items-center gap-4 p-4 rounded-[24px] transition-all duration-300 border',
            ]"
          >
            <div
              class="w-12 h-12 rounded-full bg-[#2d1b4d] flex items-center justify-center text-[#b19eff]"
            >
              <span class="text-xl">★</span>
            </div>
            <div class="text-left flex-1">
              <p class="font-bold text-white text-base">Easy</p>
              <p class="text-xs text-white/40">For a relaxing mental flow.</p>
            </div>
          </button>

          <button
            @click="handleClick('medium')"
            :class="[
              'w-full flex items-center gap-4 p-4 rounded-[24px] transition-all duration-300 border',
            ]"
          >
            <div
              class="w-12 h-12 rounded-full bg-white/5 flex flex-col items-center justify-center gap-0.5 text-[10px] text-white/60"
            >
              <span>★</span>
              <div class="flex gap-1 -mt-0.5"><span>★</span><span>★</span></div>
            </div>
            <div class="text-left flex-1">
              <p class="font-bold text-white text-base">Medium</p>
              <p class="text-xs text-white/40">A balanced challenge.</p>
            </div>
          </button>

          <button
            @click="handleClick('hard')"
            :class="[
              'w-full flex items-center gap-4 p-4 rounded-[24px] transition-all duration-300 border',
            ]"
          >
            <div
              class="w-12 h-12 rounded-full bg-white/5 flex flex-col items-center justify-center gap-0.5 text-[9px] text-white/40"
            >
              <span>★</span>
              <div class="flex gap-1 -mt-0.5"><span>★</span><span>★</span></div>
            </div>
            <div class="text-left flex-1">
              <p class="font-bold text-white text-base">Hard</p>
              <p class="text-xs text-white/40">Intense logical patterns.</p>
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
