import environment from '~/config/environment';
import useFetch from '~/hooks/useFetch';
import { Coord, CurrentWeather, WeekForecast } from '~/types';

const staleTime = 600000; // 10 minutes

export const GetCurrentWeather = (cityName: string) => {
  return useFetch<CurrentWeather>(
    `current-weather-${cityName}`,
    'weatherApi',
    `weather?q=${cityName}&units=metric&lang=pt_br&appid=${environment.weatherApiKey}`,
    {},
    { staleTime },
  );
};

export const GetWeekForecast = (coord: Coord) => {
  return useFetch<WeekForecast>(
    `week-forecast-${coord?.lat}-${coord?.lon}`,
    'weatherApi',
    `onecall?lat=${coord?.lat}&lon=${coord?.lon}&units=metric&lang=pt_br&exclude=minutely,hourly&appid=${environment.weatherApiKey}`,
    {},
    { staleTime },
  );
};
