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

export const useGetUsers = (includeInactive = false) => {
    const axios = useAxios();
    const { accessToken } = useAccessToken();

    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await axios.get("users", {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: {
                    includeInactive: includeInactive ? 1 : 0,
                },
            });
            return response.data;
        },
        keepPreviousData: true,
        enabled: !!accessToken,
    });
};

export const useCreateUser = (options) => {
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
            if (options?.onSuccess) {
                options.onSuccess();
            }
        },
    });
};

export const useUpdateUserByDisplayName = (options) => {
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
            if (options?.onSuccess) {
                options.onSuccess();
            }
        },
    });
};

export const useArchiveUserByDisplayName = (options) => {
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
            if (options?.onSuccess) {
                options.onSuccess();
            }
        },
    });
};
