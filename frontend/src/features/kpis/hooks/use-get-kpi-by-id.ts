import { kpisApi } from "../api/kpis.api";
import { useQuery } from "@tanstack/react-query";

export const useGetKpiById = (kpiId: string) => {
    return useQuery({
        queryKey: ["kpis"],
        queryFn: () => kpisApi.findOne(kpiId),
    });
};
