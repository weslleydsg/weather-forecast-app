import Config from 'react-native-config';
import { Environment } from '~/types';

const environment: Environment = {
  placesApiUrl: Config.PLACES_API_URL,
  weatherApiUrl: Config.WEATHER_API_URL,
  placesApiKey: Config.PLACES_API_KEY,
  weatherApiKey: Config.WEATHER_API_KEY,
};

export default environment;
