import { View, Text, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { RadioButton } from 'react-native-paper';
import { AuthContext } from '@/contexts/auth-context';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Audio } from 'expo-av';
import { formatAIResponse } from '@/utils/helpers';
import RecommendationTable from '@/components/recommendation-table';

const Predict = () => {

  const { user, token } = useContext(AuthContext);

  const [vitals, setVitals] = useState({
    temperature: "",
    heartRate: "",
    systolicBp: "",
    diastolicBp: "",
    BpMeds: ""
  });
  const [prediction, setPrediction] = useState({
    risk: null,
    cardiovascularRisk: null,
    hypertensionRisk: null,
    vitals: {
      BMI: null,
      heartRate: null,
      bodyTemp: null,
      sysBP: null,
      diaBP: null
    }
  });
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [recommendation, setRecommendation] = useState(null);

  const handleInputChange = (field: string, value: string) => {
    setVitals({
      ...vitals,
      [field]: value,
    });
  }

  const makePrediction = async () => {
    try {
      if(!vitals.temperature || !vitals.heartRate || !vitals.systolicBp || !vitals.diastolicBp || !vitals.BpMeds) {
        Alert.alert('Action Failed!', 'All inputs are required');
        return;
      }
      const response = await fetch('https://vitality-ai-server-production.up.railway.app/api/predict/risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          height: parseFloat(user?.height),
          weight: parseFloat(user?.weight),
          age: parseFloat(user?.age),
          bodyTemp: parseFloat(vitals.temperature),
          heartRate: parseFloat(vitals.heartRate),
          sysBP: parseFloat(vitals.systolicBp),
          diaBP: parseFloat(vitals.diastolicBp),
          BPmeds: parseFloat(vitals.BpMeds)
        })
      });
      if(response.ok) {
        const data = await response.json();
        console.log(data);
        setPrediction(data);
      }
    } catch (error) {
      console.error('Error making prediction', error);
      Alert.alert('Action Failed!', 'Try again.');
    } finally {
      setVitals({
        temperature: "",
        heartRate: "",
        systolicBp: "",
        diastolicBp: "",
        BpMeds: ""
      });
    }
  }

  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      weekday: 'long',  
      year: 'numeric', 
      month: 'long',    
      day: 'numeric'    
    });
  
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, 
    });
  
    return `${formattedDate} | ${formattedTime}`;
  }

  const playAlertSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/images/alert.mp3'), 
        { shouldPlay: true }
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound', error);
    }
  }

  const resetPredictionState = () => {
    setPrediction({
      risk: null,
      cardiovascularRisk: null,
      hypertensionRisk: null,
      vitals: {
        BMI: null,
        heartRate: null,
        bodyTemp: null,
        sysBP: null,
        diaBP: null
      }
    })
  }

  const generateCareRecommendations = async () => {
    try {
      const response = await fetch('https://vitality-ai-server-production.up.railway.app/api/recommendation/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if(response.ok) {
        const data = await response.json();
        const formattedData = formatAIResponse(data.recommendation);
        setRecommendation(formattedData);
      }
    } catch (error) {
      console.error('Error generating recommendations', error);
      Alert.alert('Action Failed', "Try again");
    }
  }

  useEffect(() => {
    if (prediction.risk === "high") {
      playAlertSound();
    }
    return () => {
      if (sound) {
        sound.unloadAsync(); 
      }
    };
  }, [prediction.risk]);

  return (
    <ScrollView className='bg-white'>
      <View className="justify-between p-6 flex-row items-center pt-10">
        <Text className="text-5xl">Predict</Text>
        <Link className='text-blue-500' href={'/history'}>
          History
        </Link>
      </View>
      {
        prediction.risk ? (
          <>
            <View className='flex-row justify-between px-10 my-7'>
              <TouchableOpacity onPress={resetPredictionState}>
                <Ionicons name="chevron-back-outline" size={24} color="black" />
              </TouchableOpacity>
              <Text className="text-gray-600 text-lg">
                📅 {getCurrentDateTime()}
              </Text>
            </View>
            {
              prediction.risk === 'low' ? (
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
              ) : prediction.risk === 'high' && (
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
                        prediction.cardiovascularRisk && prediction.hypertensionRisk
                          ? "Your vitals indicate signs of both cardiovascular disease and hypertension."
                          : prediction.cardiovascularRisk
                          ? "Your vitals indicate signs of cardiovascular disease."
                          : prediction.hypertensionRisk
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
                    {prediction.vitals.BMI || 0} 
                  </Text>
                </View>
                <View className='w-[48%] relative rounded-lg border border-[#D3D3D3] px-5 pt-2 pb-6'>
                  <Text className='text-[grey] text-sm'>
                    Heart Rate
                  </Text>
                  <FontAwesome className='absolute top-3 right-4' name="heartbeat" size={18} color="gray" />
                  <Text className='mt-2 text-center text-3xl'>
                    {prediction.vitals.heartRate || 0} 
                  </Text>
                </View>
                <View className='w-[48%] relative rounded-lg border border-[#D3D3D3] px-5 pt-2 pb-6'>
                  <Text className='text-[grey] text-sm'>
                    Body Temperature
                  </Text>
                  <MaterialCommunityIcons className='absolute top-3 right-4' name="temperature-fahrenheit" size={23} color="gray" />
                  <Text className='mt-2 text-center text-3xl'>
                    {prediction.vitals.bodyTemp || 0} 
                  </Text>
                </View>
                <View className='w-[48%] relative rounded-lg border border-[#D3D3D3] px-5 pt-2 pb-6'>
                  <Text className='text-[grey] text-sm'>
                    Systolic BP
                  </Text>
                  <Fontisto className='absolute top-3 right-4' name="blood-drop" size={19} color="gray" />
                  <Text className='mt-2 text-center text-3xl'>
                    {prediction.vitals.sysBP || 0} 
                  </Text>
                </View>
              </View>
            </View>
            {
              recommendation ? (
                <RecommendationTable recommendation={recommendation} />
              ) : (
                <TouchableOpacity onPress={generateCareRecommendations} className='mx-auto flex-row items-center justify-center gap-2 rounded-lg px-7 py-3 bg-violet-500'>
                  <FontAwesome name="magic" size={24} color="white" />
                  <Text className='text-xl text-white'>
                    Generate Care Advice
                  </Text>
                </TouchableOpacity>
              )
            }
          </>
        ) : (
          <>
            <View className='px-10 my-5 flex-row justify-between items-center'>
              <Text className="text-2xl my-5">Enter Vitals</Text>
              <Text className="text-lg my-5 text-blue-500">Sync Data</Text>
            </View>
            <View className='px-10 mt-5'>
              <View className="flex-row w-full gap-10">
                <View className="border-b w-[45%]">
                  <Text className="text-[gray] text-lg">Body Temperature</Text>
                  <TextInput 
                    className='text-2xl'
                    keyboardType='numeric'
                    value={vitals.temperature}
                    onChangeText={(text) => handleInputChange('temperature', text)}
                  />
                </View>
                <View className="border-b w-[45%]">
                  <Text className="text-[gray] text-lg">Heart Rate</Text>
                  <TextInput 
                    className='text-2xl'
                    keyboardType='numeric'
                    value={vitals.heartRate}
                    onChangeText={(text) => handleInputChange('heartRate', text)}
                  />
                </View>
              </View>
              <View className="flex-row w-full gap-10 my-5">
                <View className="border-b w-[45%]">
                  <Text className="text-[gray] text-lg">Systolic BP</Text>
                  <TextInput 
                    className='text-2xl'
                    keyboardType='numeric'
                    value={vitals.systolicBp}
                    onChangeText={(text) => handleInputChange('systolicBp', text)}
                  />
                </View>
                <View className="border-b w-[45%]">
                  <Text className="text-[gray] text-lg">Diastolic BP</Text>
                  <TextInput 
                    className='text-2xl'
                    keyboardType='numeric'
                    value={vitals.diastolicBp}
                    onChangeText={(text) => handleInputChange('diastolicBp', text)}
                  />
                </View>
              </View>
              <View className="flex-row items-center justify-between mt-4">
                <Text className="text-lg">Do you take medication for BP:</Text>
                <RadioButton.Group onValueChange={(text) => handleInputChange('BpMeds', text)} value={vitals.BpMeds}>
                  <View className="flex-row items-center">
                    <RadioButton value="1" />
                    <Text>Yes</Text>
                    <RadioButton value="0" />
                    <Text>No</Text>
                  </View>
                </RadioButton.Group>
              </View>
              <TouchableOpacity className="bg-black py-3 rounded-md mt-6" onPress={makePrediction}>
                <Text className="text-white text-center text-lg font-semibold">Make Prediction</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-red-500 py-3 rounded-md mt-6" onPress={() => setVitals({ temperature: "", heartRate: "", systolicBp: "", diastolicBp: "", BpMeds: "" })}>
                <Text className="text-white text-center text-lg font-semibold">Reset Data</Text>
              </TouchableOpacity>
            </View>
          </>
        )
      }
    </ScrollView>
  )
}

export default Predict;