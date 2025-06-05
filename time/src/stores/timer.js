import { create } from 'zustand';

export const useStore = create((set, get) => ({
  seconds: 0,
  isRunning: false,
  history: [],
  startTimer: () => set({ isRunning: true }),
  stopTimer: () => {
    const { mode, seconds, history } = get();
    const newRecord = {
      mode,
      duration: seconds,
      date: new Date().toLocaleString()
    };
    const newHistory = [newRecord, ...history].slice(0, 10);
    set({ isRunning: false, history: newHistory });
  },
  resetTimer: () => set({ seconds: 0, isRunning: false }),
  setSeconds: (seconds) => set({ seconds }),
  setMode: (mode) => set({ mode }),
}));
