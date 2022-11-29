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
    return useQuery([`getVault_${vaultId}`], () => {
        return new Promise((resolve, reject) => {
            axios
                .get(`/api/vault/${vaultId}`)
                .then((res) => {
                    resolve(res.data);
                }
                )
                .catch((err) => {
                    reject(err);
                }
                );
            });
    });
};

export const createVault = (userId, name, masterPassword) => {
    return axios.post("/api/vault", { userId, name, masterPassword });
};

export const setSites = (vaultId, sites) => {
    // Return promise to wrap axios call
    return new Promise((resolve, reject) => {
        axios
            .put(`/api/vault/${vaultId}/setSites`, { sites })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

