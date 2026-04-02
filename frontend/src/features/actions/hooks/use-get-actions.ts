import { useQuery } from "@tanstack/react-query";
import { actionsApi } from "../api/actions.api";

export const useGetActions = (riskId: string) => {
    return useQuery({
        queryKey: ["actions", riskId],
        queryFn: () => actionsApi.findAllByRiskId(riskId),
    });
};
