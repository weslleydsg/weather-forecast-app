import {
  useMutation as useReactMutation,
  UseMutationOptions,
} from 'react-query';
import * as apis from '~/services/api';
import {
  Headers,
  MutationRequest,
  MutationResponse,
  MutationResult,
} from '~/types';

interface OptionalProps {
  url?: string;
  headers?: Headers;
}

type Options<T, F> =
  | UseMutationOptions<MutationResponse<T>, Error, MutationRequest<F>>
  | undefined;

export default function useMutation<T, F = undefined>(
  key: string,
  apiType: 'placesApi' | 'weatherApi',
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  { url = '', headers }: OptionalProps = {},
  options: Options<T, F> = {},
): MutationResult<MutationResponse<T>, MutationRequest<F>> {
  return useReactMutation<MutationResponse<T>, Error, MutationRequest<F>>(
    key,
    (request) => {
      return apis[apiType][method](`${url}${request.url || ''}`, request.data, {
        headers,
      });
    },
    options,
  );
}
