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
