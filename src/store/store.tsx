import { create } from 'zustand';

export const useStore = create((set) => ({
  session: null,
  setSession: (session: any) => set({ session }),
}));
