import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { authApi } from '@/features/auth/api/auth.api';

/**
 * Axios instance for all HTTP requests.
 */
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Attach the access token from Zustand to every request (if available).
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Handle automatic token refresh and retry logic.
 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = useAuthStore.getState();
        if (!refreshToken) throw new Error('No refresh token');

        const refreshResponse = await authApi.refreshToken();
        const { token: newAccessToken, refreshToken: newRefreshToken } = refreshResponse;

        // Update store tokens
        useAuthStore.setState({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        // Retry original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, force logout
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(normalizeApiError(error));
  },
);

/**
 * Normalizes Axios errors into a consistent shape.
 */
function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    return {
      message:
        (error.response?.data as any)?.message ??
        error.message ??
        'An unexpected server error occurred.',
      status: error.response?.status,
      data: error.response?.data,
    };
  }
  return { message: 'An unexpected error occurred.' };
}

/**
 * Unified API error interface.
 */
export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}

export default api;
