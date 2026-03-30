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
        class="relative w-full max-w-md flex flex-col max-h-[85vh] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 bg-[#161b33]"
      >
        <div
          class="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-[#161b33]"
        >
          <div class="flex items-center gap-3">
            <h2 class="text-sm font-bold text-white uppercase tracking-widest">
              Hướng dẫn trò chơi
            </h2>
          </div>
          <button
            @click="close"
            class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Body (scrollable) -->
        <div
          class="flex-1 overflow-y-auto px-6 py-6 space-y-7 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full select-none"
        >
          <!-- Mục tiêu -->
          <section class="space-y-3">
            <div class="flex items-center gap-2.5">
              <span
                class="text-xs font-black uppercase tracking-[0.2em] text-slate-400"
                >Mục tiêu</span
              >
            </div>
            <p class="text-sm leading-relaxed text-slate-400">
              Điền các số từ
              <span
                class="font-bold text-white underline underline-offset-4 decoration-indigo-500 decoration-2"
                >1 đến 9</span
              >
              vào ô trống sao cho mỗi con số xuất hiện duy nhất một lần trong
              mỗi hàng, cột và khối 3×3.
            </p>
          </section>

          <!-- Quy tắc -->
          <section class="space-y-3">
            <div class="flex items-center gap-2.5">
              <span
                class="text-xs font-black uppercase tracking-[0.2em] text-slate-400"
                >Quy tắc</span
              >
            </div>
            <div class="space-y-2">
              <div
                class="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-colors"
              >
                <span
                  class="flex-shrink-0 w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-[10px] font-black text-indigo-400"
                  >→</span
                >
                <p class="text-sm text-slate-400">
                  <span class="font-semibold text-slate-200">Hàng ngang:</span>
                  Không lặp lại số.
                </p>
              </div>
              <div
                class="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-colors"
              >
                <span
                  class="flex-shrink-0 w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center text-[10px] font-black text-emerald-400"
                  >↓</span
                >
                <p class="text-sm text-slate-400">
                  <span class="font-semibold text-slate-200">Cột dọc:</span>
                  Không lặp lại số.
                </p>
              </div>
              <div
                class="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-colors"
              >
                <span
                  class="flex-shrink-0 w-6 h-6 rounded-md bg-violet-500/20 flex items-center justify-center text-[10px] font-black text-violet-400"
                  >⊞</span
                >
                <p class="text-sm text-slate-400">
                  <span class="font-semibold text-slate-200">Khối 3×3:</span>
                  Chứa đủ bộ số 1–9.
                </p>
              </div>
            </div>
          </section>

          <!-- Thao tác -->
          <section class="space-y-3">
            <div class="flex items-center gap-2.5">
              <span
                class="text-xs font-black uppercase tracking-[0.2em] text-slate-400"
                >Thao tác</span
              >
            </div>
            <ul class="space-y-2.5 text-sm text-slate-400">
              <li class="flex items-start gap-3">
                <span
                  class="mt-1.5 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-slate-500"
                ></span>
                <span
                  >Chọn ô bằng <span class="text-slate-300">chuột</span> hoặc
                  <span class="text-slate-300">phím mũi tên</span>.</span
                >
              </li>
              <li class="flex items-start gap-3">
                <span
                  class="mt-1.5 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-slate-500"
                ></span>
                <span
                  >Nhập số qua <span class="text-slate-300">bàn phím</span> hoặc
                  <span class="text-slate-300">bảng điều khiển</span>.</span
                >
              </li>
              <li class="flex items-start gap-3">
                <span
                  class="mt-1.5 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-slate-500"
                ></span>
                <span
                  >Nhấn
                  <kbd
                    class="mx-0.5 px-2 py-0.5 rounded-md bg-slate-700/80 border border-white/10 text-slate-300 font-sans text-xs"
                    >Del</kbd
                  >
                  hoặc
                  <kbd
                    class="mx-0.5 px-2 py-0.5 rounded-md bg-slate-700/80 border border-white/10 text-slate-300 font-sans text-xs"
                    >Backspace</kbd
                  >
                  để xóa ô.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </Teleport>
</template>
