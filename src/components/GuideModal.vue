<script setup>
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const close = () => {
  emit("update:modelValue", false);
};

// Đóng modal khi nhấn phím ESC
const handleEsc = (e) => {
  if (e.key === "Escape" && props.modelValue) close();
};

onMounted(() => window.addEventListener("keydown", handleEsc));
onUnmounted(() => window.removeEventListener("keydown", handleEsc));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#0a0f1e]/80 backdrop-blur-md"
      @click.self="close"
    >
      <div
        class="relative w-full max-w-md flex flex-col max-h-[85vh] rounded-[10px] overflow-hidden border border-white/5 bg-[#161b33]"
      >
        <!-- Header -->
        <div class="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 class="text-xs font-bold text-white uppercase tracking-widest">
            Hướng dẫn trò chơi
          </h2>
          <button
            @click="close"
            class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div
          class="flex-1 overflow-y-auto px-6 py-6 space-y-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full select-none"
        >
          <!-- Mục tiêu -->
          <section class="space-y-2">
            <p class="text-lg font-bold uppercase tracking-[0.2em] text-white">Mục tiêu</p>
            <p class="text-sm leading-relaxed text-slate-400">
              Điền các số từ <span class="font-semibold text-white">1 đến 9</span> vào ô trống sao cho mỗi con số
              xuất hiện <span class="font-semibold text-white">duy nhất một lần</span> trong mỗi hàng, cột và khối 3×3.
            </p>
          </section>

          <div class="border-t border-white/5" />

          <!-- Quy tắc -->
          <section class="space-y-2">
            <p class="text-lg font-bold uppercase tracking-[0.2em] text-white">Quy tắc</p>
            <div class="space-y-1.5 text-sm text-slate-400">
              <div class="flex items-baseline gap-3 py-2 border-b border-white/5">
                <span class="w-20 flex-shrink-0 text-xs font-semibold text-slate-300 uppercase tracking-wide">Hàng ngang</span>
                <span>Mỗi hàng chứa các số từ 1–9, không lặp lại.</span>
              </div>
              <div class="flex items-baseline gap-3 py-2 border-b border-white/5">
                <span class="w-20 flex-shrink-0 text-xs font-semibold text-slate-300 uppercase tracking-wide">Cột dọc</span>
                <span>Mỗi cột chứa các số từ 1–9, không lặp lại.</span>
              </div>
              <div class="flex items-baseline gap-3 py-2">
                <span class="w-20 flex-shrink-0 text-xs font-semibold text-slate-300 uppercase tracking-wide">Khối 3×3</span>
                <span>Mỗi khối chứa đủ bộ số từ 1–9, không lặp lại.</span>
              </div>
            </div>
          </section>

          <div class="border-t border-white/5" />

          <!-- Thao tác -->
          <section class="space-y-2">
            <p class="text-lg font-bold uppercase tracking-[0.2em] text-white">Thao tác</p>
            <ul class="space-y-2 text-sm text-slate-400">
              <li class="flex items-baseline gap-3">
                <span class="flex-shrink-0 text-slate-600">—</span>
                <span>Chọn ô bằng <span class="text-slate-300 font-medium">chuột</span> hoặc <span class="text-slate-300 font-medium">phím mũi tên</span>.</span>
              </li>
              <li class="flex items-baseline gap-3">
                <span class="flex-shrink-0 text-slate-600">—</span>
                <span>Nhập số qua <span class="text-slate-300 font-medium">bàn phím</span> hoặc <span class="text-slate-300 font-medium">bảng điều khiển</span>.</span>
              </li>
              <li class="flex items-baseline gap-3">
                <span class="flex-shrink-0 text-slate-600">—</span>
                <span>Nhấn
                  <kbd class="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-sans text-xs">Del</kbd>
                  hoặc
                  <kbd class="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-sans text-xs">Backspace</kbd>
                  để xóa số trong ô.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </Teleport>
</template>
