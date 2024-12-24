import { useMutation, useQuery } from "@tanstack/react-query"
import Axios from "./axios"

const useMyQuery = <ResponseType>(url: string, querykey: string) => {
    return useQuery({
        queryKey: [querykey], queryFn: async () => {
            const response = await Axios.get(url);
            const data: ResponseType = response.data
            return data;
        },
        retry: false,
    
    })
}
const useMyMutation = <ResponseType, PayloadType>(url: string, mutationKey: string) => {
    return useMutation({
        mutationKey: [mutationKey], mutationFn: async (params: PayloadType) => {
            const response = await Axios.post(url, params);
            const data: ResponseType = response.data
            return data;

        }
    })
}
export {useMyMutation,useMyQuery}