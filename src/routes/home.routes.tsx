import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CityWeatherForecast from '~/screens/CityWeatherForecast';
import FavoritesCities from '~/screens/FavoritesCities';
import PlacesAutocomplete from '~/screens/PlacesAutocomplete';
import { HomeStack } from '~/types';

const Stack = createNativeStackNavigator<HomeStack>();

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoritesCities" component={FavoritesCities} />
      <Stack.Screen name="PlacesAutocomplete" component={PlacesAutocomplete} />
      <Stack.Screen
        name="CityWeatherForecast"
        component={CityWeatherForecast}
      />
    </Stack.Navigator>
  );
}

export default StackScreen;
