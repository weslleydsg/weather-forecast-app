import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput, View } from 'react-native';
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
import { ErrorMessage, UserFeedback } from '~/utils/constants';
import styles from './styles';

const PlacesAutocompleteScreen = withTheme(({ theme }) => {
  const { setOptions, navigate } = useNavigation<NavigationProp<HomeStack>>();
  const searchBarRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState('');
  const [citiesAutocomplete, setCitiesAutocomplete] = useState<string[]>();
  const debouncedSearchText = useDebounce(searchText);
  const { isFetching, refetch: fetchCitiesAutocomplete } =
    GetCitiesAutocomplete(debouncedSearchText);
  const ListEmptyComponent = (
    <View style={styles.flatListEmptyComponent}>
      <Title>
        {citiesAutocomplete && debouncedSearchText.length > 2
          ? 'Não há cidades para esse termo.'
          : 'Pesquise por cidades.'}
      </Title>
    </View>
  );

  function navigateToCityWeather(cityName: string) {
    navigate('CityWeatherForecast', { cityName });
  }

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
    if (debouncedSearchText.length < 3) return;

    async function getCitiesAutocomplete() {
      try {
        const { data } = await fetchCitiesAutocomplete();
        const placesAutocomplete = data?.data?.predictions.map(
          ({ description }) => {
            return description;
          },
        );
        setCitiesAutocomplete(placesAutocomplete);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === ErrorMessage.network) {
            Alert.alert(
              UserFeedback.error.networkTitle,
              UserFeedback.error.networkMessage,
              [
                {
                  text: 'Cancelar',
                  style: 'cancel',
                },
                {
                  text: 'Tentar novamente',
                  onPress: getCitiesAutocomplete,
                },
              ],
            );
            return;
          }
        }
        Alert.alert(
          UserFeedback.error.networkTitle,
          UserFeedback.error.networkMessage,
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Tentar novamente',
              onPress: getCitiesAutocomplete,
            },
          ],
        );
      }
    }

    getCitiesAutocomplete();
  }, [fetchCitiesAutocomplete, debouncedSearchText]);

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
      <View style={styles.loading}>
        <ActivityIndicator />
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
