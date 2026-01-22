import { z } from 'zod';

export const roleSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
});

export const statusSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
});

export const fileSchema = z.object({
    id: z.string(),
    path: z.string(),
});

export const userSchema = z.object({
    id: z.string(),
    email: z.string().email().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    photo: fileSchema.nullable().optional(),
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
    photo: fileSchema.nullable().optional(),
    role: roleSchema.nullable().optional(),
    status: statusSchema.optional(),
});

export const updateUserRequestSchema = createUserRequestSchema.partial();

export const userResponseSchema = userSchema;

export const usersListResponseSchema = z.object({
    data: z.array(userSchema),
    hasNextPage: z.boolean(),
});

export const queryUsersSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    filters: z.string().optional(),
    sort: z.string().optional(),
});

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UsersListResponse = z.infer<typeof usersListResponseSchema>;
export type QueryUsersDto = z.infer<typeof queryUsersSchema>;
