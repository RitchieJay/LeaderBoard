import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccessToken } from "../contexts/auth";
import { useAxios } from "../contexts/axios";

export const useGetMe = () => {
    const axios = useAxios();
    const { accessToken } = useAccessToken();

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
    const { accessToken } = useAccessToken();

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
    const { accessToken } = useAccessToken();

    return useQuery({
        queryKey: ["users", displayName],
        queryFn: async () => {
            const response = await axios.get(`users/${displayName}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        enabled: !!accessToken && !!displayName,
    });
};

export const useCreateUser = ({ onSuccess, ...options }) => {
    const axios = useAxios();
    const { accessToken } = useAccessToken();
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (data) => {
            const response = await axios.post(`users`, data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            onSuccess();
        },
    });
};

export const useUpdateUserByDisplayName = ({ onSuccess, ...options }) => {
    const axios = useAxios();
    const { accessToken } = useAccessToken();
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async ({ existingDisplayName, ...data }) => {
            const response = await axios.patch(`users/${existingDisplayName}`, data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            onSuccess();
        },
    });
};

export const useArchiveUserByDisplayName = ({ onSuccess, ...options }) => {
    const axios = useAxios();
    const { accessToken } = useAccessToken();
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (displayName) => {
            const response = await axios.delete(`users/${displayName}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            onSuccess();
        },
    });
};
