<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-[#0a0f1e]/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
        @click.self="$emit('cancel')"
      >
        <div
          class="bg-[#161b33] border border-[#3a3a5c]/50 rounded-xl p-8 max-w-sm w-full text-center relative overflow-hidden"
        >
          <div
            class="w-14 h-14 mx-auto mb-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center"
          >
            <AlertTriangle class="text-red-400" :size="26" />
          </div>

          <!-- Title -->
          <h2 class="text-lg font-medium text-slate-100 mb-3 leading-snug">
            Giải câu đố?
          </h2>

          <!-- Description -->
          <p class="text-sm text-slate-400 leading-relaxed mb-2">
            Sử dụng tính năng này sẽ được tính là
            <span class="text-red-300 font-medium">thua ván này</span>.
          </p>
          <p class="text-[13px] text-slate-500 leading-relaxed mb-6">
            Tiến trình và điểm số của bạn sẽ không được lưu lại.
          </p>

          <!-- Info box -->
          <div
            class="bg-red-500/8 border border-red-500/20 rounded-lg px-4 py-3 mb-6 flex items-start gap-3 text-left"
          >
            <Info class="text-red-400 shrink-0 mt-0.5" :size="16" />
            <span class="text-[12px] text-red-300/80 leading-relaxed">
              Hành động này không thể hoàn tác sau khi xác nhận.
            </span>
          </div>

          <!-- Buttons -->
          <div class="flex gap-2.5">
            <button
              class="flex-1 py-2.5 rounded-lg bg-red-800 text-red-100 text-sm font-medium hover:bg-red-900 active:scale-[0.97] transition-all"
              @click="$emit('confirm')"
            >
              Xác nhận thua
            </button>
            <button
              class="flex-1 py-2.5 rounded-lg border border-[#3a3a5c] text-slate-400 text-sm hover:bg-white/5 hover:border-[#5a5a7c] hover:text-slate-200 transition-all"
              @click="$emit('cancel')"
            >
              Huỷ bỏ
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { AlertTriangle, Info } from "lucide-vue-next";

defineProps({ isOpen: Boolean });
defineEmits(["cancel", "confirm"]);
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
