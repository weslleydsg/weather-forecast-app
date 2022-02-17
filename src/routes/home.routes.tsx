import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CityWeather from '~/screens/CityWeather';
import PlacesAutocomplete from '~/screens/PlacesAutocomplete';
import SavedCities from '~/screens/SavedCities';
import { HomeStack } from '~/types';

const Stack = createNativeStackNavigator<HomeStack>();

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SavedCities" component={SavedCities} />
      <Stack.Screen name="PlacesAutocomplete" component={PlacesAutocomplete} />
      <Stack.Screen name="CityWeather" component={CityWeather} />
    </Stack.Navigator>
  );
}

export default StackScreen;
