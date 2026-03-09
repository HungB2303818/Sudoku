<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]"
      @click.self="close"
    >
      <button
        @click="handleClick('easy')"
        class="bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/30"
      >
        Dễ (Easy)
      </button>

      <button
        @click="handleClick('medium')"
        class="bg-amber-600 hover:bg-amber-500 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/30"
      >
        Trung bình (Medium)
      </button>

      <button
        @click="handleClick('hard')"
        class="bg-rose-600 hover:bg-rose-500 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-900/30"
      >
        Khó (Hard)
      </button>
    </div>
  </Teleport>
</template>

<script setup>
const prop = defineProps({
  modelValue: Boolean
});
const emit = defineEmits(['update:modelValue', 'handleStartGame']);

const handleClick = (level) => {
    emit('update:modelValue', false);
    emit('handleStartGame', level);
}
const close = () => emit('update:modelValue', false);
</script>
