import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { WeatherData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { Colors } from '../constants/colors';
import { Drop, Wind, Thermometer } from 'phosphor-react-native';

interface Props {
  data: WeatherData;
}

export const CurrentWeather = ({ data }: Props) => {
  return (
    <Animated.View 
      entering={FadeInUp.duration(800)} 
      style={styles.container}
    >
      <Text style={styles.city}>{data.city}</Text>
      <Text style={styles.date}>{new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
      
      <View style={styles.mainInfo}>
        <WeatherIcon condition={data.condition} size={120} />
        <Text style={styles.temp}>{data.temp}°</Text>
        <Text style={styles.condition}>{data.condition}</Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Drop size={24} color={Colors.text.main} weight="fill" />
          <Text style={styles.detailValue}>{data.humidity}%</Text>
          <Text style={styles.detailLabel}>Humidity</Text>
        </View>
        <View style={styles.detailItem}>
          <Wind size={24} color={Colors.text.main} weight="fill" />
          <Text style={styles.detailValue}>{data.windSpeed}m/s</Text>
          <Text style={styles.detailLabel}>Wind</Text>
        </View>
        <View style={styles.detailItem}>
          <Thermometer size={24} color={Colors.text.main} weight="fill" />
          <Text style={styles.detailValue}>{data.feelsLike}°</Text>
          <Text style={styles.detailLabel}>Feels Like</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
  },
  city: {
    fontSize: 34,
    color: Colors.text.main,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: Colors.text.sub,
    marginTop: 5,
  },
  mainInfo: {
    alignItems: 'center',
    marginVertical: 30,
  },
  temp: {
    fontSize: 80,
    color: Colors.text.main,
    fontWeight: '200',
    marginTop: 10,
  },
  condition: {
    fontSize: 24,
    color: Colors.text.sub,
    textTransform: 'capitalize',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailValue: {
    color: Colors.text.main,
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
  },
  detailLabel: {
    color: Colors.text.sub,
    fontSize: 12,
  },
});
