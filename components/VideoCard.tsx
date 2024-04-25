import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';

interface VideoCardProps {
  video: {
    $id: number;
    title: string;
    thumbnail: string;
    video: string;
    prompt: string;
    creator: {
      username: string;
      avatar: string;
    };
  };
}

const VideoCard = ({
  video: { $id, creator, prompt, thumbnail, title, video },
}: VideoCardProps) => {
  const [playing, setPlaying] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      {/* video detail */}
      <View className="flex-row items-start gap-3">
        {/* creator detail and title */}
        <View className="flex-row flex-1 justify-center items-center">
          {/* user avatar */}
          <View
            className="w-[46px] h-[46px] rounded-lg border border-secondary
            justify-center items-center p-0.5 overflow-hidden">
            <Image
              source={{ uri: creator.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          {/* username and title */}
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm">{title}</Text>
            <Text className="text-xs text-gray-100 font-pregular">
              {creator.username}
            </Text>
          </View>
        </View>

        {/* more icon */}
        <View className="pt-2">
          <Image
            source={icons.menu}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* video */}
      {playing ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlaying(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlaying(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
