import { View, Text } from 'react-native';
import React from 'react';
import { RecommendationCardProps } from '@/utils/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import { formatDateTime } from '@/utils/helpers';

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
    return (
        <View className='w-full border border-[#D3D3D3] px-5 py-3 rounded-xl flex-row justify-between items-center'>
            <View className='flex-col gap-5'>
                <Text className='text-xl'>
                    📅 {formatDateTime(recommendation.timestamp)}
                </Text>
                <View className='flex-row gap-2 items-center'>
                    <Text className='text-lg'>
                        Status: {recommendation.status === 'high' ? 'Abnormal': 'Healthy'}
                    </Text>
                    {
                        recommendation.status === 'low' ? (
                            <FontAwesome5 name="check-circle" size={16} color="green" />
                        ) : (
                            <FontAwesome name="warning" size={14} color="red" />
                        )
                    }
                </View>
            </View>
            <Feather name="chevron-right" size={24} color="#D3D3D3" />
        </View>
    )
}

export default RecommendationCard;