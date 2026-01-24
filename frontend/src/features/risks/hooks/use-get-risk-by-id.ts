import { risksApi } from "../api/risks.api";
import { useQuery } from "@tanstack/react-query";

export const useGetRiskById = (riskId: string) => {
    return useQuery({
        queryKey: ["risks"],
        queryFn: () => risksApi.findOne(riskId),
    });
};
