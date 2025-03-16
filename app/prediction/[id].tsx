import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Link, useLocalSearchParams } from 'expo-router';
import { HistoryContext } from '@/contexts/history-context';
import { formatDateTime } from '@/utils/helpers';

const PredictionHistory = () => {

  const { predictionHistory } = useContext(HistoryContext);

  const { id } = useLocalSearchParams();

  const result = predictionHistory.find(prediction => prediction._id['$oid'] === id);

  return (
    <ScrollView className='bg-white'>
      <View className="justify-between p-6 flex-row items-center pt-10">
        <Text className="text-5xl">History</Text>
        <Link className='text-blue-500' href={'/(tabs)/predict'}>
          <Feather name="plus-circle" size={30} color="black" />
        </Link>
      </View>
      <View className='flex-row justify-between px-10 my-7'>
        <Link href={'/history'}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </Link>
        <Text className="text-gray-600 text-lg">
          📅 {formatDateTime(result.timestamp)}
        </Text>
      </View>
      {
        result.riskLevel === 'low' ? (
          <>
            <View className={`px-10 my-5 w-[350px] rounded-xl shadow-md mx-auto gap-3 py-3 flex-row justify-center items-center bg-green-400`}>
              <Feather name="check" size={40} color="white" />
              <Text className='text-white text-4xl'>
                Healthy
              </Text>
            </View>
            <View className='px-10'>
              <Text className="text-lg text-center mt-2">
                No major health concerns detected! Keep maintaining a healthy lifestyle.
              </Text>
            </View>
          </>
        ) : result.riskLevel === 'high' && (
          <>
            <View className={`px-10 my-5 w-[350px] rounded-xl shadow-md mx-auto gap-3 py-3 flex-row justify-center items-center bg-red-400`}>
              <FontAwesome name="warning" size={30} color="white" />
              <Text className='text-white text-4xl'>
                Anomalies Detected
              </Text>
            </View>
            <View className='px-10'>
              <Text className="text-lg text-center mt-2">
              {
                result.cardiovascularRisk && result.hypertensionRisk
                ? "Your vitals indicate signs of both cardiovascular disease and hypertension."
                : result.cardiovascularRisk
                ? "Your vitals indicate signs of cardiovascular disease."
                : result.hypertensionRisk
                ? "Your vitals indicate an increased risk of hypertension."
                : "Your vitals appear normal, with no signs of cardiovascular disease or hypertension."
              }
              </Text>
            </View>
          </>
        )
      }
      <View className='px-10 my-10'>
        <View className='flex-row gap-3 flex-wrap w-full'>
          <View className='w-[48%] relative rounded-lg border border-[#D3D3D3] px-5 pt-2 pb-6'>
            <Text className='text-[grey] text-sm'>
              BMI
            </Text>
            <Ionicons className='absolute top-3 right-4' name="body" size={20} color="gray" />
            <Text className='mt-2 text-center text-3xl'>
              {result.vitals.BMI || 0} 
            </Text>
          </View>
          <View className='w-[48%] relative rounded-lg border border-[#D3D3D3] px-5 pt-2 pb-6'>
            <Text className='text-[grey] text-sm'>
              Heart Rate
            </Text>
            <FontAwesome className='absolute top-3 right-4' name="heartbeat" size={18} color="gray" />
            <Text className='mt-2 text-center text-3xl'>
              {result.vitals.heartRate || 0} 
            </Text>
          </View>
          <View className='w-[48%] relative rounded-lg border border-[#D3D3D3] px-5 pt-2 pb-6'>
            <Text className='text-[grey] text-sm'>
              Body Temperature
            </Text>
            <MaterialCommunityIcons className='absolute top-3 right-4' name="temperature-fahrenheit" size={23} color="gray" />
            <Text className='mt-2 text-center text-3xl'>
              {result.vitals.bodyTemp || 0} 
            </Text>
          </View>
          <View className='w-[48%] relative rounded-lg border border-[#D3D3D3] px-5 pt-2 pb-6'>
            <Text className='text-[grey] text-sm'>
              Systolic BP
            </Text>
            <Fontisto className='absolute top-3 right-4' name="blood-drop" size={19} color="gray" />
            <Text className='mt-2 text-center text-3xl'>
              {result.vitals.sysBP || 0} 
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default PredictionHistory;