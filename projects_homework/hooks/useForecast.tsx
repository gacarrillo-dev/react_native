import { useEffect, useState } from "react";
import axios from "axios";

export function useForecast() {
  const [weather, setWeather] = useState<any>(null); // Adjust type as necessary
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=27fc2b50a1fd45ee9e0233801240708&q=West Warwick&days=3`
        );
        setWeather(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { weather, isLoading, error };
}
