import { useQuery } from "@tanstack/react-query";
import { risksApi } from "../api/risks.api";

export const useGetRisks = () => {
    return useQuery({
        queryKey: ["risks"],
        queryFn: () => risksApi.findAll(),
    });
};
