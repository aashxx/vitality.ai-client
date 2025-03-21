import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { HistoryContext } from '@/contexts/history-context';
import { formatDateTime } from '@/utils/helpers';
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import RecommendationCard from '@/components/recommendation-card';

const Care = () => {

  const { recommendations } = useContext(HistoryContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecommendations = recommendations.filter((result) =>
    formatDateTime(result.timestamp).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView className='bg-white'>
      <View className="justify-between p-6 flex-row items-center pt-10">
        <Text className="text-5xl">Care Advice</Text>
        <Link className='text-blue-500' href={'/(tabs)/predict'}>
          <Feather name="plus-circle" size={30} color="black" />
        </Link>
      </View>

      <View className='flex-col gap-3 px-5 mt-6'>
        <View className='relative'>
          <Feather className='absolute top-4 left-3' name="search" size={22} color="grey" />
          <TextInput 
            className='border border-[#D3D3D3] rounded-xl px-12 py-4 text-lg'
            placeholder='Search by date (e.g., March 8, 2025)'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {filteredRecommendations.length > 0 ? (
          filteredRecommendations.map((result, idx) => (
            <Link key={idx} href={`/recommendation/${result._id['$oid']}`}>
              <RecommendationCard recommendation={result} />
            </Link>
          ))
        ) : (
          <Text className="text-gray-600 text-center mt-4">
            {searchQuery ? "No matching results found" : "No past predictions"}
          </Text>
        )}
      </View>
    </ScrollView>
  )
}

export default Care;