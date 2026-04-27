import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInRight, FadeInDown } from 'react-native-reanimated';
import { HourlyForecast, ForecastDay } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { Colors } from '../constants/colors';

interface Props {
  hourly: HourlyForecast[];
  daily: ForecastDay[];
}

export const ForecastList = ({ hourly, daily }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hourly Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
        {hourly.map((item, index) => (
          <Animated.View 
            key={index} 
            entering={FadeInRight.delay(index * 100)}
            style={styles.hourlyItem}
          >
            <Text style={styles.hourlyTime}>{item.time}</Text>
            <WeatherIcon condition={item.condition} size={30} />
            <Text style={styles.hourlyTemp}>{item.temp}°</Text>
          </Animated.View>
        ))}
      </ScrollView>

      <Text style={[styles.title, { marginTop: 30 }]}>5-Day Forecast</Text>
      <View style={styles.dailyList}>
        {daily.map((day, index) => (
          <Animated.View 
            key={index} 
            entering={FadeInDown.delay(index * 100 + 400)}
            style={styles.dailyItem}
          >
            <Text style={styles.dayName}>{day.date}</Text>
            <View style={styles.dayIcon}>
              <WeatherIcon condition={day.condition} size={24} />
              <Text style={styles.dayCondition}>{day.condition}</Text>
            </View>
            <View style={styles.dayTemps}>
              <Text style={styles.maxTemp}>{day.tempMax}°</Text>
              <Text style={styles.minTemp}>{day.tempMin}°</Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.main,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  hourlyScroll: {
    flexDirection: 'row',
  },
  hourlyItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 15,
    borderRadius: 20,
    marginRight: 15,
    minWidth: 80,
  },
  hourlyTime: {
    color: Colors.text.sub,
    fontSize: 12,
    marginBottom: 10,
  },
  hourlyTemp: {
    color: Colors.text.main,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  dailyList: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    padding: 15,
  },
  dailyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  dayName: {
    color: Colors.text.main,
    fontSize: 16,
    width: 60,
  },
  dayIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    justifyContent: 'center',
  },
  dayCondition: {
    color: Colors.text.sub,
    fontSize: 14,
  },
  dayTemps: {
    flexDirection: 'row',
    gap: 10,
    width: 70,
    justifyContent: 'flex-end',
  },
  maxTemp: {
    color: Colors.text.main,
    fontSize: 16,
    fontWeight: '600',
  },
  minTemp: {
    color: Colors.text.sub,
    fontSize: 16,
  },
});
