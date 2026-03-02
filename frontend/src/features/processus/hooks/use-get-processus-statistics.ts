import { processusApi } from "../api/processus.api";
import { useQuery } from "@tanstack/react-query";

export const useGetProcessusStatistics = (processusId: string) => {
  return useQuery({
    queryKey: ["processus", processusId, "statistics"],
    queryFn: () => processusApi.getProcessusStatistics(processusId),
    enabled: !!processusId,
  });
};
