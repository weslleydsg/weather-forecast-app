import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { SafeAreaView, TextInput } from 'react-native';
import { Title, withTheme } from 'react-native-paper';
import HeaderSearchBar from '~/components/HeaderSearchBar';
import { HomeStack } from '~/types';
import styles from './styles';

const SavedCitiesScreen = withTheme(({ theme }) => {
  const { setOptions, navigate } = useNavigation<NavigationProp<HomeStack>>();
  const searchBarRef = useRef<TextInput>(null);

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

  return (
    <SafeAreaView style={[styles.screen, { margin: theme.spacings.large }]}>
      <Title>Minhas Cidades</Title>
    </SafeAreaView>
  );
});

export default SavedCitiesScreen;
