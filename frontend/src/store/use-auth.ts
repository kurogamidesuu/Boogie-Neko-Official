import { AuthUser } from "@/lib/api";
import { components } from "@/types/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type User = components["schemas"]["CreateUserDto"] & {
  id: number;
}

export type AuthStore = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,

      login: (token, user) => set({
        token,
        user,
        isAuthenticated: true,
      }),

      logout: () => set({
        token: null,
        user: null,
        isAuthenticated: false,
      }),

      setHasHydrated: (state) => set({
        _hasHydrated: state,
      })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) =>{
        state?.setHasHydrated(true);
      }
    }
  )
)