import { getToken, removeToken, saveToken } from '@/utils/auth-service';
import { AuthContextType, AuthProviderProps } from '@/utils/types';
import { usePathname, useRouter, useSegments } from 'expo-router';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    loginUser: () => {},
    logoutUser: () => {},
    setUser: () => {},
    setToken: () => {},
    fetchUserData: () => {}
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const router = useRouter();
    const pathname = usePathname();

    const fetchUserData = async (access_token: string) => {
        try {
            const response = await fetch('https://vitality-ai-server-production.up.railway.app/api/auth/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            });
            const data = await response.json();
            if(data.msg === "Token has expired") {
                logoutUser();
            } else {
                setUser(data.user)
            }
        } catch (error) {
            console.error('Failed to fetch user data', error);
        }
    }

    const loadUser = async () => {
        const access_token = await getToken();
        if(access_token) {
            fetchUserData(access_token);
            setToken(access_token);
            if (pathname === '/') {
                router.push('/(tabs)/home');
            }
        }
    }

    useEffect(() => {
        loadUser();
    }, [token]);

    const loginUser = (token: string, redirectTo?: any) => {
        saveToken(token);
        setToken(token);
        if(redirectTo) {
            router.push(redirectTo);
        }
    }

    const logoutUser = async () => {
        await removeToken();
        setUser(null);
        setToken(null);
        router.push('/');
    }

    return (
        <AuthContext.Provider value={{ user, token, loginUser, logoutUser, setUser, setToken, fetchUserData }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;