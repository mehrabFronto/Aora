import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { CreateFormType } from '../../types/CreateFormType';
import { createVideoPost } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const Create = () => {
  const [form, setForm] = useState<CreateFormType>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const [uploading, setUploading] = useState(false);

  const { user } = useGlobalContext();

  const openPicker = async (selectType: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === 'image'
          ? ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
          : ['video/mp4', 'video/gif', 'image/gif'],
    });

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submitHandler = async () => {
    if (!form.title || !form.prompt || !form.thumbnail || !form.title) {
      return Alert.alert('', 'Please fill in all the fields');
    }

    setUploading(true);

    try {
      await createVideoPost({ ...form, userId: user!.$id });

      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      });

      setUploading(false);
    }
  };

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
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => openPicker('video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
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

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => openPicker('image')}>
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
          value={form.prompt}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
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
