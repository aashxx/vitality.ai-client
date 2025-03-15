import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React, { useContext } from 'react';
import { AuthContext } from '@/contexts/auth-context';

const Profile = () => {

  const { user, logoutUser } = useContext(AuthContext);

  return (
    <ScrollView>
      <View className='justify-between p-6 flex-row items-center pt-10'>
        <Text className='text-5xl'>
          My Profile
        </Text>
        <TouchableOpacity>
          <Feather name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className='px-10 pt-10'>
        <View className='flex-row items-center w-full gap-4 py-3 rounded-lg'>
          <View className='rounded-full bg-white h-[100px] w-[100px] items-center justify-center'>
            <FontAwesome5 name="user-alt" size={50} color="black" />
          </View>
          <View>
            <Text className='text-3xl'>
              {user?.fullName}
            </Text>
            <Text className='text-[grey]'>
              {user?.email}
            </Text>
          </View>
        </View>
        <Text className='text-xl text-center my-5'>
          About You
        </Text>
        <View className='flex-row w-full gap-10'>
          <View className='border-b w-[45%]'>
            <Text className='text-[gray] text-lg'>
              Gender
            </Text>
            <Text className='text-2xl px-3 py-2'>
              {user?.gender}
            </Text>
          </View>
          <View className='border-b w-[45%]'>
            <Text className='text-[gray] text-lg'>
              Age
            </Text>
            <Text className='text-2xl px-3 py-2'>
              {user?.age}
            </Text>
          </View>
        </View>
        <View className='flex-row w-full gap-10 mt-6'>
          <View className='border-b w-[45%]'>
            <Text className='text-[gray] text-lg'>
              Height
            </Text>
            <Text className='text-2xl px-3 py-2'>
              {user?.height} m
            </Text>
          </View>
          <View className='border-b w-[45%]'>
            <Text className='text-[gray] text-lg'>
              Weight
            </Text>
            <Text className='text-2xl px-3 py-2'>
              {user?.weight} kg
            </Text>
          </View>
        </View>
        <View className='border-b mt-6'>
          <Text className='text-[gray] text-lg'>
            Emergency Contact
          </Text>
          <Text className='text-2xl px-3 py-2'>
            {user?.contact}
          </Text>
        </View>
        <TouchableOpacity onPress={logoutUser} className='w-full bg-red-500 my-8 rounded-lg py-3'>
          <Text className='text-2xl text-white text-center font-semibold'>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Profile;