import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Title, withTheme } from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useFavoritesCities } from '~/hooks/useFavoritesCities';
import { HomeStack } from '~/types';
import styles from './styles';

const CityWeatherScreen = withTheme(({ theme }) => {
  const { setOptions } = useNavigation<NavigationProp<HomeStack>>();
  const { params } = useRoute<RouteProp<HomeStack, 'CityWeather'>>();
  const { favoritesCities, toggleFavoritesCities } = useFavoritesCities();
  const favorite =
    favoritesCities.findIndex(
      (favoriteCity) => favoriteCity === params.cityName,
    ) !== -1;

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

  return (
    <SafeAreaView style={[styles.screen, { margin: theme.spacings.large }]}>
      <Title>{params.cityName}</Title>
    </SafeAreaView>
  );
});

export default CityWeatherScreen;
