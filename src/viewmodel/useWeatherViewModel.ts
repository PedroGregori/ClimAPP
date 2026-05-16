import {
  fetchCitySuggestions,
  fetchWeatherByCoords,
} from "@/src/services/weatherService";
import { CitySuggestion, WeatherDisplayData } from "@/src/types/WeatherTypes";
import { mapWeatherToDisplay } from "@/src/utils/weatherUtils";
import { useState } from "react";

export function useWeatherViewModel() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [weather, setWeather] = useState<WeatherDisplayData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setLoading(true);
    setError(null);

    try {
      const raw = await fetchWeatherByCoords(city.lat, city.lon);
      setWeather(mapWeatherToDisplay(raw, city));
    } catch {
      setError("Erro ao buscar clima. Tente novamente.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  return {
    query,
    setQuery,
    suggestions,
    weather,
    loading,
    error,
    searchSuggestions,
    selectCity,
  };
}
