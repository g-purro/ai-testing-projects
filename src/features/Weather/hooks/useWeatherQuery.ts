import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/apiClient";
import { WeatherData, WeatherFormData } from "../interfaces/Weather";

export const useWeatherQuery = (formData: WeatherFormData) => {
  const weatherQuery = useQuery({
    queryKey: ["weather", formData.city, formData.country],
    queryFn: () => fetchWeather(formData),
    enabled: !!formData.city && !!formData.country,
    retry: 1,
  });

  return { weatherQuery };
};

const fetchWeather = async (formData: WeatherFormData): Promise<WeatherData> => {
  // Note: In a real application, the API key should be stored in environment variables
  // For this demo, we'll use a placeholder. Users will need to get their own API key from OpenWeatherMap
  const API_KEY = "YOUR_API_KEY_HERE";
  
  if (API_KEY === "YOUR_API_KEY_HERE") {
    // Return mock data for demonstration when no API key is provided
    return Promise.resolve({
      coord: { lon: -0.1257, lat: 51.5085 },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d"
        }
      ],
      base: "stations",
      main: {
        temp: 15.6,
        feels_like: 14.2,
        temp_min: 13.1,
        temp_max: 18.3,
        pressure: 1013,
        humidity: 72
      },
      visibility: 10000,
      wind: {
        speed: 3.6,
        deg: 230
      },
      clouds: {
        all: 0
      },
      dt: 1699876800,
      sys: {
        type: 2,
        id: 2075535,
        country: formData.country.toUpperCase(),
        sunrise: 1699859280,
        sunset: 1699892400
      },
      timezone: 0,
      id: 2643743,
      name: formData.city,
      cod: 200
    });
  }

  const response = await apiClient.get<WeatherData>(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        q: `${formData.city},${formData.country}`,
        appid: API_KEY,
        units: "metric"
      },
    }
  );
  
  return response.data;
};