import {
  API_BASE_URL,
  API_GEO_URL,
  API_KEY,
  DEFAULT_PARAMS,
} from "@/src/constants/api";
import { WeatherModel } from "@/src/model/WeatherModel";
import { CitySuggestion } from "@/src/types/WeatherTypes";
import axios from "axios";

export async function fetchWeatherByCoords(
  lat: number,
  lon: number,
): Promise<WeatherModel> {
  const response = await axios.get<WeatherModel>(`${API_BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      ...DEFAULT_PARAMS,
    },
  });

  return response.data;
}

export async function fetchCityByCoords(
  lat: number,
  lon: number,
): Promise<CitySuggestion[]> {
  const response = await axios.get<CitySuggestion[]>(`${API_GEO_URL}/reverse`, {
    params: {
      lat,
      lon,
      limit: 1,
      appid: API_KEY,
    },
  });

  return response.data;
}

export async function fetchCitySuggestions(
  query: string,
): Promise<CitySuggestion[]> {
  const response = await axios.get<CitySuggestion[]>(`${API_GEO_URL}/direct`, {
    params: {
      q: query,
      limit: 5,
      appid: API_KEY,
    },
  });

  return response.data;
}
