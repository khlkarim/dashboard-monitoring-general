import api from "@/lib/api";
import { GeneralStatistics } from "../types/dashboard.types";

export const dashboardApi = {
  getGeneralStatistics: async (): Promise<GeneralStatistics> => {
    const response = await api.get("/api/statistics");
    return response.data;
  },
};
