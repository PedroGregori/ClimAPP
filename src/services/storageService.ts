import { CitySuggestion } from "@/src/types/WeatherTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LAST_CITY_KEY = "@last_city";
const HISTORY_KEY = "@city_history";

export async function saveLastCity(city: CitySuggestion): Promise<void> {
  await AsyncStorage.setItem(LAST_CITY_KEY, JSON.stringify(city));
}

export async function loadLastCity(): Promise<CitySuggestion | null> {
  const data = await AsyncStorage.getItem(LAST_CITY_KEY);
  return data ? JSON.parse(data) : null;
}

export async function saveToHistory(city: CitySuggestion): Promise<void> {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  const history = raw ? (JSON.parse(raw) as CitySuggestion[]) : [];

  const alreadyExists = history.some(
    (item: CitySuggestion) =>
      item.name === city.name && item.country === city.country,
  );

  if (!alreadyExists) {
    const updated = [city, ...history].slice(0, 10);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  }
}

export async function loadHistory() {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}
