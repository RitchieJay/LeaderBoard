import { useMsal } from "@azure/msal-react";
import { useQuery } from "@tanstack/react-query";
import { getAuthAccessToken } from "../contexts/auth";
import { useAxios } from "../contexts/axios";

export const useGetMe = () => {
    const axios = useAxios();
    const { instance: msalInstance, accounts } = useMsal();

    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const accessToken = await getAuthAccessToken(msalInstance, accounts);
            const response = await axios.get("me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data;
        },
    });
};
