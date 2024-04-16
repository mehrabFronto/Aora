import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`${containerStyles} bg-secondary rounded-xl h-[62px] justify-center items-center ${
        isLoading ? 'opacity-50' : ''
      }`}>
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
