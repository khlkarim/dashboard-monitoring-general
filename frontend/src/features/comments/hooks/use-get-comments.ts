import { useQuery } from "@tanstack/react-query";
import { commentsApi } from "../api/comments.api";

export const useGetComments = (taskId: string) => {
    return useQuery({
        queryKey: ["comments", taskId],
        queryFn: () => commentsApi.findAllByTaskId(taskId),
    });
};
