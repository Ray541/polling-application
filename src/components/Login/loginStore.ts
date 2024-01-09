import { create } from 'zustand';

type LoginStore = {
  formData: { email: string; password: string };
  setFormData: (data: { email: string; password: string }) => void;
  resetFormData: () => void;
};

export const useLoginStore = create<LoginStore>((set) => ({
  formData: { email: '', password: '' },
  setFormData: (data) => set(() => ({ formData: data })),
  resetFormData: () => set(() => ({ formData: { email: '', password: '' } })),
}));
