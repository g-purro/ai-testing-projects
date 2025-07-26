import { useState } from "react";
import { WeatherForm } from "../components/WeatherForm";
import { WeatherCard } from "../components/WeatherCard";
import { useWeatherQuery } from "../hooks/useWeatherQuery";
import { WeatherFormData } from "../interfaces/Weather";

export const WeatherPage = () => {
  const [formData, setFormData] = useState<WeatherFormData>({ city: "", country: "" });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const { weatherQuery } = useWeatherQuery(formData);

  const handleFormSubmit = (data: WeatherFormData) => {
    setFormData(data);
    setHasSubmitted(true);
  };

  const renderError = () => {
    if (!weatherQuery.error) return null;
    
    let errorMessage = "An error occurred while fetching weather data.";
    
    if (weatherQuery.error instanceof Error) {
      // Handle network errors or API errors
      if (weatherQuery.error.message.includes("404")) {
        errorMessage = "City not found. Please check the city and country name.";
      } else if (weatherQuery.error.message.includes("401")) {
        errorMessage = "Invalid API key. Please check your OpenWeatherMap API key.";
      } else {
        errorMessage = weatherQuery.error.message;
      }
    }

    return (
      <div className="w-full max-w-md mx-auto mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Error: {errorMessage}</span>
        </div>
      </div>
    );
  };

  const renderLoading = () => (
    <div className="w-full max-w-md mx-auto mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
        <span className="text-blue-700 font-medium">Fetching weather data...</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Weather App</h1>
          <p className="text-gray-600">Get current weather information for any city</p>
        </div>

        <WeatherForm
          onSubmit={handleFormSubmit}
          isLoading={weatherQuery.isLoading}
        />

        {weatherQuery.isLoading && renderLoading()}
        {weatherQuery.error && renderError()}
        {weatherQuery.data && hasSubmitted && <WeatherCard weatherData={weatherQuery.data} />}
        
        {!hasSubmitted && (
          <div className="w-full max-w-md mx-auto mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-yellow-800 text-sm">
                <strong>Note:</strong> This demo uses mock data. To use real weather data, get a free API key from{" "}
                <a 
                  href="https://openweathermap.org/api" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  OpenWeatherMap
                </a>
                {" "}and update the API key in the code.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};