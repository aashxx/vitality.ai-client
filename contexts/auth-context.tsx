import { getToken, removeToken, saveToken } from '@/utils/auth-service';
import { AuthContextType, AuthProviderProps, User } from '@/utils/types';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    loginUser: () => {},
    logoutUser: () => {}
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const loadToken = async () => {
        const token = await getToken();
        if(token) setToken(token);
    }

    useEffect(() => {
        loadToken();
    }, []);

    const loginUser = async (token: string, userData: User) => {
        await saveToken(token);
        setUser(userData);
        setToken(token);
    }

    const logoutUser = async () => {
        await removeToken();
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;