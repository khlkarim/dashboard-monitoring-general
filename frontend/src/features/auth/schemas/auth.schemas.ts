import { z } from 'zod';

/* ------------------------------------------------------------
   REQUEST SCHEMAS
------------------------------------------------------------ */

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

/** Update User */
export const updateUserRequestSchema = z.object({
  photo: z.any().nullable().optional(), // File or null
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  oldPassword: z.string().min(1).optional(),
});
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;

/* ------------------------------------------------------------
   RESPONSE SCHEMAS
------------------------------------------------------------ */

/** Minimal User schema — mirror backend’s User entity fields you need */
export const userResponseSchema = z.object({
  id: z.string().or(z.number()), // backend may return UUID or numeric ID
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  photo: z.string().url().nullable().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});
export type UserResponse = z.infer<typeof userResponseSchema>;

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
