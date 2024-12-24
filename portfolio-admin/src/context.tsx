import React, { createContext } from "react";
import { useMyQuery } from "./assets/utils/query";

export type UserResponseType = {
    data: any;
    isLoading: boolean;
    error: Error | null;
}
export  const UserContext = createContext<UserResponseType | null>(null);
const UsercontextProvider = ({ children }: { children: React.ReactNode }) => {
    
    const { data, isLoading, error } = useMyQuery("/admin", "auth-user");
    return (
        <UserContext.Provider value={{ data, isLoading, error }}>
            {children}
        </UserContext.Provider>
    )
}

export default UsercontextProvider;
