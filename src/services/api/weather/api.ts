import axios from 'axios';
import environment from '~/config/environment';

export const weatherApi = axios.create({
  baseURL: environment.weatherApiUrl,
});
