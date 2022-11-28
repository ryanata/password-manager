import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";

// Vault state context
export const VaultContext = createContext(null);

// Custom hook to access user data
export const useUser = () => {
    let token = "none";
    try {
        token = JSON.parse(localStorage.getItem("pwdlyToken"));
    } catch (error) {
        console.log(error);
    }
    return useQuery(["getUser"], () => axios.get("/api/user/me", { headers: { Authorization: `Bearer ${token}` } }));
};

export const useVaults = () => {
    let token = "none";
    try {
        token = JSON.parse(localStorage.getItem("pwdlyToken"));
    } catch (error) {
        console.log(error);
    }
    return useQuery(["getVaults"], () => axios.get("/api/vault", { headers: { Authorization: `Bearer ${token}` } }));
};

export const useVault = (vaultId) => {
    return useQuery([`getVault_${vaultId}`], () => axios.get(`/api/vault/${vaultId}`));
};

export const createVault = (userId, name, masterPassword) => {
    return axios.post(`/api/vault`, { userId, name, masterPassword });
};
