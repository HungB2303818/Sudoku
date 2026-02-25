<template>
  <div 
    class="flex items-center justify-center text-3xl font-semibold cursor-pointer 
           transition-all select-none relative
           border border-blue-900/40"
    :class="[

      // ===== Base background =====
      isInitial
        ? 'bg-[#050c1a] text-slate-400'   // số đề bài
        : 'bg-[#030a17] text-cyan-300',   // số người chơi

      // ===== Selected cell =====
      isSelected
        ? 'bg-blue-500/15 ring-1 ring-blue-400/60 shadow-[0_0_10px_rgba(59,130,246,0.25)] z-10'
        : '',

      // ===== Error state =====
      isError
        ? 'bg-red-900/30 text-red-400 shadow-[inset_0_0_8px_rgba(239,68,68,0.35)]'
        : '',

      // ===== 3x3 borders =====
      borderClasses
    ]"
  >
    {{ value !== 0 ? value : '' }}

    <!-- overlay highlight nhẹ -->
    <div 
      v-if="isSelected"
      class="absolute inset-0 bg-blue-400/5 pointer-events-none"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  value: Number,
  isInitial: Boolean,
  isSelected: Boolean,
  isError: Boolean,
  borderClasses: String
});
</script>