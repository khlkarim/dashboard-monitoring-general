import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboard.api";

export const useGetGeneralStatistics = () => {
  return useQuery({
    queryKey: ["generalStatistics"],
    queryFn: dashboardApi.getGeneralStatistics,
  });
};
