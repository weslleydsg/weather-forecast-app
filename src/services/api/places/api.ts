import axios from 'axios';
import environment from '~/config/environment';

export const placesApi = axios.create({
  baseURL: environment.placesApiUrl,
});
