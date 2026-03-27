<script setup>
const numbers = [
  { value: 1, top: "10%", left: "10%", size: 180 },
  { value: 3, top: "30%", left: "25%", size: 160 },
  { value: 9, top: "60%", left: "10%", size: 200 },
  { value: 5, top: "50%", left: "80%", size: 150 },
  { value: 7, top: "20%", left: "70%", size: 170 },
];
</script>

<template>
  <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <span
      v-for="(n, i) in numbers"
      :key="i"
      class="absolute text-indigo-400/10 font-bold select-none"
      :style="{
        top: n.top,
        left: n.left,
        fontSize: n.size + 'px'
      }"
    >
      {{ n.value }}
    </span>
  </div>
</template>