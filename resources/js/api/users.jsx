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

export const useGetUsers = () => {
    const axios = useAxios();
    const { accessToken } = useAuth();

    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await axios.get("users", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        enabled: !!accessToken,
    });
};

export const useGetUserByDisplayName = (displayName) => {
    const axios = useAxios();
    const { accessToken } = useAuth();

    return useQuery({
        queryKey: ["users", displayName],
        queryFn: async () => {
            const response = await axios.get(`users/${displayName}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        enabled: !!accessToken,
    });
};
