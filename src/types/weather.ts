export interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  timestamp: number;
}

export interface ForecastDay {
  date: string;
  temp: number;
  condition: string;
  icon: string;
  tempMin: number;
  tempMax: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
  icon: string;
}

export interface FullWeatherState {
  current: WeatherData | null;
  hourly: HourlyForecast[];
  daily: ForecastDay[];
  lastUpdated: number | null;
}
