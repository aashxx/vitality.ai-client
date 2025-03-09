import { View, Text } from 'react-native';
import React from 'react';

interface TabIconProps {
  focused: boolean;
  iconName: string;
  IconComponent: React.ComponentType<any>;  
}

const TabIcon: React.FC<TabIconProps> = ({ focused, iconName, IconComponent }) => {
  return (
    <View className='self-center'>
      <IconComponent 
        name={iconName} 
        size={iconName === 'home' ? 24 : 22} 
        color={focused ? "black" : "#D3D3D3"} 
      />
    </View>
  );
};

export default TabIcon;
