import { Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { useRouter } from 'expo-router';
import { RadioButton } from 'react-native-paper';
import { AuthContext } from '@/contexts/auth-context';

const CreateProfile = () => {

  const { token, fetchUserData } = useContext(AuthContext);

  const router = useRouter();

  const [profile, setProfile] = useState({
    age: '',
    height: '',
    weight: '',
    gender: '',
    emergencyContact: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    if (!profile.age || !profile.height || !profile.weight || !profile.gender || !profile.emergencyContact) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const response = await fetch('https://vitality-ai-server-production.up.railway.app/api/auth/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
  
      if(response.ok) {
        fetchUserData(token as string);
        router.push('/(tabs)/home');
      }
    } catch (error) {
      Alert.alert('Action Failed!', 'Something went wrong. Try again.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      {/* Logo & Slogan */}
      <Image
        source={require('@/assets/images/logo.png')}
        className="w-[200px] h-[100px]"
        resizeMode="contain"
      />
      <Text className="text-lg font-semibold text-gray-600 mb-6">Create Your Profile</Text>

      <View className="border border-gray-300 rounded-lg w-full max-w-sm py-8 px-6 bg-white shadow-lg">
        <Text className="text-center text-3xl font-bold mb-6 text-black">Profile</Text>

        <View className="flex-row gap-4 mt-4">
            {/* Height */}
            <TextInput
                className="rounded-md px-5 py-3 border border-gray-300 text-lg bg-gray-50 w-[48%]"
                placeholder="Age"
                value={profile.age}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('age', text)}
            />
            {/* Gender */}
            <View className="flex-row">
                <View className="flex-row items-center">
                    <RadioButton
                        value="Male"
                        status={profile.gender === 'Male' ? 'checked' : 'unchecked'}
                        onPress={() => handleInputChange('gender', 'Male')}
                    />
                    <Text>Male</Text>
                </View>
                <View className="flex-row items-center">
                    <RadioButton
                        value="Female"
                        status={profile.gender === 'Female' ? 'checked' : 'unchecked'}
                        onPress={() => handleInputChange('gender', 'Female')}
                    />
                    <Text>Female</Text>
                </View>
            </View>
        </View>

        {/* Height and Weight - Flex Row */}
        <View className="flex-row justify-between mt-4">
          {/* Height */}
          <TextInput
            className="rounded-md px-5 py-3 border border-gray-300 text-lg bg-gray-50 w-[48%]"
            placeholder="Height (m)"
            value={profile.height}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange('height', text)}
          />
          {/* Weight */}
          <TextInput
            className="rounded-md px-5 py-3 border border-gray-300 text-lg bg-gray-50 w-[48%]"
            placeholder="Weight (kg)"
            value={profile.weight}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange('weight', text)}
          />
        </View>

        {/* Contact */}
        <TextInput
          className="rounded-md px-5 py-3 border border-gray-300 text-lg mt-4 bg-gray-50"
          placeholder="Contact"
          value={profile.emergencyContact}
          keyboardType='email-address'
          onChangeText={(text) => handleInputChange('emergencyContact', text)}
        />

        {/* Submit Button */}
        <TouchableOpacity
          className="w-full bg-black py-3 rounded-md mt-6"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center text-lg font-semibold">Save Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateProfile;