import api from "@/lib/api";
import {
  processusResponseSchema,
  CreateProcessusRequest,
  UpdateProcessusRequest,
  ProcessusResponse,
  FindAllProcessusQuery,
  processusListResponseSchema,
  ProcessusListResponse,
  createProcessusRequestSchema,
  updateProcessusRequestSchema,
} from "../schemas/processus.schemas";
import { ProcessusStatistics } from "../types/processus.types";

export const processusApi = {
  /** POST /api/v1/processus */
  create: async (data: CreateProcessusRequest): Promise<ProcessusResponse> => {
    createProcessusRequestSchema.parse(data);
    const res = await api.post("/api/v1/processus", data);
    return processusResponseSchema.parse(res.data);
  },

  /** GET /api/v1/processus */
  findAll: async (query?: FindAllProcessusQuery): Promise<ProcessusListResponse> => {
    const res = await api.get("/api/v1/processus", { params: query });
    return processusListResponseSchema.parse(res.data);
  },

  /** GET /api/v1/processus/:id */
  findOne: async (id: string): Promise<ProcessusResponse> => {
    const res = await api.get(`/api/v1/processus/${id}`);
    return processusResponseSchema.parse(res.data);
  },

  /** PATCH /api/v1/processus/:id */
  update: async (id: string, data: UpdateProcessusRequest): Promise<ProcessusResponse> => {
    updateProcessusRequestSchema.parse(data);
    const res = await api.patch(`/api/v1/processus/${id}`, data);
    return processusResponseSchema.parse(res.data);
  },

  /** DELETE /api/v1/processus/:id */
  remove: async (id: string): Promise<void> => {
    await api.delete(`/api/v1/processus/${id}`);
  },

  /** GET /api/v1/processus/:id/statistics */
  getProcessusStatistics: async (processusId: string): Promise<ProcessusStatistics> => {
    const res = await api.get(`/api/v1/processus/${processusId}/statistics`);
    return res.data;
  },
};
