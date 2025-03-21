import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './auth-context';
import { HistoryContextType, HistoryProviderProps } from '@/utils/types';
import { formatDateTime } from '@/utils/helpers';

export const HistoryContext = createContext<HistoryContextType>({
    predictionHistory: [],
    recommendations: [],
    bmiDataset: {},
    heartRateDataset: {},
});

const HistoryProvider: React.FC<HistoryProviderProps> = ({ children }) => {

    const { token } = useContext(AuthContext);

    const [predictionHistory, setPredictionHistory] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [bmiDataset, setBmiDataset] = useState({});
    const [heartRateDataset, setHeartRateDataset] = useState({});

    const getChartData = (field: string, historyData: any) => {
        const data = historyData.map((prediction) => ({
            timestamp: new Date(prediction.timestamp).toLocaleDateString(),
            value: prediction.vitals[field]
        }));

        return {
            labels: data.map(item => item.timestamp), 
            datasets: [
                {
                    data: data.map(item => item.value),
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red color
                    strokeWidth: 2
                }
            ]
        };
    };

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
                const predictions = data.predictions.reverse();
                setPredictionHistory(predictions);
                
                const bmiData = getChartData('BMI', predictions);
                const heartRateData = getChartData('heartRate', predictions);

                setBmiDataset(bmiData);
                setHeartRateDataset(heartRateData);
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
        <HistoryContext.Provider value={{ predictionHistory, recommendations, bmiDataset, heartRateDataset }}>
            {children}
        </HistoryContext.Provider>
    )
}

export default HistoryProvider;