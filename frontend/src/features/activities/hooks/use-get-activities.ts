import { useQuery } from "@tanstack/react-query";
import { activitiesApi } from "../api/activities.api";

export const useGetActivities = () => {
    return useQuery({
        queryKey: ["activities"],
        queryFn: () => activitiesApi.findAll(),
    });
};
