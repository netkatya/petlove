import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  signInUser,
  signUpUser,
  signOutUser,
  getCurrentUser,
} from "@/lib/api/clientApi";

import { AuthResponse, SignInRequest, SignUpRequest } from "@/types/auth";
import { CurrentUserResponse } from "@/types/user";

type AuthState = {
  user: CurrentUserResponse | null;
  token: string | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;

  signIn: (data: SignInRequest) => Promise<void>;
  signUp: (data: SignUpRequest) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuth: false,
      loading: false,
      error: null,

      clearError: () => set({ error: null }),

      signIn: async (data) => {
        try {
          set({ loading: true, error: null });

          const res: AuthResponse = await signInUser(data);

          set({
            token: res.token,
            isAuth: true,
          });

          await get().fetchCurrentUser();
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Login failed";

          set({ error: message });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      signUp: async (data) => {
        try {
          set({ loading: true, error: null });

          const res: AuthResponse = await signUpUser(data);

          set({
            token: res.token,
            isAuth: true,
          });

          await get().fetchCurrentUser();
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "Registration failed";

          set({ error: message });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      fetchCurrentUser: async () => {
        const token = get().token;

        if (!token) return;

        try {
          set({ loading: true });

          const user = await getCurrentUser(token);

          set({
            user,
            isAuth: true,
          });
        } catch {
          set({
            user: null,
            token: null,
            isAuth: false,
          });
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        const token = get().token;

        try {
          if (token) {
            await signOutUser(token);
          }
        } catch (err) {
          console.error("Logout error:", err);
        } finally {
          set({
            user: null,
            token: null,
            isAuth: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        isAuth: state.isAuth,
        user: state.user,
      }),
    },
  ),
);
