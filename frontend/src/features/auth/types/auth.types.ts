import { User } from '@/features/users/types/users.types';
import type { LoginRequest } from '../schemas/auth.schemas';
import type { RegisterRequest } from '../schemas/auth.schemas';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpires?: number;
  isAuthenticated: boolean;
  hasHydrated?: boolean; // flag to know when persisted (in localStorage) state is loaded
}


export interface AuthActions {
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  refresh: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  setHasHydrated: (state: boolean) => void;
}
