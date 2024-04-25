import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { icons } from '../constants';

interface FormFieldProps {
  placeholder: string;
  value: string;
  handleChangeText: (e: string) => void;
}

const SearchInput = ({ placeholder, value, handleChangeText }: FormFieldProps) => {
  return (
    <View
      className="w-full h-16 flex-row items-center bg-black-100 rounded-2xl overflow-hidden
        border border-black-200 focus:border-secondary space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5 px-4"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        cursorColor="#CDCDE0"
      />

      <TouchableOpacity>
        <Image
          source={icons.search}
          className="w-5 h-5 mr-4"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
