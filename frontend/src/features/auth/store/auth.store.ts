import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../api/auth.api';
import type { AuthState, AuthActions } from '../types/auth.types';
import type { LoginRequest, UserResponse } from '../schemas/auth.schemas';

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      tokenExpires: undefined,
      isAuthenticated: false,
      hasHydrated: false, // hydrated flag

      /** Log in the user and update tokens */
      login: async (credentials: LoginRequest) => {
        const response = await authApi.login(credentials);
        console.log("store response: ", response);
        set({
          user: response.user,
          accessToken: response.token,
          refreshToken: response.refreshToken,
          tokenExpires: response.tokenExpires,
          isAuthenticated: true,
        });
      },

      /** Refresh access token when it expires */
      refresh: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return;

        const response = await authApi.refreshToken();
        set({
          accessToken: response.token,
          refreshToken: response.refreshToken,
          tokenExpires: response.tokenExpires,
        });
      },

      /** Load the current user if token exists */
      fetchCurrentUser: async () => {
        try {
          const user = await authApi.me();
          set({ user, isAuthenticated: true });
        } catch (err) {
          set({ user: null, isAuthenticated: false });
        }
      },

      /** Log out completely */
      logout: async () => {
        try {
          await authApi.logout();
          localStorage.removeItem('accessToken');
        } catch {
          /* ignore network errors on logout */
        }
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          tokenExpires: undefined,
          isAuthenticated: false,
        });
      },

      /** Update user info */
      updateUser: (updatedUser: UserResponse) => {
        set({ user: updatedUser });
      },

      setHasHydrated: (state: boolean) => {
        set({
          hasHydrated: state
        });
      }
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        tokenExpires: state.tokenExpires,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if(state){
          state.setHasHydrated(true);
        }
      }
    },
  ),
);
