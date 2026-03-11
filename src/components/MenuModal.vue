<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]"
      @click.self="close"
    >
      <div
        class="w-[340px] rounded-2xl p-6 bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700 shadow-2xl"
      >
        <!-- title -->
        <h2 class="text-center text-lg font-semibold text-slate-200 mb-6">
          Chọn độ khó
        </h2>

        <!-- EASY -->
        <button
          @click="handleClick('easy')"
          class="w-full flex items-center gap-4 p-4 mb-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition"
        >
          <div class="text-left">
            <p class="font-semibold text-slate-200">Easy</p>
            <p class="text-sm text-slate-400">Nhiều gợi ý, ít ô trống hơn</p>
          </div>
        </button>

        <!-- MEDIUM -->
        <button
          @click="handleClick('medium')"
          class="w-full flex items-center gap-4 p-4 mb-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition"
        >
          <div class="text-left">
            <p class="font-semibold text-slate-200">Medium</p>
            <p class="text-sm text-slate-400">
              Thử thách cân bằng cho người chơi
            </p>
          </div>
        </button>

        <!-- HARD -->
        <button
          @click="handleClick('hard')"
          class="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-700 hover:bg-slate-800 transition"
        >

          <div class="text-left">
            <p class="font-semibold text-slate-200">Hard</p>
            <p class="text-sm text-slate-400">
              Ít gợi ý, đề bài phức tạp
            </p>
          </div>
        </button>

        <!-- divider -->
        <div class="border-t border-slate-700 my-6"></div>

        <!-- cancel -->
        <button
          @click="close"
          class="w-full text-slate-400 hover:text-slate-200 font-semibold tracking-widest text-sm"
        >
          Hủy 
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
</script>
