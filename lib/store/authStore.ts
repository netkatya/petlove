import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  signInUser,
  signUpUser,
  signOutUser,
  getCurrentUser,
  getCurrentUserFull,
} from "@/lib/api/clientApi";

import { AuthResponse, SignInRequest, SignUpRequest } from "@/types/auth";
import { CurrentUserFullResponse, CurrentUserResponse } from "@/types/user";

type AuthState = {
  user: CurrentUserResponse | null;
  userFull: CurrentUserFullResponse | null;

  token: string | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;

  signIn: (data: SignInRequest) => Promise<void>;
  signUp: (data: SignUpRequest) => Promise<void>;
  logout: () => Promise<void>;

  refreshUser: () => Promise<void>;
  updateUserLocal: (data: Partial<CurrentUserResponse>) => void;

  clearError: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      userFull: null,
      token: null,
      isAuth: false,
      loading: false,
      error: null,

      clearError: () => set({ error: null }),

      /* ---------------- AUTH ---------------- */

      signIn: async (data) => {
        const res: AuthResponse = await signInUser(data);
        set({ token: res.token, isAuth: true });
        await get().refreshUser();
      },

      signUp: async (data) => {
        const res: AuthResponse = await signUpUser(data);
        set({ token: res.token, isAuth: true });
        await get().refreshUser();
      },

      /* ---------------- LOAD USER ---------------- */

      refreshUser: async () => {
        const token = get().token;
        if (!token) return;

        set({ loading: true });

        try {
          const [user, full] = await Promise.all([
            getCurrentUser(token),
            getCurrentUserFull(token),
          ]);

          set({
            user,
            userFull: full,
            isAuth: true,
          });
        } finally {
          set({ loading: false });
        }
      },

      /* instant UI update (avatar/name) */

      updateUserLocal: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
          userFull: state.userFull ? { ...state.userFull, ...data } : null,
        })),

      /* ---------------- LOGOUT ---------------- */

      logout: async () => {
        const token = get().token;
        if (token) await signOutUser(token);

        set({
          user: null,
          userFull: null,
          token: null,
          isAuth: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (s) => ({
        token: s.token,
        isAuth: s.isAuth,
        user: s.user,
        userFull: s.userFull,
      }),
    },
  ),
);
