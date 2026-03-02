<script setup>
const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]"
      @click.self="close"
    >
      <div
        class="bg-slate-900 text-slate-200 w-[90%] max-w-2xl rounded-2xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto"
      >
        <h2 class="text-2xl font-bold mb-4 text-center">
          📘 Hướng Dẫn Chơi Sudoku
        </h2>

        <ul class="space-y-3 text-base leading-relaxed">
          <li>
            1️⃣ Điền các số từ <b>1 đến 9</b> vào bảng 9x9.
          </li>
          <li>
            2️⃣ Mỗi hàng chỉ được xuất hiện mỗi số <b>một lần</b>.
          </li>
          <li>
            3️⃣ Mỗi cột chỉ được xuất hiện mỗi số <b>một lần</b>.
          </li>
          <li>
            4️⃣ Mỗi khối 3x3 chỉ được xuất hiện mỗi số <b>một lần</b>.
          </li>
          <li>
            5️⃣ Không được sửa các ô đề bài ban đầu.
          </li>
        </ul>

        <div class="mt-6 text-center">
          <button
            @click="close"
            class="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl font-semibold transition"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>