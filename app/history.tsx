import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { HistoryContext } from '@/contexts/history-context';
import ResultCard from '@/components/result-card';
import { formatDateTime } from '@/utils/helpers';

const History = () => {

  const { predictionHistory } = useContext(HistoryContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = predictionHistory.filter((result) =>
    formatDateTime(result.timestamp).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView className='bg-white'>
      <View className="justify-between p-6 flex-row items-center pt-10">
        <Text className="text-5xl">History</Text>
        <Link className='text-blue-500' href={'/(tabs)/predict'}>
          <Feather name="plus-circle" size={30} color="black" />
        </Link>
      </View>

      {/* 🔍 Search Input */}
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

        {/* 📝 Display Search Results */}
        {filteredHistory.length > 0 ? (
          filteredHistory.map((result, idx) => (
            <Link href={`/prediction/${result._id['$oid']}`}>
              <ResultCard key={idx} result={result} />
            </Link>
          ))
        ) : (
          <Text className="text-gray-600 text-center mt-4">
            {searchQuery ? "No matching results found" : "No past predictions"}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default History;