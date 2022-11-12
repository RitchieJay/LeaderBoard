import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/auth";
import { useAxios } from "../contexts/axios";

export const useGetMe = () => {
    const axios = useAxios();
    const { accessToken } = useAuth();

    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const response = await axios.get("me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        enabled: !!accessToken,
    });
};
