export const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
export const API_GEO_URL = "https://api.openweathermap.org/geo/1.0";
export const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY ?? "";
export const DEFAULT_PARAMS = {
  units: "metric",
  lang: "pt_br",
};
