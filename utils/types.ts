import { ReactNode } from "react";

export interface AuthContextType {
    user: User | null,
    token: string | null,
    loginUser: (token: string, userData: User) => void,
    logoutUser: () => void
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface User {

}