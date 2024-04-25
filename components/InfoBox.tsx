import { View, Text } from 'react-native';
import React from 'react';

interface InfoBoxProps {
  title: string | number;
  titleStyles: string;
  containerStyles?: string;
  subtitle?: string;
}

const InfoBox = ({
  title,
  titleStyles,
  containerStyles,
  subtitle,
}: InfoBoxProps) => {
  return (
    <View className={`${containerStyles}`}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 font-pregular text-center">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
