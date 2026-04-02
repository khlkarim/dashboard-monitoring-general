import { fileTypeSchema } from '@/features/files/schemas/files.schemas';
import { roleSchema, statusSchema, userResponseSchema } from '@/features/users/schemas/users.schemas';
import { z } from 'zod';

/** Login */
export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

/** Register */
export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});
export type RegisterRequest = z.infer<typeof registerRequestSchema>;

/** Confirm Email */
export const confirmEmailRequestSchema = z.object({
  hash: z.string().min(1),
});
export type ConfirmEmailRequest = z.infer<typeof confirmEmailRequestSchema>;

/** Forgot Password */
export const forgotPasswordRequestSchema = z.object({
  email: z.string().email(),
});
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordRequestSchema>;

/** Reset Password */
export const resetPasswordRequestSchema = z.object({
  hash: z.string().min(1),
  password: z.string().min(1),
});
export type ResetPasswordRequest = z.infer<typeof resetPasswordRequestSchema>;

/** Login Response */
export const loginResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  tokenExpires: z.number(),
  user: userResponseSchema,
});
export type LoginResponse = z.infer<typeof loginResponseSchema>;

/** Refresh Token Response */
export const refreshResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  tokenExpires: z.number(),
});
export type RefreshResponse = z.infer<typeof refreshResponseSchema>;
