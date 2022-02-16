import Config from 'react-native-config';
import { Environment } from '~/types';

const environment: Environment = {
  placesApiUrl: Config.PLACES_API_URL,
  weatherApiUrl: Config.WEATHER_API_URL,
};

export default environment;
