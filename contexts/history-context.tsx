import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './auth-context';
import { HistoryContextType, HistoryProviderProps } from '@/utils/types';

export const HistoryContext = createContext<HistoryContextType>({
    predictionHistory: [],
    recommendations: []
});

const HistoryProvider: React.FC<HistoryProviderProps> = ({ children }) => {

    const { token } = useContext(AuthContext);

    const [predictionHistory, setPredictionHistory] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const fetchHistoricPredictions = async () => {
        try {
            const response = await fetch('https://vitality-ai-server-production.up.railway.app/api/predict/get-predictions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if(response.ok) {
                const data = await response.json();
                setPredictionHistory(data.predictions.reverse());
            }
        } catch (error) {
            console.error('Error fetching historic predictions', error);
        }
    }

    const fetchCareRecommendations = async () => {
        try {
            const response = await fetch('https://vitality-ai-server-production.up.railway.app/api/recommendation/get-recommendations', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if(response.ok) {
                const data = await response.json();
                setRecommendations(data.recommendations.reverse());
            }
        } catch (error) {
            console.error('Error fetching care recommendations', error);
        }
    }

    useEffect(() => {
        if(token) {
            fetchHistoricPredictions();
            fetchCareRecommendations();
        }
    }, [token]);

    return (
        <HistoryContext.Provider value={{ predictionHistory, recommendations }}>
            {children}
        </HistoryContext.Provider>
    )
}

export default HistoryProvider;