import { useQuery } from "react-query";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {createContext} from 'react';

export const getMe = async () => {
    const token = await getValueFor('pwdlytoken')
    const { data }  = await axios.get("https://pwdly.herokuapp.com/api/user/me", { headers: { Authorization: `Bearer ${token}` } });
    return data;
};
  
async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if(!result)
        return 'none';
    return result;
}

export const VaultContext = createContext(null);