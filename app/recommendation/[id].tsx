import { View, Text, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { HistoryContext } from '@/contexts/history-context';
import { Link, useLocalSearchParams } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatAIResponse, formatDateTime } from '@/utils/helpers';
import RecommendationTable from '@/components/recommendation-table';

const RecommendationHistory = () => {

    const { recommendations } = useContext(HistoryContext);

    const { id } = useLocalSearchParams();
    
    const result = recommendations.find(recommendation => recommendation._id['$oid'] === id);

    return (
        <ScrollView className='bg-white'>
            <View className="justify-between p-6 flex-row items-center pt-10">
                <Text className="text-5xl">Care Advice</Text>
                <Link className='text-blue-500' href={'/(tabs)/predict'}>
                    <Feather name="plus-circle" size={30} color="black" />
                </Link>
            </View>
            <View className='flex-row justify-between px-10 my-7'>
                <Link href={'/(tabs)/care'}>
                    <Ionicons name="chevron-back-outline" size={24} color="black" />
                </Link>
                <Text className="text-gray-600 text-lg">
                    📅 {formatDateTime(result.timestamp)}
                </Text>
            </View>
            <RecommendationTable recommendation={formatAIResponse(result.recommendation)} />
        </ScrollView>
    )
}

export default RecommendationHistory;