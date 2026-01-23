import api from '@/lib/api';
import { fileTypeSchema } from '@/features/auth/schemas/auth.schemas';
import { z } from 'zod';

export const filesApi = {
    /** POST /api/v1/files/upload */
    upload: async (file: File): Promise<{ file: z.infer<typeof fileTypeSchema> }> => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await api.post('/api/v1/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return res.data;
    },
};
