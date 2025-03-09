import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const PredictionHistory = () => {

  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>PredictionHistory: {id}</Text>
    </View>
  )
}

export default PredictionHistory;