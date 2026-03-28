<!-- Bar.vue -->
<template>
  <div class="flex items-center gap-2">
    <span class="text-xs text-slate-400 w-4">{{ label }}</span>
    <div class="flex-1 h-2 bg-slate-700 rounded">
      <div
        class="h-2 rounded"
        :class="color"
        :style="{ width: value + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  color: String,
  value: Number,
});
</script>