import { useState, useEffect, useCallback } from 'react';
import { FullWeatherState } from '../types/weather';
import { fetchWeatherByCoords, fetchWeatherByCity } from '../api/weather';
import { saveWeatherData, getCachedWeatherData } from '../utils/storage';

export const useWeather = (lat?: number, lon?: number) => {
  const [weatherData, setWeatherData] = useState<FullWeatherState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city?: string) => {
    const hasCoords = lat !== undefined && lon !== undefined;
    if (!city && !hasCoords) return;

    setLoading(true);
    setError(null);
    try {
      let data: FullWeatherState;
      if (city) {
        data = await fetchWeatherByCity(city);
      } else if (hasCoords) {
        data = await fetchWeatherByCoords(lat!, lon!);
      } else {
        throw new Error('No location information provided');
      }
      
      setWeatherData(data);
      await saveWeatherData(data);
    } catch (err: any) {
      const cached = await getCachedWeatherData();
      if (cached) {
        setWeatherData(cached);
      } else {
        setError('Failed to fetch weather data');
      }
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  useEffect(() => {
    if (lat !== undefined && lon !== undefined) {
      fetchWeather();
    }
  }, [lat, lon, fetchWeather]);

  return { weatherData, loading, error, refreshWeather: fetchWeather };
};
