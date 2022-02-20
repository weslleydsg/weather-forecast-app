export type BottomTabStacks = {
  HomeStack?: {
    initial: boolean;
    screen: keyof HomeStack;
    params?: HomeStack[keyof HomeStack];
  };
  MyLocationStack?: {
    initial: boolean;
    screen: keyof MyLocationStack;
    params?: MyLocationStack[keyof MyLocationStack];
  };
};

export type HomeStack = {
  SavedCities: undefined;
  PlacesAutocomplete: undefined;
  CityWeatherForecast: { cityName: string };
};

export type MyLocationStack = {
  MyLocationWeather: undefined;
};
