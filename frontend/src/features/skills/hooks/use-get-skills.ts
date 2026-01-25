import { skillsApi } from "../api/skills.api";
import { useQuery } from "@tanstack/react-query";

export function useGetSkills(query?: { page?: number; limit?: number }) {
    return useQuery({
        queryKey: ['skills', query],
        queryFn: () => skillsApi.findAll(query),
    });
}
