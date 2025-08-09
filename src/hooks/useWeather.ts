import { useState, useCallback } from 'react';
import { WeatherData } from '../types/weather';
import { weatherService } from '../services/weatherApi';

interface UseWeatherReturn {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchCurrentWeather: (query: string) => Promise<void>;
  fetchForecastWeather: (query: string, days?: number) => Promise<void>;
  clearError: () => void;
}

export const useWeather = (): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchCurrentWeather = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a valid location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await weatherService.getCurrentWeather(query);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchForecastWeather = useCallback(async (query: string, days: number = 5) => {
    if (!query.trim()) {
      setError('Please enter a valid location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await weatherService.getForecastWeather(query, days);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    weatherData,
    loading,
    error,
    fetchCurrentWeather,
    fetchForecastWeather,
    clearError,
  };
};