import { View, Text } from 'react-native';
import React from 'react';

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
  return (
    <View>
      <Text className="px-2">{title}</Text>
    </View>
  );
};

export default VideoCard;
