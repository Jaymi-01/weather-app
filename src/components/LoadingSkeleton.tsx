import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  useAnimatedStyle,
  interpolate
} from 'react-native-reanimated';

export const LoadingSkeleton = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.7, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, animatedStyle]} />
      <Animated.View style={[styles.main, animatedStyle]} />
      <View style={styles.row}>
        <Animated.View style={[styles.box, animatedStyle]} />
        <Animated.View style={[styles.box, animatedStyle]} />
        <Animated.View style={[styles.box, animatedStyle]} />
      </View>
      <Animated.View style={[styles.list, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    marginTop: 60,
  },
  header: {
    height: 40,
    width: '60%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    alignSelf: 'center',
  },
  main: {
    height: 150,
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  box: {
    flex: 1,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  list: {
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
});
