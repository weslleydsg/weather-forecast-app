import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceStorageData, DeviceStorageKeys } from '~/types';

const storeData = async (key: DeviceStorageKeys, value: DeviceStorageData) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
};

const getData = async <T>(key: DeviceStorageKeys): Promise<T | null> => {
  const jsonValue = await AsyncStorage.getItem(key);
  if (jsonValue === null) return null;
  return JSON.parse(jsonValue) as T;
};

export const DeviceStorage = { storeData, getData };
