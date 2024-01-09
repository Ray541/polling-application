import { create } from 'zustand';

type SignupStore = {
  formData: { username: string; email: string; password: string };
  setFormData: (data: {
    username: string;
    email: string;
    password: string;
  }) => void;
  resetFormData: () => void;
};

export const useSignupStore = create<SignupStore>((set) => ({
  formData: { username: '', email: '', password: '' },
  setFormData: (data) => set(() => ({ formData: data })),
  resetFormData: () =>
    set(() => ({ formData: { username: '', email: '', password: '' } })),
}));
