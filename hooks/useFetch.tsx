import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';

const useFetch = (fn: () => any) => {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();

      setData(response);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useFetch;
