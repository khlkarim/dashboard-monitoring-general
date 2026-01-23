import api from '@/lib/api';
import {
    createUserRequestSchema,
    updateUserRequestSchema,
    userResponseSchema,
    usersListResponseSchema,
    type CreateUserRequest,
    type UpdateUserRequest,
    type UserResponse,
    type UsersListResponse,
    type QueryUsersDto,
} from '../schemas/users.schemas';

export const usersApi = {
    /** POST /api/v1/users */
    create: async (data: CreateUserRequest): Promise<UserResponse> => {
        createUserRequestSchema.parse(data);
        const res = await api.post('/api/v1/users', data);
        return userResponseSchema.parse(res.data);
    },

    /** GET /api/v1/users */
    findAll: async (query?: QueryUsersDto): Promise<UsersListResponse> => {
        const res = await api.get('/api/v1/users', { params: query });
        return usersListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/users/alumni */
    getAlumni: async (query?: QueryUsersDto): Promise<UsersListResponse> => {
        const res = await api.get('/api/v1/users/alumni', { params: query });
        return usersListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/users/:id */
    findOne: async (id: string): Promise<UserResponse> => {
        const res = await api.get(`/api/v1/users/${id}`);
        return userResponseSchema.parse(res.data);
    },

    /** PATCH /api/v1/users/:id */
    update: async (id: string, data: UpdateUserRequest): Promise<UserResponse> => {
        console.log("Update user request: ", id, data);

        updateUserRequestSchema.parse(data);
        const res = await api.patch(`/api/v1/users/${id}`, data);
        return userResponseSchema.parse(res.data);
    },

    /** DELETE /api/v1/users/:id */
    remove: async (id: string): Promise<void> => {
        await api.delete(`/api/v1/users/${id}`);
    },
};
