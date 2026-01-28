import { useQuery } from "@tanstack/react-query";
import { activitiesApi } from "../api/activities.api";

export const useGetActivitiesByProcessusId = (processusId: string) => {
    return useQuery({
        queryKey: ["activities", processusId],
        queryFn: () => activitiesApi.findAllByProcessusId(processusId),
    });
};
