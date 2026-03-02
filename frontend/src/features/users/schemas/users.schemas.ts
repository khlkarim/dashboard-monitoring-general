import { z } from 'zod';
import { RoleEnum } from '../types/roles.types';
import { StatusEnum } from '../types/status.types';
import { fileTypeSchema } from '@/features/files/schemas/files.schemas';
import { skillResponseSchema } from '@/features/skills/schemas/skills.schemas';
import { processusResponseSchema } from '@/features/processus/schemas/processus.schemas';

export const roleSchema = z.object({
    id: z.enum([RoleEnum.ADMINISTRATOR, RoleEnum.PRESIDENT, RoleEnum.MEMBER, RoleEnum.ALUMNI]).optional(),
    name: z.string().nullable().optional(),
});

export const statusSchema = z.object({
    id: z.enum([StatusEnum.ACTIVE, StatusEnum.INACTIVE]).optional(),
    name: z.string().nullable().optional(),
});

export const userResponseSchema = z.object({
    id: z.string(),
    email: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    phoneNumber: z.string().nullable().optional(),
    photo: fileTypeSchema.nullable().optional(),
    role: roleSchema.nullable().optional(),
    status: statusSchema.nullable().optional(),
    skills: z.array(skillResponseSchema),
    processus: processusResponseSchema.optional().nullable(),
    workplace: z.string().nullable().optional(),
    mandate: z.string().nullable().optional(),
    provider: z.string().optional(),
    socialId: z.string().nullable().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
    deletedAt: z.string().datetime().nullable().optional(),
});

export const createUserRequestSchema = z.object({
    email: z.string().nullable(),
    password: z.string().min(6).optional(),
    firstName: z.string().min(1).nullable(),
    lastName: z.string().min(1).nullable(),
    phoneNumber: z.string().nullable().optional(), // Added here
    photo: fileTypeSchema.nullable().optional(),
    role: roleSchema.nullable().optional(),
    status: statusSchema.optional(),
    processus: z.object({ id: z.string() }).optional().nullable(),
    workplace: z.string().nullable().optional(),
    mandate: z.string().nullable().optional(),
});

/** Update User */
export const updateUserRequestSchema = z.object({
    photo: z.any().nullable().optional(),
    firstName: z.string().min(1).optional().nullable(),
    lastName: z.string().min(1).optional().nullable(),
    email: z.string().optional().nullable(),
    phoneNumber: z.string().nullable().optional(),
    password: z.string().min(6).optional().nullable(),
    oldPassword: z.string().min(1).optional().nullable(),
    role: roleSchema.nullable().optional().nullable(),
    skills: z.array(skillResponseSchema).optional().nullable(),
    processus: z.object({ id: z.string() }).optional().nullable(),
    workplace: z.string().nullable().optional(),
    mandate: z.string().nullable().optional(),
});

export const updateUserResponseSchema = z.object({
    id: z.string(),
    email: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    phoneNumber: z.string().nullable().optional(),
    photo: fileTypeSchema.nullable().optional(),
    role: roleSchema.nullable().optional(),
    status: statusSchema.nullable().optional(),
    skills: z.array(skillResponseSchema).optional().nullable(),
    processus: processusResponseSchema.optional().nullable(),
    workplace: z.string().nullable().optional(),
    mandate: z.string().nullable().optional(),
    provider: z.string().optional(),
    socialId: z.string().nullable().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
    deletedAt: z.string().datetime().nullable().optional(),
});
export const createUserResponseSchema = updateUserResponseSchema;

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
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>;
export type UsersListResponse = z.infer<typeof usersListResponseSchema>;
export type QueryUsersDto = z.infer<typeof queryUsersSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
