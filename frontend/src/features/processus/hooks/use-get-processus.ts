import { useQuery } from "@tanstack/react-query";
import { processusApi } from "../api/processus.api";

export const useGetProcessus = () => {
    return useQuery({
        queryKey: ["processus"],
        queryFn: () => { const processus = processusApi.findAll(); console.log("processus: ", processus); return processus; },
    });
};