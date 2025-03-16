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

export interface PredictionResultType {
    timestamp: string,
    riskLevel: 'high' | 'low',
    hypertensionRisk: boolean,
    cardiovascularRisk: boolean,
    vitals: {
        BMI: number,
        bodyTemp: number,
        sysBP: number,
        diaBP: number,
        heartRate: number
    }
}

export interface PredictionResultProps {
    result: PredictionResultType
}

export interface HistoryProviderProps {
    children: ReactNode
}

export interface HistoryContextType {
    predictionHistory: any[],
    recommendations: any[]
}