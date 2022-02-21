export interface Environment {
  environment: 'development' | 'staging' | 'production';
  placesApiUrl: string;
  weatherApiUrl: string;
  weatherImgUrl: string;
  placesApiKey: string;
  weatherApiKey: string;
}
