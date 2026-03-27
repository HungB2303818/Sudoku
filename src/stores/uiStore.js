import { defineStore } from "pinia";

export const useUIStore = defineStore("ui", {
  state: () => ({
    selectedRow: null,
    selectedCol: null,
    noteMode: false,
  }),

  actions: {
    selectCell(row, col) {
      this.selectedRow = row;
      this.selectedCol = col;
    },

    clearSelection() {
      this.selectedRow = null;
      this.selectedCol = null;
    },

    toggleNoteMode() {
      this.noteMode = !this.noteMode;
    },
  },
});
