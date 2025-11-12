import api from '@/lib/api';
import {
  loginRequestSchema,
  loginResponseSchema,
  registerRequestSchema,
  confirmEmailRequestSchema,
  forgotPasswordRequestSchema,
  resetPasswordRequestSchema,
  updateUserRequestSchema,
  userResponseSchema,
  refreshResponseSchema,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ConfirmEmailRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UpdateUserRequest,
  UserResponse,
  RefreshResponse,
} from '@/features/auth/schemas/auth.schemas';

/**
 * Service layer for communicating with the NestJS AuthController endpoints.
 */
export const authApi = {
  /** POST /api/v1/auth/email/login */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    loginRequestSchema.parse(data);
    const res = await api.post('/api/v1/auth/email/login', data);
    console.log('login response: ', res);
    return loginResponseSchema.parse(res.data);
  },

  /** POST /api/v1/auth/email/register */
  register: async (data: RegisterRequest): Promise<void> => {
    registerRequestSchema.parse(data);
    await api.post('/api/v1/auth/email/register', data);
  },

  /** POST /api/v1/auth/email/confirm */
  confirmEmail: async (data: ConfirmEmailRequest): Promise<void> => {
    confirmEmailRequestSchema.parse(data);
    await api.post('/api/v1/auth/email/confirm', data);
  },

  /** POST /api/v1/auth/email/confirm/new */
  confirmNewEmail: async (data: ConfirmEmailRequest): Promise<void> => {
    confirmEmailRequestSchema.parse(data);
    await api.post('/api/v1/auth/email/confirm/new', data);
  },

  /** POST /api/v1/auth/forgot/password */
  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    forgotPasswordRequestSchema.parse(data);
    await api.post('/api/v1/auth/forgot/password', data);
  },

  /** POST /api/v1/auth/reset/password */
  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    resetPasswordRequestSchema.parse(data);
    await api.post('/api/v1/auth/reset/password', data);
  },

  /** GET /api/v1/auth/me */
  me: async (): Promise<UserResponse> => {
    const res = await api.get('/api/v1/auth/me');
    return userResponseSchema.parse(res.data);
  },

  /** PATCH /api/v1/auth/me */
  update: async (data: UpdateUserRequest): Promise<UserResponse> => {
    updateUserRequestSchema.parse(data);
    const res = await api.patch('/api/v1/auth/me', data);
    return userResponseSchema.parse(res.data);
  },

  /** DELETE /api/v1/auth/me */
  deleteAccount: async (): Promise<void> => {
    await api.delete('/api/v1/auth/me');
  },

  /** POST /api/v1/auth/refresh */
  refreshToken: async (): Promise<RefreshResponse> => {
    const res = await api.post('/api/v1/auth/refresh');
    return refreshResponseSchema.parse(res.data);
  },

  /** POST /api/v1/auth/logout */
  logout: async (): Promise<void> => {
    await api.post('/api/v1/auth/logout');
  },
};
