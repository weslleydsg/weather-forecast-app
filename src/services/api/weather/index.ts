import { useTranslation } from 'react-i18next';
import environment from '~/config/environment';
import { useSettings } from '~/contexts/useSettings';
import useFetch from '~/hooks/useFetch';
import { Coord, CurrentWeather, WeekForecast } from '~/types';

const staleTime = 600000; // 10 minutes

export const GetCurrentWeather = (cityName: string) => {
  const { i18n } = useTranslation();
  return useFetch<CurrentWeather>(
    `current-weather-${cityName}`,
    'weatherApi',
    `weather?q=${cityName}&lang=${i18n.language}&appid=${environment.weatherApiKey}`,
    {},
    { staleTime },
  );
};

export const GetWeekForecast = (coord: Coord) => {
  const { i18n } = useTranslation();
  const { unit } = useSettings();
  return useFetch<WeekForecast>(
    `week-forecast-${coord.lat}-${coord.lon}-${i18n.language}-${unit}`,
    'weatherApi',
    `onecall?lat=${coord.lat}&lon=${coord.lon}&units=${unit}&lang=${i18n.language}&exclude=minutely,hourly&appid=${environment.weatherApiKey}`,
    {},
    { staleTime },
  );
};
