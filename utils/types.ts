import { Dispatch, ReactNode, SetStateAction } from "react";

export interface AuthContextType {
    user: any,
    token: string | null,
    loginUser: (token: string, redirectTo?: any) => void,
    logoutUser: () => void,
    setUser: Dispatch<SetStateAction<any>>,
    setToken: Dispatch<SetStateAction<string | null>>,
    fetchUserData: (access_token: string) => void
}

export interface AuthProviderProps {
    children: ReactNode;
}