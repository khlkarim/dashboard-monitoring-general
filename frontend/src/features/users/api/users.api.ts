import api from '@/lib/api';
import {
    createUserRequestSchema,
    createUserResponseSchema,
    updateUserRequestSchema,
    updateUserResponseSchema,
    userResponseSchema,
    usersListResponseSchema,
    type CreateUserRequest,
    type CreateUserResponse,
    type UpdateUserRequest,
    type UpdateUserResponse,
    type UserResponse,
    type UsersListResponse,
    type QueryUsersDto,
} from '../schemas/users.schemas';
import { filesApi } from '@/features/files/api/files.api';

export const usersApi = {
    /** POST /api/v1/users */
    create: async (data: CreateUserRequest): Promise<CreateUserResponse> => {
        createUserRequestSchema.parse(data);
        const res = await api.post('/api/v1/users', data);
        return createUserResponseSchema.parse(res.data);
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
    update: async (id: string, data: UpdateUserRequest): Promise<UpdateUserResponse> => {
        updateUserRequestSchema.parse(data);
        console.log(data);

        const payload = { ...data };

        if (data.photo instanceof File) {
            const uploadResult = await filesApi.upload(data.photo);
            payload.photo = uploadResult.file;
        }

        const res = await api.patch(`/api/v1/users/${id}`, payload);
        return updateUserResponseSchema.parse(res.data);
    },

    /** DELETE /api/v1/users/:id */
    remove: async (id: string): Promise<void> => {
        await api.delete(`/api/v1/users/${id}`);
    },

    /** GET /api/v1/users/:id/statistics */
    getMemberStatistics: async (userId: string) => {
        const res = await api.get(`/api/v1/users/${userId}/statistics`);
        return res.data;
    },
};
