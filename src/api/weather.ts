import axios from 'axios';
import { FullWeatherState, WeatherData, ForecastDay, HourlyForecast } from '../types/weather';

const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<FullWeatherState> => {
  const currentRes = await axios.get(`${BASE_URL}/weather`, {
    params: { lat, lon, appid: API_KEY, units: 'metric' },
  });

  const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
    params: { lat, lon, appid: API_KEY, units: 'metric' },
  });

  return transformData(currentRes.data, forecastRes.data);
};

export const fetchWeatherByCity = async (city: string): Promise<FullWeatherState> => {
  const currentRes = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, appid: API_KEY, units: 'metric' },
  });

  const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
    params: { q: city, appid: API_KEY, units: 'metric' },
  });

  return transformData(currentRes.data, forecastRes.data);
};

const transformData = (currentData: any, forecastData: any): FullWeatherState => {
  const current: WeatherData = {
    city: currentData.name,
    temp: Math.round(currentData.main.temp),
    condition: currentData.weather[0].main,
    description: currentData.weather[0].description,
    icon: currentData.weather[0].icon,
    humidity: currentData.main.humidity,
    windSpeed: currentData.wind.speed,
    feelsLike: Math.round(currentData.main.feels_like),
    tempMin: Math.round(currentData.main.temp_min),
    tempMax: Math.round(currentData.main.temp_max),
    timestamp: Date.now(),
  };

  const hourly: HourlyForecast[] = forecastData.list.slice(0, 8).map((item: any) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: Math.round(item.main.temp),
    condition: item.weather[0].main,
    icon: item.weather[0].icon,
  }));

  const dailyMap: { [key: string]: any } = {};
  forecastData.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString([], { weekday: 'short' });
    if (!dailyMap[date]) {
      dailyMap[date] = {
        date,
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
      };
    } else {
      dailyMap[date].tempMin = Math.min(dailyMap[date].tempMin, item.main.temp_min);
      dailyMap[date].tempMax = Math.max(dailyMap[date].tempMax, item.main.temp_max);
    }
  });

  const daily: ForecastDay[] = Object.values(dailyMap).slice(0, 5).map(day => ({
    ...day,
    tempMin: Math.round(day.tempMin),
    tempMax: Math.round(day.tempMax),
  }));

  return { current, hourly, daily, lastUpdated: Date.now() };
};
