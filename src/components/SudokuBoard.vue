<template>
  <div class="flex flex-col items-center justify-center">
    <div
      class="grid grid-cols-9 grid-rows-9 bg-[#0f172a] border-[1px] border-blue-900/40 shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden rounded-md"
      :style="{ width: 'min(70vh, 70vw)', height: 'min(70vh, 70vw)' }"
    >
      <template v-for="(row, r) in modelValue" :key="r">
        <SudokuCell
          v-for="(cell, c) in row"
          :key="c"
          :row="r"
          :col="c"
          :value="cell"
          :is-initial="initialGrid[r][c] !== 0"
          :is-selected="store.selectedRow === r && store.selectedCol === c"
          :is-error="errors[r][c]"
          :border-classes="getBorderClasses(r, c)"
          @select="store.selectCell"
          class="w-full h-full"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import SudokuCell from './SudokuCell.vue'
import { isValid } from '../logic/validator'
import { useGameStore } from '../stores/gameStore'

const store = useGameStore()

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  initialGrid: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])


const errors = ref(
  Array.from({ length: 9 }, () => Array(9).fill(false))
)
// =======================
// Border logic 3x3 blocks
// =======================
const getBorderClasses = (r, c) => {
  // Đường kẻ mặc định cực mảnh và mờ
  let classes = 'border-[0.5px] border-cyan-900/20'; 
  
  // Đường kẻ phân chia khối 3x3 (Sáng hơn một chút để phân biệt nhưng không dày)
  if ((r + 1) % 3 === 0 && r < 8) classes += ' border-b-[2px] border-b-cyan-700/40';
  if ((c + 1) % 3 === 0 && c < 8) classes += ' border-r-[2px] border-r-cyan-700/40';
  
  return classes;
};

// =======================
// Validate board safely
// =======================
const validateBoard = () => {
  const newErrors = Array.from(
    { length: 9 },
    () => Array(9).fill(false)
  )

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const num = props.modelValue[r][c]

      if (num !== 0) {
        // clone grid để tránh mutate props
        const tempGrid = props.modelValue.map(row => [...row])
        tempGrid[r][c] = 0

        if (!isValid(tempGrid, r, c, num)) {
          newErrors[r][c] = true
        }
      }
    }
  }

  errors.value = newErrors
}


// =======================
// Update cell
// =======================
const updateCell = (r, c, value) => {
  const newGrid = props.modelValue.map(row => [...row])
  newGrid[r][c] = value

  emit('update:modelValue', newGrid)
}



// Keyboard input (store pinia)
const handleKeyDown = (e) => {
  const r = store.selectedRow
const c = store.selectedCol

  if (r === null || c === null) return
  if (props.initialGrid[r][c] !== 0) return

  if (/^[1-9]$/.test(e.key)) {
    store.inputNumber(parseInt(e.key))
  }

  if (e.key === 'Backspace' || e.key === 'Delete') {
    store.inputNumber(0)
  }
}

// Watch grid changes
watch(
  () => props.modelValue,
  () => validateBoard(),
  { deep: true }
)


// =======================
// Lifecycle
// =======================
onMounted(() => {
  validateBoard()
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>