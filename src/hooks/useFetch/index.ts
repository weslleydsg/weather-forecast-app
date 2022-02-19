import { useQuery, UseQueryResult } from 'react-query';
import * as apis from '~/services/api';
import { Headers, QueryResult } from '~/types';

interface OptionalProps {
  enabled?: boolean;
  headers?: Headers;
  params?: { [key: string]: unknown };
}

export default function useFetch<T>(
  key: string,
  apiType: 'placesApi' | 'weatherApi',
  url: string,
  { enabled, headers, params }: OptionalProps = {},
): QueryResult<T> {
  return useQuery<QueryResult<T>, Error, UseQueryResult<T, Error>>(
    key,
    () => apis[apiType].get(url, { headers, params }),
    {
      enabled,
    },
  );
}
