import { defineStore } from "pinia";

export const useTimeStore = defineStore("time", {
  state: () => ({
    elapsedSeconds: 0,
    timerId: null,
    startTimeStamp: null,
    isRunning: false,
  }),

  getters: {
    formattedTime(state) {
      const m = Math.floor(state.elapsedSeconds / 60);
      const s = state.elapsedSeconds % 60;
      return `${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
    },
  },

  actions: {
    startTimer() {
      if (this.isRunning) return;

      this.isRunning = true;
      this.startTimeStamp = Date.now() - this.elapsedSeconds * 1000;

      this.timerId = setInterval(() => {
        this.elapsedSeconds = Math.floor(
          (Date.now() - this.startTimeStamp) / 1000,
        );
      }, 1000);
    },

    stopTimer() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      this.isRunning = false;
    },

    resetTimer() {
      this.stopTimer();
      this.elapsedSeconds = 0;
      this.startTimeStamp = null;
    },
  },
  persist: {
    key: "sudoku-time",
    storage: localStorage,
    paths: ["elapseSeconds", "isRunning"],
  },
});
