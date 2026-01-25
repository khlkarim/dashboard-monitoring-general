import api from '@/lib/api';
import { FileResponse } from '../schemas/files.schemas';

export const filesApi = {
    /** POST /api/v1/files/upload */
    upload: async (file: File): Promise<FileResponse> => {
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
