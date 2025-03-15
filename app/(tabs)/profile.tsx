import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React, { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/auth-context';
import { RadioButton } from 'react-native-paper';

const Profile = () => {
  
  const { user, logoutUser, token, fetchUserData } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // State for the editable profile
  const [editProfile, setEditProfile] = useState({
    fullName: user?.fullName || '',
    age: user?.age || '',
    height: user?.height || '',
    weight: user?.weight || '',
    gender: user?.gender || '',
    emergencyContact: user?.emergencyContact || ''
  });

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setEditProfile({
      ...editProfile,
      [field]: value,
    });
  };

  // Handle form submission (Update Profile)
  const handleUpdateProfile = async () => {
    if (!editProfile.age || !editProfile.height || !editProfile.weight || !editProfile.gender || !editProfile.emergencyContact) {
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
        body: JSON.stringify(editProfile)
      });

      if (response.ok) {
        fetchUserData(token as string); // Fetch updated user data
        setOpenModal(false); // Close modal after update
        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        Alert.alert('Update Failed', 'Please try again.');
      }
    } catch (error) {
      Alert.alert('Action Failed!', 'Something went wrong. Try again.');
    }
  };

  return (
    <ScrollView>
      <View className="justify-between p-6 flex-row items-center pt-10">
        <Text className="text-5xl">My Profile</Text>
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <Feather name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* User Profile Info */}
      <View className="px-10 pt-10">
        <View className="flex-row items-center w-full gap-4 py-3 rounded-lg">
          <View className="rounded-full bg-white h-[100px] w-[100px] items-center justify-center">
            <FontAwesome5 name="user-alt" size={50} color="black" />
          </View>
          <View>
            <Text className="text-3xl">{user?.fullName}</Text>
            <Text className="text-[grey]">{user?.email}</Text>
          </View>
        </View>

        {/* About Section */}
        <Text className="text-xl text-center my-5">About You</Text>

        <View className="flex-row w-full gap-10">
          <View className="border-b w-[45%]">
            <Text className="text-[gray] text-lg">Gender</Text>
            <Text className="text-2xl px-3 py-2">{user?.gender}</Text>
          </View>
          <View className="border-b w-[45%]">
            <Text className="text-[gray] text-lg">Age</Text>
            <Text className="text-2xl px-3 py-2">{user?.age}</Text>
          </View>
        </View>

        <View className="flex-row w-full gap-10 mt-6">
          <View className="border-b w-[45%]">
            <Text className="text-[gray] text-lg">Height</Text>
            <Text className="text-2xl px-3 py-2">{user?.height} m</Text>
          </View>
          <View className="border-b w-[45%]">
            <Text className="text-[gray] text-lg">Weight</Text>
            <Text className="text-2xl px-3 py-2">{user?.weight} kg</Text>
          </View>
        </View>

        <View className="border-b mt-6">
          <Text className="text-[gray] text-lg">Emergency Contact</Text>
          <Text className="text-2xl px-3 py-2">{user?.emergencyContact}</Text>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity onPress={logoutUser} className="w-full bg-red-500 my-8 rounded-lg py-3">
          <Text className="text-2xl text-white text-center font-semibold">Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Edit Modal */}
      <Modal animationType="fade" transparent={true} visible={openModal} onRequestClose={() => setOpenModal(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-[90%]">
            <Text className="text-3xl font-bold mb-6 text-center">Edit Profile</Text>

            {/* Full Name Input */}
            <TextInput
              className="rounded-md px-5 py-3 border border-gray-300 text-lg bg-gray-50"
              placeholder="fullName"
              value={editProfile.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
            />

            {/* Age Input */}
            <TextInput
              className="rounded-md px-5 py-3 border border-gray-300 text-lg bg-gray-50 mt-4"
              placeholder="Age"
              value={editProfile.age}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('age', text)}
            />

            {/* Gender Selection */}
            <View className="flex-row items-center justify-between mt-4">
              <Text className="text-lg">Gender:</Text>
              <RadioButton.Group onValueChange={(value) => handleInputChange('gender', value)} value={editProfile.gender}>
                <View className="flex-row items-center">
                  <RadioButton value="Male" />
                  <Text>Male</Text>
                  <RadioButton value="Female" />
                  <Text>Female</Text>
                </View>
              </RadioButton.Group>
            </View>

            {/* Height & Weight */}
            <TextInput
              className="rounded-md px-5 py-3 border border-gray-300 text-lg bg-gray-50 mt-4"
              placeholder="Height (m)"
              value={editProfile.height}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('height', text)}
            />
            <TextInput
              className="rounded-md px-5 py-3 border border-gray-300 text-lg bg-gray-50 mt-4"
              placeholder="Weight (kg)"
              value={editProfile.weight}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('weight', text)}
            />

            {/* Emergency Contact */}
            <TextInput
              className="rounded-md px-5 py-3 border border-gray-300 text-lg bg-gray-50 mt-4"
              placeholder="Emergency Contact"
              keyboardType='email-address'
              value={editProfile.emergencyContact}
              onChangeText={(text) => handleInputChange('emergencyContact', text)}
            />

            {/* Save & Close Buttons */}
            <TouchableOpacity className="bg-black py-3 rounded-md mt-6" onPress={handleUpdateProfile}>
              <Text className="text-white text-center text-lg font-semibold">Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mt-4" onPress={() => setOpenModal(false)}>
              <Text className="text-center text-lg text-red-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Profile;