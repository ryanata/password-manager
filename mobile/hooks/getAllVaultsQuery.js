import { useQuery } from "react-query";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext} from 'react';

export const useUser = async () => {
    let token = await getValueFor('pwdlytoken')
    //let result = await axios.get("https://pwdly.herokuapp.com/api/user/me", { headers: { Authorization: `Bearer ${token}` } });
    //console.log(result.data.vaults);
    // try {
    //     token = await SecureStore.getItemAsync('pwdlytoken');
    //     //token = token != null ? JSON.parse(token) : null;
    //     alert(token);
    // } catch (error) {
    //     console.log(error);
    //     alert(error);
    // }
    //alert(token);
    //return token;
    return useQuery( "getUser", () => axios.get("https://pwdly.herokuapp.com/api/user/me", { headers: { Authorization: `Bearer ${token}` } }));
};


  
async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if(!result)
        return 'none';
    return result;
}

export const VaultContext = createContext(null);