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
  SettingsStack?: {
    initial: boolean;
    screen: keyof SettingsStack;
    params?: SettingsStack[keyof SettingsStack];
  };
};

export type HomeStack = {
  FavoritesCities: undefined;
  PlacesAutocomplete: undefined;
  CityWeatherForecast: { cityName: string };
};

export type MyLocationStack = {
  MyLocationWeather: undefined;
};

export type SettingsStack = {
  Settings: undefined;
};
