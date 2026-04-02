import { useQuery } from "@tanstack/react-query";
import { processusApi } from "../api/processus.api";

export const useGetProcessus = () => {
    return useQuery({
        queryKey: ["processus"],
        queryFn: () => processusApi.findAll(),
    });
};