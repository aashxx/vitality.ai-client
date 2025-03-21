import { View, Text, ScrollView, Dimensions } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '@/contexts/auth-context';
import { formatAIResponse, formatDateTime, getGreeting } from '@/utils/helpers';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { HistoryContext } from '@/contexts/history-context';
import Feather from '@expo/vector-icons/Feather';
import { LineChart } from 'react-native-chart-kit';
import RecommendationTable from '@/components/recommendation-table';

const Home = () => {

  const { user } = useContext(AuthContext);
  const { recommendations, bmiDataset, heartRateDataset } = useContext(HistoryContext);

  return (
    <ScrollView className='bg-white'>
      <View className="justify-between p-6 flex-row items-center pt-10">
        <Text className="text-5xl">Dashboard</Text>
        <Text>
          {formatDateTime(new Date().toISOString()).split('|')[0]}
        </Text>
      </View>
      <View className='px-6 mt-5'>
        <Text className='text-xl'>
          {getGreeting()} {user?.fullName.split(' ')[0]},
        </Text>
      </View>
      <View className='px-6 my-7'>
        <View className='flex-row gap-3 flex-wrap w-full'>
          <View className='w-[48%] relative rounded-lg border border-[#D3D3D3] px-5 pt-2 pb-6'>
            <Text className='text-[grey] text-sm'>
              BMI
            </Text>
            <Ionicons className='absolute top-3 right-4' name="body" size={20} color="gray" />
            <Text className='mt-2 text-center text-3xl'>
              {user?.BMI.toFixed(2) || "-"} 
            </Text>
          </View>
          <View className='w-[48%] relative rounded-lg border border-[#D3D3D3] px-5 pt-2 pb-6'>
            <Text className='text-[grey] text-sm'>
              Heart Rate
            </Text>
            <FontAwesome className='absolute top-3 right-4' name="heartbeat" size={18} color="gray" />
            <Text className='mt-2 text-center text-3xl'>
              {user?.heartRate || "-"} 
            </Text>
          </View>
          <View className='w-[48%] relative rounded-lg border border-[#D3D3D3] px-5 pt-2 pb-6'>
            <Text className='text-[grey] text-sm'>
              Body Temperature
            </Text>
            <MaterialCommunityIcons className='absolute top-3 right-4' name="temperature-fahrenheit" size={23} color="gray" />
            <Text className='mt-2 text-center text-3xl'>
              {user?.bodyTemp || "-"} 
            </Text>
          </View>
          <View className='w-[48%] relative rounded-lg border border-[#D3D3D3] px-5 pt-2 pb-6'>
            <Text className='text-[grey] text-sm'>
              Status
            </Text>
            <MaterialIcons className='absolute top-3 right-4' name="health-and-safety" size={20} color="gray" />
            <Text className='mt-2 text-center text-3xl'>
              {
                user?.riskLevel === "high" ? (
                  <FontAwesome name="warning" size={30} color="red" />
                ): user?.riskLevel === "low" ? (
                  <Feather name="check" size={40} color="green" />
                ): "-"
              }
            </Text>
          </View>
        </View>
        <Text className='text-[grey] text-sm my-2 text-center'>
          Last Checked: {formatDateTime(user?.lastUpdated) || "-"}
        </Text>
      </View>

      {heartRateDataset?.labels && heartRateDataset?.datasets && user?.BMI !== "" ? (
        <View>
          <Text className="text-xl px-6 mb-4">Heart Rate Over Time</Text>
          <LineChart 
            data={heartRateDataset} 
            width={Dimensions.get("window").width} 
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#000"
              },
              horizontalLabelRotation: 45,
              verticalLabelRotation: 0,
            }}
            bezier
          />
        </View>
      ) : null}

      {/* BMI Chart */}
      {bmiDataset?.labels && bmiDataset?.datasets && user?.BMI !== "" ? (
        <View>
          <Text className="text-xl px-6 mb-4">BMI Over Time</Text>
          <LineChart 
            data={bmiDataset} 
            width={Dimensions.get("window").width} 
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#000"
              },
              horizontalLabelRotation: 45,
              verticalLabelRotation: 0
            }}
            bezier
          />
        </View>
      ) : null}
      <View className='my-6'>
        <Text className='px-6 text-xl'>
          Latest Care Advice
        </Text>
        {
          recommendations.length > 0 && user?.BMI !== "" && (
            <RecommendationTable recommendation={formatAIResponse(recommendations[0].recommendation)} />
          ) 
        }
      </View>
    </ScrollView>
  );
};

export default Home;