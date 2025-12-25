import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { authApi } from '@/features/auth/api/auth.api';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useAuthStore } from '@/features/auth/store/auth.store';

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
  (request) => {
    const token = useAuthStore.getState().accessToken;
    if (token && !request.headers.Authorization?.toString().startsWith('Bearer')) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(normalizeApiError(error))
);

/* Function that will be called to refresh authorization */
const refreshAuthLogic = (failedRequest: any) =>
  authApi.refreshToken().then((tokenRefreshResponse) => {
    useAuthStore.setState({
      accessToken: tokenRefreshResponse.token,
      refreshToken: tokenRefreshResponse.refreshToken
    });
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.token;
    return Promise.resolve();
  });

/* Instantiate the interceptor */
createAuthRefreshInterceptor(api, refreshAuthLogic);

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
