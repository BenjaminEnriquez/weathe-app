import axios from 'axios';
import { WeatherData, ApiError } from '../types/weather';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'demo-key';
const BASE_URL = 'https://api.weatherapi.com/v1';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const weatherService = {
  getCurrentWeather: async (query: string): Promise<WeatherData> => {
    try {
      const response = await weatherApi.get<WeatherData>('/current.json', {
        params: {
          key: API_KEY,
          q: query,
          aqi: 'no',
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        const apiError: ApiError = error.response.data;
        throw new Error(apiError.error.message);
      }
      throw new Error('Failed to fetch weather data');
    }
  },

  getForecastWeather: async (query: string, days: number = 5): Promise<WeatherData> => {
    try {
      const response = await weatherApi.get<WeatherData>('/forecast.json', {
        params: {
          key: API_KEY,
          q: query,
          days: Math.min(days, 10),
          aqi: 'no',
          alerts: 'no',
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        const apiError: ApiError = error.response.data;
        throw new Error(apiError.error.message);
      }
      throw new Error('Failed to fetch weather forecast');
    }
  },

  searchLocations: async (query: string): Promise<Array<{ id: number; name: string; region: string; country: string; lat: number; lon: number; url: string }>> => {
    try {
      const response = await weatherApi.get('/search.json', {
        params: {
          key: API_KEY,
          q: query,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        const apiError: ApiError = error.response.data;
        throw new Error(apiError.error.message);
      }
      throw new Error('Failed to search locations');
    }
  },
};