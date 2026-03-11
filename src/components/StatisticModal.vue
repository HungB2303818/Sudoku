<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-[9999]"
      @click.self="close"
    >
      <p class="text-2xl text-white">
        Tổng số game đã chơi: <span>{{ store.totalGame ?? 0 }}</span>
      </p>
      <p class="text-2xl text-white">
        Tổng số thời gian đã chơi: <span>{{ store.totalTime ?? 0 }}</span>
      </p>
      <p class="text-2xl text-white">
        Tổng số gợi ý đã dùng: <span>{{ store.totalHint ?? 0 }}</span>
      </p>
    </div>
  </Teleport>
</template>

<script setup>
import { useGameStore } from "../stores/gameStore";

const store = useGameStore();

const prop = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const close = () => emit("update:modelValue", false);
</script>
