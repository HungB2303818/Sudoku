<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const close = () => {
  emit("update:modelValue", false);
};

// Đóng modal khi nhấn phím ESC
const handleEsc = (e) => {
  if (e.key === 'Escape' && props.modelValue) close();
};

onMounted(() => window.addEventListener('keydown', handleEsc));
onUnmounted(() => window.removeEventListener('keydown', handleEsc));
</script>

<template>
  <Teleport to="body">
    <Transition 
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
        @click.self="close"
      >
        <Transition 
          enter-active-class="transition duration-300 delay-75 ease-out"
          enter-from-class="opacity-0 translate-y-4 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-4 scale-95"
        >
          <div
            class="bg-slate-900 border border-slate-800 text-slate-300 w-full max-w-lg rounded-xl shadow-2xl relative flex flex-col max-h-[85vh] overflow-hidden"
          >
            <div class="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
              <h2 class="text-lg font-bold text-white tracking-tight uppercase">
                Hướng dẫn trò chơi
        </h2>
              <button 
                @click="close" 
                class="p-1 rounded-md hover:bg-slate-800 text-slate-500 hover:text-white transition-colors"
                title="Đóng (Esc)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="p-6 overflow-y-auto space-y-8 select-none">
              
              <section class="space-y-3">
                <div class="flex items-center gap-3 text-indigo-400">
                  <span class="h-px w-6 bg-indigo-500"></span>
                  <span class="text-xs font-black uppercase tracking-[0.2em]">Mục tiêu</span>
                </div>
                <p class="text-slate-400 leading-relaxed text-sm">
                  Điền các số từ <span class="text-white font-semibold underline underline-offset-4 decoration-indigo-500">1 đến 9</span> vào ô trống sao cho mỗi con số xuất hiện duy nhất một lần trong mỗi hàng, cột và khối 3x3.
                </p>
              </section>

              <section class="space-y-4">
                <div class="flex items-center gap-3 text-emerald-400">
                  <span class="h-px w-6 bg-emerald-500"></span>
                  <span class="text-xs font-black uppercase tracking-[0.2em]">Quy tắc</span>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center gap-4 p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                    <span class="text-emerald-500 font-mono text-xs font-bold">01</span>
                    <p><span class="text-slate-200">Hàng ngang:</span> Không lặp lại số.</p>
                  </div>
                  <div class="flex items-center gap-4 p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                    <span class="text-emerald-500 font-mono text-xs font-bold">02</span>
                    <p><span class="text-slate-200">Cột dọc:</span> Không lặp lại số.</p>
                  </div>
                  <div class="flex items-center gap-4 p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                    <span class="text-emerald-500 font-mono text-xs font-bold">03</span>
                    <p><span class="text-slate-200">Khối 3x3:</span> Chứa đủ bộ số 1-9.</p>
                  </div>
                </div>
              </section>

              <section class="space-y-3">
                <div class="flex items-center gap-3 text-amber-500">
                  <span class="h-px w-6 bg-amber-600"></span>
                  <span class="text-xs font-black uppercase tracking-[0.2em]">Thao tác</span>
                </div>
                <div class="grid grid-cols-1 gap-2 text-xs text-slate-400 pl-2">
                  <div class="flex items-center gap-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                    <span>Chọn ô bằng chuột hoặc phím mũi tên.</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                    <span>Nhập số qua bàn phím hoặc bảng điều khiển.</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                    <span>Phím <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-sans">Del</kbd> hoặc <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-sans">Backspace</kbd> để xóa.</span>
                  </div>
                </div>
              </section>
            </div>

            <div class="p-6 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            @click="close"
                class="px-8 py-2.5 bg-white hover:bg-slate-200 text-slate-900 rounded-lg font-bold text-sm transition-all active:scale-95 shadow-lg shadow-white/5"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>