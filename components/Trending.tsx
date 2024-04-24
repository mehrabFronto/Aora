import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  ViewToken,
} from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { VideoType } from '../types/VideoType';
import { icons } from '../constants';

interface TrendingProps {
  posts: VideoType[];
}

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState<VideoType | string>(posts[0]);

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => String(item.$id)}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      renderItem={({ item }) => (
        <TrendingItem
          activeItem={activeItem}
          item={item}
        />
      )}
    />
  );
};

export default Trending;

interface TrendingItemProps {
  item: VideoType;
  activeItem: VideoType | string;
}

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.05,
  },
};

const zoomOut = {
  0: {
    scale: 1.05,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [playing, setPlaying] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={
        activeItem === String(item.$id)
          ? (zoomIn as Animatable.CustomAnimation)
          : (zoomOut as Animatable.CustomAnimation)
      }
      duration={500}>
      {playing ? (
        <Text>Playing</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlaying(true)}
          className="relative items-center justify-center">
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
