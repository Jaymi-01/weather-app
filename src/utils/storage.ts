import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { FullWeatherState } from '../types/weather';

const STORAGE_KEY = '@weather_data';

export const saveWeatherData = async (data: FullWeatherState) => {
  try {
    if (Platform.OS === 'web' && typeof localStorage === 'undefined') return;
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    // Fail silently in production
  }
};

export const getCachedWeatherData = async (): Promise<FullWeatherState | null> => {
  try {
    if (Platform.OS === 'web' && typeof localStorage === 'undefined') return null;
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return null;
  }
};
