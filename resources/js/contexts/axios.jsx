import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";

const defaultState = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
});

export const AxiosContext = createContext(defaultState);

export const useAxios = () => useContext(AxiosContext);

export const AxiosProvider = ({ children }) => {
    return <AxiosContext.Provider value={defaultState}>{children}</AxiosContext.Provider>;
};

AxiosProvider.propTypes = {
    children: PropTypes.node,
};
