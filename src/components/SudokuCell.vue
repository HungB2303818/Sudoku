<template>
  <div
    @click="handleClick"
    class="flex items-center justify-center text-2xl cursor-pointer transition-all select-none relative border border-blue-900/40"
    :class="[
      isInitial
        ? 'bg-[#050c1a] text-slate-400' // số đề bài
        : 'bg-[#030a17] text-cyan-300', // số người chơi

      isSelected
        ? 'bg-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.25)] z-10'
        : '',

      isError
        ? 'bg-red-900/30 text-red-400 shadow-[inset_0_0_8px_rgba(239,68,68,0.35)]'
        : '',

      borderClasses,

      isHint ? 'bg-green-600/30 text-green-400' : '',
    ]"
  >
    {{ value !== 0 ? value : "" }}

    <!-- overlay highlight nhẹ -->
    <div
      v-if="isSelected"
      class="absolute inset-0 bg-blue-400/5 pointer-events-none"
    ></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useGameStore } from "../stores/gameStore";

const store = useGameStore();

const props = defineProps({
  value: Number,
  row: Number,
  col: Number,
  isInitial: Boolean,
  isSelected: Boolean,
  isError: Boolean,
  borderClasses: String,
});

const emit = defineEmits(["select"]);

const handleClick = () => {
  if (props.isInitial) return;
  emit("select", props.row, props.col);
};

const isHint = computed(() => {
  return store.lastHint?.row === props.row && store.lastHint?.col === props.col;
});
</script>
