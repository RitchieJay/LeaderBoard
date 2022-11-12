import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
});

export const AxiosContext = createContext({
    axios: axiosInstance,
});

export const useAxios = () => useContext(AxiosContext);

export const AxiosProvider = ({ children }) => {
    return <AxiosContext.Provider value={axiosInstance}>{children}</AxiosContext.Provider>;
};

AxiosProvider.propTypes = {
    children: PropTypes.node,
};
