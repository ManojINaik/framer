import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// User types and store
interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null })
    }),
    {
      name: 'user-storage'
    }
  )
);