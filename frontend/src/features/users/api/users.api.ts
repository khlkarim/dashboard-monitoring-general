import api from '@/lib/api';
import {
    createUserRequestSchema,
    updateUserRequestSchema,
    usersResponseSchema,
    usersListResponseSchema,
    type CreateUserRequest,
    type UpdateUserRequest,
    type UsersResponse,
    type UsersListResponse,
    type QueryUserDto,
} from '../schemas/users.schemas';

export const usersApi = {
    /** POST /api/v1/users */
    create: async (data: CreateUserRequest): Promise<UsersResponse> => {
        createUserRequestSchema.parse(data);
        const res = await api.post('/api/v1/users', data);
        return usersResponseSchema.parse(res.data);
    },

    /** GET /api/v1/users */
    findAll: async (query?: QueryUserDto): Promise<UsersListResponse> => {
        const res = await api.get('/api/v1/users', { params: query });
        return usersListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/users/alumni */
    getAlumni: async (query?: QueryUserDto): Promise<UsersListResponse> => {
        const res = await api.get('/api/v1/users/alumni', { params: query });
        return usersListResponseSchema.parse(res.data);
    },

    /** GET /api/v1/users/:id */
    findOne: async (id: string): Promise<UsersResponse> => {
        const res = await api.get(`/api/v1/users/${id}`);
        return usersResponseSchema.parse(res.data);
    },

    /** PATCH /api/v1/users/:id */
    update: async (id: string, data: UpdateUserRequest): Promise<UsersResponse> => {
        updateUserRequestSchema.parse(data);
        const res = await api.patch(`/api/v1/users/${id}`, data);
        return usersResponseSchema.parse(res.data);
    },

    /** DELETE /api/v1/users/:id */
    remove: async (id: string): Promise<void> => {
        await api.delete(`/api/v1/users/${id}`);
    },
};
