<template>
  <div 
    class="relative w-12 h-12 sm:w-14 sm:h-14 bg-white flex items-center justify-center border-[0.5px] border-slate-200"
    :class="{ 
      'border-r-4 border-r-slate-800': isBoldRight,
      'border-b-4 border-b-slate-800': isBoldBottom
    }"
  >
    <input 
      :value="modelValue === 0 ? '' : modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      type="number"
      class="w-full h-full text-center text-xl font-bold focus:bg-emerald-50 outline-none transition-colors text-slate-700"
      @focus="$event.target.select()"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: Number,
  isBoldRight: Boolean,
  isBoldBottom: Boolean
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
input::-webkit-inner-spin-button { display: none; }
</style>