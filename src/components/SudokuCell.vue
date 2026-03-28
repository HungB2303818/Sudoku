<template>
  <div
    @click="handleClick"
    class="flex items-center justify-center text-2xl cursor-pointer transition-all select-none relative border border-blue-900/40"
    :class="[
      isInitial
        ? 'bg-[#050c1a] text-slate-400' // số đề bài
        : 'bg-[#030a17] text-cyan-300', // số người chơi

      isSelected
        ? 'bg-blue-500/15 z-10 transition-all duration-200'
        : '',

      isError
        ? 'bg-red-900/20 text-red-400/90 transition-all duration-200'
        : '',

      borderClasses,

      isHint ? 'bg-green-600/30 text-green-400' : '',
    ]"
  >
    <!-- nếu có số -->
    <div v-if="value !== 0">
      {{ value }}
    </div>

    <!-- nếu rỗng → render note -->
    <div v-if="ui.noteMode && value === 0" class="grid grid-cols-3 text-[10px] w-full h-full leading-none">
      <span v-for="n in 9" :key="n" class="flex items-center justify-center relative w-full h-full">
        {{ store.notes[row][col].includes(n) ? n : "" }}
      </span>
    </div>

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
import { useUIStore } from "../stores/uiStore";

const ui = useUIStore();
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
