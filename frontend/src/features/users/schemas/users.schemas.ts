import { z } from 'zod';

// Shared schemas from other features or common defaults
// Since we don't have direct access to import from 'features/auth' without circular dependency risks sometimes,
// we might want to duplicate or import carefully. 
// For now, I will define standard schemas here or check if I can reuse.
// As per reference 'auth.schemas.ts', we can reuse concepts.

// ---------------------------------------------------------
// User Entity Schemas (Mirroring Backend)
// ---------------------------------------------------------

export const roleSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
});

export const statusSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
});

export const fileSchema = z.object({
    id: z.string(),
    path: z.string(),
});

export const processusSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
});

export const userSchema = z.object({
    id: z.string().or(z.number()),
    email: z.string().email().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    photo: fileSchema.nullable().optional(),
    role: roleSchema.nullable().optional(),
    status: statusSchema.nullable().optional(),
    provider: z.string().optional(),
    socialId: z.string().nullable().optional(),
    processus: processusSchema.nullable().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
    deletedAt: z.string().datetime().nullable().optional(),
});

// ---------------------------------------------------------
// API Request/Response Schemas
// ---------------------------------------------------------

export const createUserRequestSchema = z.object({
    email: z.string().email().nullable(),
    password: z.string().min(6).optional(),
    firstName: z.string().min(1).nullable(),
    lastName: z.string().min(1).nullable(),
    photo: fileSchema.nullable().optional(),
    role: roleSchema.nullable().optional(),
    status: statusSchema.optional(),
    processus: processusSchema.nullable().optional(),
});

export const updateUserRequestSchema = createUserRequestSchema.partial();

export const usersResponseSchema = userSchema;

export const usersListResponseSchema = z.object({
    data: z.array(userSchema),
    hasNextPage: z.boolean(),
});

export const queryUserSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    filters: z.string().optional(), // Usually JSON string or complex object, simplified for query params
    sort: z.string().optional(),
});

// Types inferred
export type User = z.infer<typeof userSchema>;
export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export type UsersResponse = z.infer<typeof usersResponseSchema>;
export type UsersListResponse = z.infer<typeof usersListResponseSchema>;
export type QueryUserDto = z.infer<typeof queryUserSchema>;
