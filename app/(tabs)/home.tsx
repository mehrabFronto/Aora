import { View, Text, FlatList, Image, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import { getAllPosts } from '../../lib/appwrite';
import useFetch from '../../hooks/useFetch';
import VideoCard from '../../components/VideoCard';
import { VideoType } from '../../types/VideoType';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data: posts, isLoading, refetch } = useFetch(getAllPosts);

  const onRefresh = async () => {
    setRefreshing(true);

    // re call videos -> id any videos appeared
    await refetch();

    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts as VideoType[]}
        keyExtractor={(item) => String(item.$id)}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            {/* Welcome Text And Logo */}
            <View className="flex-row justify-between items-start mb-6">
              {/* Welcome Text */}
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-white">Mehrab</Text>
              </View>

              {/* Logo */}
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Search */}
            <SearchInput placeholder="Search for a video topic" />

            {/* Latest Videos Title */}
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
