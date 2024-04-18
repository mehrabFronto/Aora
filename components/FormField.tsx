import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

interface FormFieldProps {
  title: string;
  placeholder: string;
  value: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
  keyboardType?: string;
}

const FormField = ({
  title,
  placeholder,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`${otherStyles} space-y-2`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View
        className="w-full h-16 flex-row items-center bg-black-100 rounded-2xl overflow-hidden
        border border-black-200 focus:border-secondary">
        <TextInput
          className="flex-1 text-white font-psemibold text-base h-full px-4"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          cursorColor="#CDCDE0"
        />

        {title === 'Password' && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="mr-4">
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
