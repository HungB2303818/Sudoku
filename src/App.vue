<template>
  <main class="min-h-screen flex flex-col items-center p-8">
    <header class="text-center mb-8">
      <h1 class="text-5xl font-extrabold text-emerald-600 tracking-tight">
        SUDOKU <span class="text-slate-800 text-3xl font-light underline underline-offset-8 decoration-emerald-500">PRO</span>
      </h1>
      <p class="mt-4 text-slate-500 font-medium italic">Tauri + Vue Desktop Experience</p>
    </header>

    <SudokuBoard />

    <footer class="mt-auto pt-8 text-slate-400 text-xs">
      Built by Software Engineering Student &bull; 2026
    </footer>
  </main>
</template>

<script setup>
import SudokuBoard from './components/SudokuBoard.vue';
</script>