import { create } from 'zustand'

type State = {
    username: string;
    password: string;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
};

export const useStore = create<State>((set) => ({
    username: '',
    password: '',
    setUsername: (username) => set(() => ({ username })),
    setPassword: (password) => set(() => ({ password })),
}));
