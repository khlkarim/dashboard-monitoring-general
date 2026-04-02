import { risksApi } from "../api/risks.api";
import { useQuery } from "@tanstack/react-query";

export const useGetRisks = () => {
    return useQuery({
        queryKey: ["risks"],
        queryFn: () => risksApi.findAll(),
    });
};
