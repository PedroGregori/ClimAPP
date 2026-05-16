export interface WeatherMain {
  temp: number;
  feels_like: number;
  humidity: number;
}

export interface WeatherCondition {
  description: string;
  icon: string;
}

export interface WeatherModel {
  name: string;
  sys: {
    country: string;
  };
  main: WeatherMain;
  weather: WeatherCondition[];
}