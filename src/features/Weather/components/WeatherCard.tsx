import { WeatherData } from "../interfaces/Weather";

interface WeatherCardProps {
  weatherData: WeatherData;
}

export const WeatherCard = ({ weatherData }: WeatherCardProps) => {
  const {
    name,
    sys: { country },
    weather,
    main: { temp, feels_like, humidity, pressure },
    wind: { speed },
    visibility,
  } = weatherData;

  const mainWeather = weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${mainWeather.icon}@2x.png`;

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg mt-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">
          {name}, {country}
        </h3>
        <div className="flex items-center justify-center mt-2">
          <img
            src={iconUrl}
            alt={mainWeather.description}
            className="w-16 h-16"
            onError={(e) => {
              // Hide image if it fails to load (when using mock data)
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="ml-2">
            <p className="text-4xl font-bold">{Math.round(temp)}°C</p>
            <p className="text-lg capitalize">{mainWeather.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white bg-opacity-20 p-3 rounded">
          <p className="font-semibold">Feels like</p>
          <p className="text-lg">{Math.round(feels_like)}°C</p>
        </div>
        <div className="bg-white bg-opacity-20 p-3 rounded">
          <p className="font-semibold">Humidity</p>
          <p className="text-lg">{humidity}%</p>
        </div>
        <div className="bg-white bg-opacity-20 p-3 rounded">
          <p className="font-semibold">Wind Speed</p>
          <p className="text-lg">{speed} m/s</p>
        </div>
        <div className="bg-white bg-opacity-20 p-3 rounded">
          <p className="font-semibold">Pressure</p>
          <p className="text-lg">{pressure} hPa</p>
        </div>
        <div className="bg-white bg-opacity-20 p-3 rounded col-span-2">
          <p className="font-semibold">Visibility</p>
          <p className="text-lg">{(visibility / 1000).toFixed(1)} km</p>
        </div>
      </div>
    </div>
  );
};