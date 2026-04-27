import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  CloudSnow, 
  Wind, 
  CloudFog,
  Moon,
  Question
} from 'phosphor-react-native';
import { Colors } from '../constants/colors';

interface Props {
  condition: string;
  size?: number;
  color?: string;
}

export const WeatherIcon = ({ condition, size = 64, color = Colors.text.main }: Props) => {
  const cond = condition.toLowerCase();
  
  if (cond.includes('clear')) return <Sun size={size} color={color} weight="fill" />;
  if (cond.includes('cloud')) return <Cloud size={size} color={color} weight="fill" />;
  if (cond.includes('rain') || cond.includes('drizzle')) return <CloudRain size={size} color={color} weight="fill" />;
  if (cond.includes('thunderstorm')) return <CloudLightning size={size} color={color} weight="fill" />;
  if (cond.includes('snow')) return <CloudSnow size={size} color={color} weight="fill" />;
  if (cond.includes('mist') || cond.includes('fog') || cond.includes('haze')) return <CloudFog size={size} color={color} weight="fill" />;
  
  return <Question size={size} color={color} weight="fill" />;
};
