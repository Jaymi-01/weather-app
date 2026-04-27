# SkyCast - Lagos Weather & Forecast

SkyCast is a modern, high-performance weather application built with React Native and Expo. It provides real-time weather updates and multi-day forecasts with a focus on fluid user experience and elegant animations.

## 📱 App Features & Functionality

- **Real-time Weather**: Current temperature, humidity, wind speed, and "feels like" conditions.
- **Dynamic Environments**: The app's background gradient and theme change dynamically based on the current weather condition (Clear, Cloudy, Rainy, etc.).
- **Location-Based**: Automatically detects your current location to provide local weather data.
- **Manual Search**: Users can search for any city globally to view its weather.
- **Extended Forecasts**:
  - **Hourly**: 24-hour horizontal forecast.
  - **Daily**: 5-day vertical forecast with high/low temperatures.
- **Offline Caching**: All weather data is cached locally using AsyncStorage, allowing users to view the last updated weather even without an internet connection.
- **Robust Error Handling**: Friendly error states for location timeouts, API failures, or network issues, including a quick fallback to Lagos for Nigerian users.

## 🌐 APIs Used

- **[OpenWeatherMap API](https://openweathermap.org/api)**: Used for fetching current weather and 5-day/3-hour forecast data.
- **[Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)**: Used for accessing device GPS coordinates.

## ✨ Animation Highlights

The app utilizes **React Native Reanimated 3** for high-performance, 60fps animations:

1.  **Staggered List Entrances**:
    - The hourly forecast items slide in from the right with a staggered delay.
    - The daily forecast rows glide up from the bottom sequentially, creating a fluid "building" effect as the screen loads.
2.  **Pulsing Loading Skeletons**:
    - Custom skeleton loaders with a smooth opacity pulsing animation provide visual feedback during data fetching.
3.  **Layout Transitions**:
    - The main weather card uses a `FadeInUp` animation to enter the screen gracefully once the data is ready.

## 🛠 Libraries & Dependencies

- **Framework**: Expo SDK 54 (React Native)
- **Navigation**: Expo Router (File-based routing)
- **Animations**: `react-native-reanimated`
- **Icons**: `phosphor-react-native` (SVG-based)
- **Styling**: `expo-linear-gradient` for dynamic backgrounds
- **Data Fetching**: `axios`
- **Storage**: `@react-native-async-storage/async-storage` for offline persistence

## 🏗 Architecture

The app follows a modular and clean architecture:

- **/app**: Expo Router entry points and layouts.
- **/src/api**: Service layer for API requests and data transformation logic.
- **/src/hooks**: Custom React Hooks for encapsulating Location and Weather logic (`useWeather`, `useLocation`).
- **/src/components**: Atomic UI components (WeatherIcon, SearchBar, ForecastList).
- **/src/utils**: Utility functions for data persistence (Storage).
- **/src/types**: TypeScript interfaces for strict type safety across the data layer.

## 📸 Screenshots

<p align="center">
  <img src="https://res.cloudinary.com/dquzcqxcy/image/upload/v1777287319/kmni291te1jdgce177vg.png" width="200" />
  <img src="https://res.cloudinary.com/dquzcqxcy/image/upload/v1777287329/metqy8qztawlxix8lxjh.png" width="200" />
  <img src="https://res.cloudinary.com/dquzcqxcy/image/upload/v1777287331/u92yz8yk0lxkncf1ixw8.png" width="200" />
  <img src="https://res.cloudinary.com/dquzcqxcy/image/upload/v1777287331/vzywdvwgebocbkwzerjk.png" width="200" />
</p>
