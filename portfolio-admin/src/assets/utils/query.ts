import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Axios from "./axios"

const useMyQuery = <ResponseType>(url: string, querykey: string) => {
    return useQuery({
        queryKey: [querykey], queryFn: async () => {
            const response = await Axios.get(url);
            const data: ResponseType = response.data
            return data;
        },
        retry: false,
});
}
const useMyMutation = <PayloadType>(url: string, mutationKey: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [mutationKey], mutationFn: async (params: PayloadType) => {
            const response = await Axios.post(url, params);
            const data: ResponseType = response?.data
            return data;

        }, onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
    })
}
export { useMyMutation, useMyQuery }