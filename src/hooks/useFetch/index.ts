import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import * as apis from '~/services/api';
import { Headers, QueryResult } from '~/types';

interface OptionalProps {
  headers?: Headers;
  params?: { [key: string]: unknown };
}

type Options<T> =
  | UseQueryOptions<QueryResult<T>, Error, UseQueryResult<T, Error>>
  | undefined;

export default function useFetch<T>(
  key: string,
  apiType: 'placesApi' | 'weatherApi',
  url: string,
  { headers, params }: OptionalProps = {},
  options: Options<T> = {},
): QueryResult<T> {
  return useQuery<QueryResult<T>, Error, UseQueryResult<T, Error>>(
    key,
    () => apis[apiType].get(url, { headers, params }),
    options,
  );
}
