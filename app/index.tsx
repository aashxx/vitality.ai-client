import { Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { AuthContext } from '@/contexts/auth-context';

const Login = () => {

  const { loginUser } = useContext(AuthContext);

  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    setCredentials({
      ...credentials,
      [field]: value
    });
  };

  const handleLogin = async () => {
    if(!credentials.email || !credentials.password) {
      Alert.alert('Login Failed', 'Try Again!');
      return;
    }

    try {
      const response = await fetch('https://vitality-ai-server-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      loginUser(data.access_token, '/(tabs)/home');
    } catch (error) {
      Alert.alert('Action Failed', 'Something went wrong. Try again');
    }
  };

  return (
    <View className='flex-1 justify-center items-center bg-gray-100 px-6'>

      {/* Logo & Slogan */}
      <Image 
        source={require('@/assets/images/logo.png')} 
        className='w-[200px] h-[100px]'
        resizeMode="contain"
      />
      <Text className='text-lg font-semibold text-gray-600 mb-6'>
        "Your AI-Powered Health Companion"
      </Text>

      <View className='border border-gray-300 rounded-lg w-full max-w-sm py-8 px-6 bg-white shadow-lg'>

        <Text className='text-center text-3xl font-bold mb-6 text-black'>
          Login
        </Text>

        {/* Email Input */}
        <TextInput 
          className='rounded-md px-5 py-3 border border-gray-300 text-lg bg-gray-50'
          placeholder='Email Address'
          autoCapitalize='none'
          keyboardType='email-address'
          value={credentials.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />

        {/* Password Input */}
        <TextInput 
          className='rounded-md px-5 py-3 border border-gray-300 text-lg mt-4 bg-gray-50'
          placeholder='Password'
          secureTextEntry
          value={credentials.password}
          onChangeText={(text) => handleInputChange('password', text)}
        />

        {/* Login Button */}
        <TouchableOpacity 
          className='w-full bg-black py-3 rounded-md mt-6'
          onPress={handleLogin}
        >
          <Text className='text-white text-center text-lg font-semibold'>Login</Text>
        </TouchableOpacity>

        {/* Navigate to Register Page */}
        <Text className='text-gray-600 text-center mt-4'>
          Don't have an account?{' '}
          <Link href="/register" className='text-blue-500 font-semibold'>
            Sign Up
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default Login;