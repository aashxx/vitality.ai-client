import { RecommendationTableProps } from '@/utils/types';
import React from 'react';
import { View, Text } from 'react-native';

const RecommendationTable: React.FC<RecommendationTableProps> = ({ recommendation }) => {
    return (
        <View className="w-full my-5 px-10">
            {Object.keys(recommendation).map((section, index) => (
                <View key={index} className="flex-row justify-between items-start mb-4">
                    <Text className="text-lg font-bold w-[20%]">
                        {section}
                    </Text>
                    <View className="ml-4 w-[70%]">
                        {recommendation[section].map((item, idx) => (
                            <Text key={idx} className="text-base text-justify text-gray-700">{idx + 1}. {item}</Text>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
};

export default RecommendationTable;
