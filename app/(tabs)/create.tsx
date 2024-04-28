import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';

type FormType = {
  title: string;
  video: { uri: string } | null;
  thumbnail: { uri: string } | null;
  prompt: string;
};

const Create = () => {
  const [form, setForm] = useState<FormType>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const [uploading, setUploading] = useState(false);

  const submitHandler = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 mt-10">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        {/* Video Title */}
        <FormField
          title="Video Title"
          value={form.title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          placeholder="Give your video a catch title"
          otherStyles="mt-10"
        />

        {/* Upload Video */}
        <View className="mt-8 space-y-3">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
          <TouchableOpacity activeOpacity={0.7}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Video Thumbnail */}
        <View className="mt-8 space-y-3">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity activeOpacity={0.7}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View
                className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center 
                items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />

                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Prompt */}
        <FormField
          title="AI Prompt"
          value={form.title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          placeholder="Video prompt"
          otherStyles="mt-8"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submitHandler}
          containerStyles="mt-8 mb-6"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
