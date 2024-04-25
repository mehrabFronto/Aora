import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

interface FormFieldProps {
  placeholder: string;
  initialQuery?: string;
}

const SearchInput = ({ placeholder, initialQuery = '' }: FormFieldProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = () => {
    if (!query) {
      return Alert.alert(
        'Query Missing',
        'Please input something to search results across database',
      );
    }

    if (pathname.startsWith('/search')) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View
      className="w-full h-16 flex-row items-center bg-black-100 rounded-2xl overflow-hidden
        border border-black-200 focus:border-secondary space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5 pl-4 h-full"
        value={query}
        onChangeText={(e) => setQuery(e)}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        cursorColor="#CDCDE0"
      />

      <TouchableOpacity
        onPress={handleSearch}
        className="h-full items-center justify-center px-4">
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
