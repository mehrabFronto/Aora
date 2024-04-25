import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';
import { getUserPosts } from '../../lib/appwrite';
import useFetch from '../../hooks/useFetch';
import VideoCard from '../../components/VideoCard';
import { VideoType } from '../../types/VideoType';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts } = useFetch(() => getUserPosts(String(user?.$id)));

  const handleLogout = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts as VideoType[]}
        keyExtractor={(item) => String(item.$id)}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            {/* Logout */}
            <TouchableOpacity
              onPress={handleLogout}
              className="w-full items-end mb-10">
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            {/* User avatar */}
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center p-0.5">
              <Image
                source={{ uri: user?.avatar }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>

            {/* User Info */}
            <InfoBox
              title={String(user?.username)}
              titleStyles="text-lg"
              containerStyles="mt-5"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={(posts as VideoType[])?.length || '0'}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2K"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
