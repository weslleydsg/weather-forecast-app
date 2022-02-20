import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { ActivityIndicator, withTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/MaterialIcons';
import WeatherForecastByCoord from '~/components/WeatherForecastByCoord';
import { useFavoritesCities } from '~/hooks/useFavoritesCities';
import { GetCurrentWeather } from '~/services/api/weather';
import { HomeStack } from '~/types';
import styles from './styles';

const CityWeatherForecastScreen = withTheme(({ theme }) => {
  const { setOptions } = useNavigation<NavigationProp<HomeStack>>();
  const { params } = useRoute<RouteProp<HomeStack, 'CityWeatherForecast'>>();
  const { favoritesCities, toggleFavoritesCities } = useFavoritesCities();
  const { data: currentWeatherData } = GetCurrentWeather(params.cityName);
  const coord = currentWeatherData?.data?.coord;
  const favorite =
    favoritesCities.findIndex((favoriteCity) => {
      return favoriteCity === params.cityName;
    }) !== -1;

  useLayoutEffect(() => {
    setOptions({
      headerTitle: params.cityName,
      headerRight: () => (
        <Icons
          name="favorite"
          color={favorite ? theme.colors.accent : theme.colors.onSurface}
          size={theme.iconSizes.bottomTab}
          onPress={() => toggleFavoritesCities(params.cityName)}
        />
      ),
    });
  }, [
    favorite,
    params.cityName,
    setOptions,
    theme.colors.accent,
    theme.colors.onSurface,
    theme.iconSizes.bottomTab,
    toggleFavoritesCities,
  ]);

  if (!coord) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return <WeatherForecastByCoord coord={coord} />;
});

export default CityWeatherForecastScreen;
