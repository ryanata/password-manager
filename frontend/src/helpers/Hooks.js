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
