import { useQuery } from "react-query";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {createContext} from 'react';

export const getMe = async () => {
    const token = await getValueFor('pwdlytoken')
    const { data }  = await axios.get("https://pwdly.herokuapp.com/api/user/me", { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
  
export async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if(!result)
        return 'none';
    return result;
}

export const getVaults = async () => {
    const token = await getValueFor('pwdlytoken')
    const { data }  = await axios.get("https://pwdly.herokuapp.com/api/vault", { headers: { Authorization: `Bearer ${token}` } });
    return data;
};



export const useVault = (vaultId) => {
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
};

export const getVaultData = async (vaultId) => {
    //console.log(vaultId)
    axios.get(`https://pwdly.herokuapp.com/api/vault/${vaultId}`)
        .then(function (response) {
            console.log(response.data.vault.sites[2]); //this will print sites based on array inde
        })
        .catch(function (error) {
            console.log(error);
        });
    console.log(response)
    return response;
}

export const VaultContext = createContext(null);