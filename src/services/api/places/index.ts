import { useTranslation } from 'react-i18next';
import environment from '~/config/environment';
import useFetch from '~/hooks/useFetch';
import { PlacesAutocomplete } from '~/types';

export const GetCitiesAutocomplete = (searchTerm: string) => {
  const { i18n } = useTranslation();
  return useFetch<PlacesAutocomplete>(
    `cities-autocomplete`,
    'placesApi',
    `place/autocomplete/json?language=${i18n.language}&types=%28cities%29&input=${searchTerm}&key=${environment.placesApiKey}`,
    {},
    { enabled: false },
  );
};
