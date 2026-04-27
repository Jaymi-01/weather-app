import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        setErrorMsg('Location services are disabled. Please enable them or search manually.');
        setLoading(false);
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Location permission denied.');
        setLoading(false);
        return;
      }

      let loc = await Location.getLastKnownPositionAsync({});
      
      if (!loc) {
        loc = await Promise.race([
          Location.getCurrentPositionAsync({ 
            accuracy: Location.Accuracy.Low,
          }),
          new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Timeout')), 15000))
        ]) as Location.LocationObject;
      }

      if (loc) {
        setLocation(loc);
      } else {
        throw new Error('No location returned');
      }
    } catch (error) {
      setErrorMsg('Could not detect location automatically.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, errorMsg, loading, refreshLocation: getLocation };
};
