import * as Location from "expo-location";
import {
  loadHistory,
  loadLastCity,
  saveLastCity,
  saveToHistory,
} from "@/src/services/storageService";
import {
  fetchCitySuggestions,
  fetchCityByCoords,
  fetchWeatherByCoords,
} from "@/src/services/weatherService";
import { CitySuggestion, WeatherDisplayData } from "@/src/types/WeatherTypes";
import { mapWeatherToDisplay } from "@/src/utils/weatherUtils";
import { useEffect, useState } from "react";

export function useWeatherViewModel() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [weather, setWeather] = useState<WeatherDisplayData | null>(null);
  const [history, setHistory] = useState<CitySuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const lastCity = await loadLastCity();
      const savedHistory = await loadHistory();
      setHistory(savedHistory);

      if (lastCity) {
        await fetchClimate(lastCity);
      }
    }
    init();
  }, []);

  async function fetchClimate(city: CitySuggestion) {
    setLoading(true);
    setError(null);

    try {
      const raw = await fetchWeatherByCoords(city.lat, city.lon);
      setWeather(mapWeatherToDisplay(raw, city));
      await saveLastCity(city);
      await saveToHistory(city);
      const updatedHistory = await loadHistory();
      setHistory(updatedHistory);
    } catch {
      setError("Erro ao buscar clima. Tente novamente.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  async function searchSuggestions() {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSuggestions([]);
    setWeather(null);

    try {
      const results = await fetchCitySuggestions(query);
      if (results.length === 0) {
        setError("Nenhuma cidade encontrada.");
      } else {
        setSuggestions(results);
      }
    } catch {
      setError("Erro ao buscar cidades. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function selectCity(city: CitySuggestion) {
    setSuggestions([]);
    await fetchClimate(city);
  }

  async function searchCurrentLocation() {
    setError(null);
    setSuggestions([]);
    setWeather(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permissão de localização negada.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const reverseGeo = await fetchCityByCoords(
        location.coords.latitude,
        location.coords.longitude,
      );

      const currentCity: CitySuggestion = reverseGeo[0] ?? {
        name: "Minha localização",
        country: "",
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      };

      await fetchClimate(currentCity);
    } catch {
      setError("Erro ao obter localização. Tente novamente.");
    }
  }

  return {
    query,
    setQuery,
    suggestions,
    weather,
    history,
    loading,
    error,
    searchSuggestions,
    selectCity,
    searchCurrentLocation,
  };
}
