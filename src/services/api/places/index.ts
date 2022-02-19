import environment from '~/config/environment';
import useFetch from '~/hooks/useFetch';
import { PlacesAutocomplete } from '~/types';

export const GetCitiesAutocomplete = (searchTerm: string) => {
  return useFetch<PlacesAutocomplete>(
    'cities-autocomplete',
    'placesApi',
    `place/autocomplete/json?language=pt_BR&types=%28cities%29&input=${searchTerm}&key=${environment.placesApiKey}`,
  );
};
