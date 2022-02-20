import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateAsyncFunction,
  UseQueryResult,
} from 'react-query';

export type Headers = AxiosRequestHeaders;

export interface QueryResult<T> {
  isLoading: boolean;
  isFetching?: boolean;
  error: Error | null;
  data: UseQueryResult<T> | undefined;
  refetch(
    options?: RefetchOptions,
  ): Promise<QueryObserverResult<UseQueryResult<T, Error>, Error>>;
}

export interface MutationResult<T, F = void> {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  mutateAsync: UseMutateAsyncFunction<T, Error, F>;
}

export type MutationResponse<T = undefined> = AxiosResponse<T>;

export interface MutationRequest<T> {
  url?: string;
  data: T;
}

interface PlacesAutocompleteLengthOffset {
  length: number;
  offset: number;
}

export interface PlacesAutocomplete {
  predictions: {
    description: string;
    matched_substrings: PlacesAutocompleteLengthOffset[];
    place_id: string;
    reference: string;
    structured_formatting: {
      main_text: string;
      main_text_matched_substrings: PlacesAutocompleteLengthOffset[];
      secondary_text: string;
    };
    terms: {
      offset: number;
      value: string;
    }[];
    types: ('locality' | 'political' | 'geocode')[];
  }[];
  status: string;
}

export interface Coord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Wind {
  speed: number;
  deg: number;
}

export interface CurrentWeather {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: Wind;
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
}

interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface ForecastDay {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}

export interface WeekForecast {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  daily: ForecastDay[];
}
