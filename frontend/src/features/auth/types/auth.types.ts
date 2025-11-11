import type { UserResponse } from '../schemas/auth.schemas';
import type { LoginRequest } from '../schemas/auth.schemas';

export type User = UserResponse;

export interface AuthState {
  user: UserResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpires?: number;
  isAuthenticated: boolean;
  hasHydrated?: boolean; // ← flag to know when persisted (in localStorage) state is loaded
}


export interface AuthActions {
  login: (data: LoginRequest) => Promise<void>;
  refresh: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: UserResponse) => void;
  setHasHydrated: (state: boolean) => void;
}
