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
