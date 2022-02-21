import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, TextInput, View } from 'react-native';
import {
  Card,
  IconButton,
  Paragraph,
  Subheading,
  Title,
  withTheme,
} from 'react-native-paper';
import HeaderSearchBar from '~/components/HeaderSearchBar';
import { useFavoritesCities } from '~/contexts/useFavoritesCities';
import { HomeStack } from '~/types';
import styles from './styles';

const FavoritesCitiesScreen = withTheme(({ theme }) => {
  const { t } = useTranslation();
  const { setOptions, navigate } = useNavigation<NavigationProp<HomeStack>>();
  const { isLoading, favoritesCities, toggleFavoritesCities } =
    useFavoritesCities();
  const searchBarRef = useRef<TextInput>(null);

  function navigateToCityWeather(cityName: string) {
    navigate('CityWeatherForecast', { cityName });
  }

  const navigateToPlacesAutoComplete = useCallback(() => {
    searchBarRef.current?.blur();
    navigate('PlacesAutocomplete');
  }, [navigate]);

  useLayoutEffect(() => {
    setOptions({
      headerTitle: () => (
        <HeaderSearchBar
          ref={searchBarRef}
          onFocus={navigateToPlacesAutoComplete}
        />
      ),
    });
  }, [navigateToPlacesAutoComplete, setOptions]);

  const keyExtractor = (cityName: string) => `${cityName}`;

  const renderItem = ({ item }: { item: string }) => {
    const [city, stateOrCountry, country] = item.split(', ');
    return (
      <Card
        style={{ marginTop: theme.spacings.large }}
        onPress={() => navigateToCityWeather(item)}
      >
        <Card.Content style={styles.cardContent}>
          <View style={styles.row}>
            <IconButton
              style={styles.favoriteIcon}
              icon="heart"
              size={34}
              color={theme.colors.accent}
              onPress={() => toggleFavoritesCities(item)}
            />
            <View>
              <Title>{city}</Title>
              <Paragraph>{country || stateOrCountry}</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.loading, { padding: theme.spacings.large }]}>
        <ActivityIndicator />
      </View>
    );
  }
  if (favoritesCities.length === 0) {
    return (
      <View style={[styles.emptyFavorites, { padding: theme.spacings.large }]}>
        <Title style={styles.message}>
          {t('userFeedback.screen.noFavoritesCitiesTitle')}
        </Title>
        <Subheading style={styles.message}>
          {t('userFeedback.screen.noFavoritesCitiesSubtitle')}
        </Subheading>
      </View>
    );
  }
  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: theme.spacings.large,
        paddingBottom: theme.spacings.large,
      }}
      data={favoritesCities}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
});

export default FavoritesCitiesScreen;
