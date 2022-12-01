import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

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
                })
                .catch((err) => {
                    reject(err);
                });
        });
    });
};

export const useVaultSearch = (vaultId, searchTerm) => {
    return useQuery([`getVaultSearch_${vaultId}`, searchTerm], () => {
        return new Promise((resolve, reject) => {
            if (searchTerm === "") {
                resolve(null);
            } else {
                axios
                    .get(`/api/vault/${vaultId}/searchSites/${searchTerm}`)
                    .then((res) => {
                        resolve(res.data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
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
};

export const useDebounce = (value, delay) => {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
};


export const getGeneratePassword = (length, numbers, symbols, uppercase, lowercase) => {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/generatePassword', { length, numbers, symbols, uppercase, lowercase })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};