import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, FlatList, SafeAreaView, TextInput, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Divider,
  Title,
  withTheme,
} from 'react-native-paper';
import HeaderSearchBar from '~/components/HeaderSearchBar';
import environment from '~/config/environment';
import useDebounce from '~/hooks/useDebounce';
import useMutation from '~/hooks/useMutation';
import { HomeStack, PlacesAutocomplete } from '~/types';
import { ErrorMessage, UserFeedback } from '~/utils/constants';
import styles from './styles';

const PlacesAutocompleteScreen = withTheme(({ theme }) => {
  const { setOptions, navigate } = useNavigation<NavigationProp<HomeStack>>();
  const { isLoading, mutateAsync: getCitiesAutocomplete } =
    useMutation<PlacesAutocomplete>('cities-autocomplete', 'placesApi', 'get', {
      url: `place/autocomplete/json?language=pt_BR&types=%28cities%29&key=${environment.placesApiKey}`,
    });
  const searchBarRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState('');
  const [citiesAutocomplete, setCitiesAutocomplete] = useState<string[]>();
  const debouncedSearchText = useDebounce(searchText);
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
    navigate('CityWeather', { cityName });
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

    async function getCitiesAutocompleteByText() {
      try {
        const { data } = await getCitiesAutocomplete({
          data: undefined,
          url: `&input=${debouncedSearchText}`,
        });
        const placesAutocomplete = data.predictions.map(({ description }) => {
          return description;
        });
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
                  onPress: getCitiesAutocompleteByText,
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
              onPress: getCitiesAutocompleteByText,
            },
          ],
        );
      }
    }

    getCitiesAutocompleteByText();
  }, [getCitiesAutocomplete, debouncedSearchText]);

  const keyExtractor = (_: string, index: number) => `${index}`;

  const renderSeparator = () => <Divider />;

  const renderItem = ({ item }: { item: string }) => {
    return (
      <Button
        icon="city"
        style={{ paddingVertical: theme.spacings.small }}
        contentStyle={styles.buttonItemContent}
        onPress={() => navigateToCityWeather(item)}
      >
        {item}
      </Button>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.screen, { margin: theme.spacings.large }]}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.screen, { margin: theme.spacings.large }]}>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        data={citiesAutocomplete}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
});

export default PlacesAutocompleteScreen;
