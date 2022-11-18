import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "../contexts/auth";
import { useAxios } from "../contexts/axios";

export const useGetRankingMethods = () => {
    const axios = useAxios();
    const { accessToken } = useAccessToken();

    return useQuery({
        queryKey: ["ranking-methods"],
        queryFn: async () => {
            const response = await axios.get("ranking-methods", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        keepPreviousData: true,
        enabled: !!accessToken,
    });
};
