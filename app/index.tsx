import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  RefreshControl, 
  StatusBar,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocation } from '../src/hooks/useLocation';
import { useWeather } from '../src/hooks/useWeather';
import { SearchBar } from '../src/components/SearchBar';
import { CurrentWeather } from '../src/components/CurrentWeather';
import { ForecastList } from '../src/components/ForecastList';
import { LoadingSkeleton } from '../src/components/LoadingSkeleton';
import { ErrorDisplay } from '../src/components/ErrorDisplay';
import { Colors } from '../src/constants/colors';

export default function Index() {
  const { location, errorMsg: locationError, loading: locationLoading, refreshLocation } = useLocation();
  const { 
    weatherData, 
    loading: weatherLoading, 
    error: weatherError, 
    refreshWeather 
  } = useWeather(location?.coords.latitude, location?.coords.longitude);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshLocation();
    await refreshWeather();
    setRefreshing(false);
  };

  const handleSearch = (city: string) => {
    refreshWeather(city);
  };

  const getBackgroundColors = () => {
    if (!weatherData) return Colors.background.default;
    const condition = weatherData.current?.condition.toLowerCase() || '';
    if (condition.includes('clear')) return Colors.background.clear;
    if (condition.includes('cloud')) return Colors.background.cloudy;
    if (condition.includes('rain')) return Colors.background.rainy;
    if (condition.includes('sun')) return Colors.background.sunny;
    return Colors.background.default;
  };

  const handleUseDefault = () => {
    refreshWeather('Lagos');
  };

  const isLoading = locationLoading || (weatherLoading && !weatherData);
  const error = locationError || weatherError;

  return (
    <LinearGradient 
      colors={getBackgroundColors() as [string, string, ...string[]]} 
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        {isLoading ? (
          <>
            <SearchBar onSearch={handleSearch} />
            <LoadingSkeleton />
          </>
        ) : error && !weatherData ? (
          <View style={{ flex: 1 }}>
            <SearchBar onSearch={handleSearch} />
            <ErrorDisplay 
              message={error} 
              onRetry={onRefresh} 
            />
            <TouchableOpacity 
              style={styles.defaultButton} 
              onPress={handleUseDefault}
            >
              <Text style={styles.defaultButtonText}>Or use Lagos as default</Text>
            </TouchableOpacity>
          </View>
        ) : weatherData ? (
          <>
            <SearchBar onSearch={handleSearch} />
            <ScrollView 
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl 
                  refreshing={refreshing} 
                  onRefresh={onRefresh} 
                  tintColor="#FFF"
                />
              }
            >
              {weatherData.current && <CurrentWeather data={weatherData.current} />}
              <ForecastList 
                hourly={weatherData.hourly} 
                daily={weatherData.daily} 
              />
            </ScrollView>
          </>
        ) : (
          <View style={{ flex: 1 }}>
            <SearchBar onSearch={handleSearch} />
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Search for a city to see the weather
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  defaultButton: {
    alignSelf: 'center',
    marginTop: -10,
    padding: 15,
  },
  defaultButtonText: {
    color: 'rgba(255,255,255,0.7)',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
});
