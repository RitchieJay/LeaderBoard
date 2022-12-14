import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "../contexts/auth";
import { useAxios } from "../contexts/axios";

export const useSearchPeople = (query) => {
    const axios = useAxios();
    const { accessToken } = useAccessToken();

    return useQuery({
        queryKey: ["search/people", query],
        queryFn: async () => {
            const response = await axios.get("search/people", {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: {
                    query,
                },
            });
            return response.data;
        },
        keepPreviousData: true,
        enabled: !!accessToken && !!query,
    });
};
