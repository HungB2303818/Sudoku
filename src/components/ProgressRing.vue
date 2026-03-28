<!-- ProgressRing.vue -->
<template>
  <div class="relative w-24 h-24">
    <svg class="w-full h-full -rotate-90">
      <circle
        cx="50%"
        cy="50%"
        r="40"
        stroke="rgba(255,255,255,0.1)"
        stroke-width="8"
        fill="none"
      />
      <circle
        cx="50%"
        cy="50%"
        r="40"
        stroke="url(#grad)"
        stroke-width="8"
        fill="none"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        stroke-linecap="round"
      />

      <defs>
        <linearGradient id="grad">
          <stop offset="0%" stop-color="#4f46e5" />
          <stop offset="100%" stop-color="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>

    <div class="absolute inset-0 flex items-center justify-center text-white font-bold">
      {{ percent }}%
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  percent: Number,
});

const radius = 40;
const circumference = 2 * Math.PI * radius;

const offset = computed(() => {
  return circumference * (1 - props.percent / 100);
});
</script>