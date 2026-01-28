import { useQuery } from "@tanstack/react-query";
import { activitiesApi } from "../api/activities.api";

export const useGetActivityById = (activityId: string) => {
    return useQuery({
        queryKey: ["activities"],
        queryFn: () => activitiesApi.findOne(activityId),
    });
};
