import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Text } from 'react-native';

// Vault state context
export const VaultContext = createContext(null);

// Custom hook to access user data
export const useUser = () => {
    let token = "none";
    try {
        SecureStore.getItemAsync('pwdlytoken').then((response) => {token = response})
    } catch (error) {
        console.log(error);
    }
    return useQuery(["getUser"], () => axios.get("https://pwdly.herokuapp.com/api/user/me", { headers: { Authorization: `Bearer ${token}` } }));
};

export const getUserId = () => {
    const { data, isLoading, isError, error } = useUser();
    
    if(isLoading){
     return <Text>Loading vault</Text>
     }
     if(isError){
         Alert("Error: placeholder")
         return <Text>Errorr</Text>
     }
    return data.data._id
}

export const getVaults = () => {
    return new Promise((resolve, reject) => {
        SecureStore.getItemAsync('pwdlytoken')
        .then((response) => {
            return axios.get("https://pwdly.herokuapp.com/api/vault", { headers: { Authorization: `Bearer ${response}` } })
        })
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
        })
    });
};

export const deleteVault = (vaultId, userId) => {
    return axios.delete(`https://pwdly.herokuapp.com/api/vault/${vaultId}`, { data: { userId: userId } });
};

export const deleteSite = (vaultId, siteId) => {
    return axios.delete(`https://pwdly.herokuapp.com/api/vault/${vaultId}/site/${siteId}`);
};

export const useVault = (vaultId) => {
    return useQuery([`getVault_${vaultId}`], () => {
        return new Promise((resolve, reject) => {
            axios
                .get(`https://pwdly.herokuapp.com/api/vault/${vaultId}`)
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
                    .get(`https://pwdly.herokuapp.com/api/vault/${vaultId}/searchSites/${searchTerm}`)
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
    return axios.post("https://pwdly.herokuapp.com/api/vault", { userId, name, masterPassword });
};

export const setSites = (vaultId, sites) => {
    // Return promise to wrap axios call
    return new Promise((resolve, reject) => {
        axios
            .put(`https://pwdly.herokuapp.com/api/vault/${vaultId}/setSites`, { sites })
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
            .post("/api/generatePassword", { length, numbers, symbols, uppercase, lowercase })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

//store value in local storage
export async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}
//retrieve value from local storage
export async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result
    } else {
      alert('No values stored under that key.');
    }
}