import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TextInput, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Divider,
  Title,
  withTheme,
} from 'react-native-paper';
import HeaderSearchBar from '~/components/HeaderSearchBar';
import useDebounce from '~/hooks/useDebounce';
import { GetCitiesAutocomplete } from '~/services/api/places';
import { HomeStack } from '~/types';
import { ErrorMessage } from '~/utils/constants';
import styles from './styles';

const PlacesAutocompleteScreen = withTheme(({ theme }) => {
  const { t, i18n } = useTranslation();
  const { setOptions, navigate } = useNavigation<NavigationProp<HomeStack>>();
  const searchBarRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState('');
  const [citiesAutocomplete, setCitiesAutocomplete] = useState<string[]>();
  const debouncedSearchText = useDebounce(searchText);
  const {
    isFetching,
    refetch: fetchCitiesAutocomplete,
    error,
  } = GetCitiesAutocomplete(debouncedSearchText);
  const ListEmptyComponent = (
    <View style={styles.flatListEmptyComponent}>
      <Title>
        {citiesAutocomplete && debouncedSearchText.length > 2
          ? t('userFeedback.screen.thereIsNoCityTerm')
          : t('userFeedback.screen.searchForCities')}
      </Title>
    </View>
  );

  function navigateToCityWeather(cityName: string) {
    navigate('CityWeatherForecast', { cityName });
  }

  const getCitiesAutocomplete = useCallback(async () => {
    if (debouncedSearchText.length < 3) return;
    const { data } = await fetchCitiesAutocomplete();
    const placesAutocomplete = data?.data?.predictions.map(
      ({ description }) => {
        return description;
      },
    );
    setCitiesAutocomplete(placesAutocomplete);
  }, [debouncedSearchText.length, fetchCitiesAutocomplete]);

  useLayoutEffect(() => {
    setOptions({
      headerTitle: () => (
        <HeaderSearchBar
          ref={searchBarRef}
          value={searchText}
          autoFocus
          onChangeText={setSearchText}
        />
      ),
    });
  }, [searchText, setOptions]);

  useEffect(() => {
    getCitiesAutocomplete();
  }, [i18n.language, getCitiesAutocomplete]);

  const keyExtractor = (_: string, index: number) => `${index}`;

  const renderSeparator = () => <Divider />;

  const renderItem = ({ item }: { item: string }) => {
    return (
      <Button
        icon="city"
        style={{ paddingVertical: theme.spacings.small }}
        contentStyle={[styles.buttonItemContent, { marginHorizontal: 16 }]}
        onPress={() => navigateToCityWeather(item)}
      >
        {item}
      </Button>
    );
  };

  if (isFetching) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator />
      </View>
    );
  }
  if (error) {
    if (error instanceof Error && error.message === ErrorMessage.network) {
      <View style={styles.screen}>
        <Title style={{ marginBottom: theme.spacings.large }}>
          {t('userFeedback.screen.networkErrorTitle')}
        </Title>
        <Button mode="outlined" onPress={getCitiesAutocomplete}>
          {t('common.button.tryAgain')}
        </Button>
      </View>;
    }
    return (
      <View style={styles.screen}>
        <Title style={{ marginBottom: theme.spacings.large }}>
          {t('userFeedback.screen.unexpectedErrorTitle')}
        </Title>
        <Button mode="outlined" onPress={getCitiesAutocomplete}>
          {t('common.button.tryAgain')}
        </Button>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.flatList}
      contentContainerStyle={styles.flatListContent}
      data={debouncedSearchText.length > 2 ? citiesAutocomplete : []}
      ListEmptyComponent={ListEmptyComponent}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderSeparator}
      renderItem={renderItem}
    />
  );
});

export default PlacesAutocompleteScreen;
