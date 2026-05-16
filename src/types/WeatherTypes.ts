export interface WeatherDisplayData {
  city: string;
  country: string;
  temp: string;
  feelsLike: string;
  description: string;
}

export interface CitySuggestion {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}
