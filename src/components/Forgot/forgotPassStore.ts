import { create } from 'zustand';

type ForgotPassStore = {
  formData: { email: string; newPassword: string };
  setFormData: (data: { email: string; newPassword: string }) => void;
  resetFormData: () => void;
};

export const useForgotPassStore = create<ForgotPassStore>((set) => ({
  formData: { email: '', newPassword: '' },
  setFormData: (data) => set(() => ({ formData: data })),
  resetFormData: () => set(() => ({ formData: { email: '', newPassword: '' } })),
}));
