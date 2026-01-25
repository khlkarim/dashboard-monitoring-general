import { z } from 'zod';
import { RoleEnum } from '../types/roles.types';
import { StatusEnum } from '../types/status.types';
import { fileTypeSchema } from '@/features/files/schemas/files.schemas';

export const roleSchema = z.object({
    id: z.enum([RoleEnum.ADMINISTRATOR, RoleEnum.PRESIDENT, RoleEnum.MEMBER, RoleEnum.ALUMNI]).optional(),
    name: z.string()
});

export const statusSchema = z.object({
    id: z.enum([StatusEnum.ACTIVE, StatusEnum.INACTIVE]).optional(),
    name: z.string()
});

export const userResponseSchema = z.object({
    id: z.string(),
    email: z.string().email().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    photo: fileTypeSchema.nullable().optional(),
    role: roleSchema.nullable().optional(),
    status: statusSchema.nullable().optional(),
    provider: z.string().optional(),
    socialId: z.string().nullable().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
    deletedAt: z.string().datetime().nullable().optional(),
});

export const createUserRequestSchema = z.object({
    email: z.string().email().nullable(),
    password: z.string().min(6).optional(),
    firstName: z.string().min(1).nullable(),
    lastName: z.string().min(1).nullable(),
    photo: fileTypeSchema.nullable().optional(),
    role: roleSchema.nullable().optional(),
    status: statusSchema.optional(),
});

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

export const usersListResponseSchema = z.object({
    data: z.array(userResponseSchema),
    hasNextPage: z.boolean(),
});

export const queryUsersSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    filters: z.string().optional(),
    sort: z.string().optional(),
});

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UsersListResponse = z.infer<typeof usersListResponseSchema>;
export type QueryUsersDto = z.infer<typeof queryUsersSchema>;
