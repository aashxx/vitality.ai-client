import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';  // For Line Chart
import { Link } from 'expo-router';

const Home = () => {
  // Dummy data for the cards and chart
  const vitalStats = [
    { label: 'BMI', value: '40.4', icon: 'body', color: 'blue' },
    { label: 'Heart Rate', value: '110 bpm', icon: 'heartbeat', color: 'red' },
    { label: 'Sys BP', value: '160 mmHg', icon: 'tint', color: 'green' },
    { label: 'Dia BP', value: '100 mmHg', icon: 'tint', color: 'orange' },
  ];

  const chartData = [
    { name: 'Cardiovascular Risk', population: 60, color: 'green', legendFontColor: 'black', legendFontSize: 15 },
    { name: 'Hypertension Risk', population: 40, color: 'red', legendFontColor: 'black', legendFontSize: 15 },
  ];

  // Dummy historical data for the line chart
  const historicalData = {
    labels: ['2025-03-08', '2025-03-09', '2025-03-10'],
    datasets: [
      {
        data: [40.4, 41.2, 42.0],  // BMI values over time
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,  // Green line
        strokeWidth: 2,
      },
      {
        data: [160, 155, 150],  // Blood pressure values over time
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,  // Red line
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 py-6">
      {/* App Logo and Slogan */}
      <View className="flex items-center mb-6">
        <Image source={require('@/assets/images/logo.png')} className="w-[200px] h-[100px]" resizeMode="contain" />
        <Text className="text-lg font-semibold text-gray-600">"Your AI-Powered Health Companion"</Text>
      </View>

      {/* Vital Stats Cards - 2 per row */}
      <View className="flex-row flex-wrap justify-between mb-6">
        {vitalStats.map((stat, index) => (
          <View key={index} className="w-[48%] mb-4">
            <TouchableOpacity className={`bg-${stat.color}-200 p-4 rounded-lg shadow-md`}>
              <Text className="text-xl font-semibold text-gray-800">{stat.label}</Text>
              <Text className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Risk Level Pie Chart */}
      <View className="bg-white p-4 rounded-lg shadow-md mb-6">
        <Text className="text-center text-xl font-semibold text-gray-800 mb-4">Risk Level</Text>
        <PieChart
          data={chartData}
          width={320}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            backgroundGradientFrom: '#e6f7ff',
            backgroundGradientTo: '#99ccff',
            decimalPlaces: 0,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>

      {/* Line Chart for Historical Vital Signs */}
      <View className="bg-white p-4 rounded-lg shadow-md mb-6">
        <Text className="text-center text-xl font-semibold text-gray-800 mb-4">Historical Vital Signs</Text>
        <LineChart
          data={historicalData}
          width={320}
          height={220}
          chartConfig={{
            backgroundColor: '#e6f7ff',
            backgroundGradientFrom: '#e6f7ff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      {/* Latest Health Recommendations */}
      <View className="bg-white p-4 rounded-lg shadow-md mb-6">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Latest Recommendation</Text>
        <Text className="text-lg text-gray-600">
          The patient's high heart rate, elevated blood pressure, high BMI, and risk of cardiovascular disease suggest the need for immediate care. Consider monitoring vitals and seeking medical attention.
        </Text>
      </View>

      {/* Link to Profile Page */}
      <Link href="/profile" className="bg-black text-white text-center py-3 rounded-md mt-4">
        Go to Profile
      </Link>
    </ScrollView>
  );
};

export default Home;
