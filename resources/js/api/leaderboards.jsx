import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useGetLeaderboards = () => {
    const axios = useAxios();
    const { accessToken } = useAccessToken();

    return useQuery({
        queryKey: ["leaderboards"],
        queryFn: async () => {
            const response = await axios.get("leaderboards", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        keepPreviousData: true,
        enabled: !!accessToken,
    });
};

export const useGetLeaderboardByUrlName = (urlName) => {
    const axios = useAxios();
    const { accessToken } = useAccessToken();

    const options = !!accessToken
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : undefined;

    return useQuery({
        queryKey: ["leaderboards", urlName],
        queryFn: async () => {
            const response = await axios.get(`leaderboards/${urlName}`, options);
            return response.data;
        },
        keepPreviousData: true,
    });
};

export const useCreateLeaderboard = (options) => {
    const axios = useAxios();
    const { accessToken } = useAccessToken();
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (data) => {
            const response = await axios.post(`leaderboards`, data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leaderboards"] });
            if (options?.onSuccess) {
                options.onSuccess();
            }
        },
    });
};

export const useUpdateLeaderboardByUrlName = (options) => {
    const axios = useAxios();
    const { accessToken } = useAccessToken();
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async ({ existingUrlName, ...data }) => {
            const response = await axios.patch(`leaderboards/${existingUrlName}`, data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leaderboards"] });
            if (options?.onSuccess) {
                options.onSuccess();
            }
        },
    });
};

export const useArchiveLeaderboardByUrlName = (options) => {
    const axios = useAxios();
    const { accessToken } = useAccessToken();
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (urlName) => {
            const response = await axios.delete(`leaderboards/${urlName}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leaderboards"] });
            if (options?.onSuccess) {
                options.onSuccess();
            }
        },
    });
};
