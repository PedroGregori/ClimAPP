import { WeatherModel } from "@/src/model/WeatherModel";
import { CitySuggestion, WeatherDisplayData } from "@/src/types/WeatherTypes";

export function mapWeatherToDisplay(
  data: WeatherModel,
  city: CitySuggestion,
): WeatherDisplayData {
  return {
    city: city.name,
    country: city.country,
    temp: `${Math.round(data.main.temp)}°C`,
    feelsLike: `${Math.round(data.main.feels_like)}°C`,
    description: capitalize(data.weather[0]?.description ?? ""),
  };
}

function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}
