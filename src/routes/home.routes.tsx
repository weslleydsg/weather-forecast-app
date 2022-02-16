import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SavedCities from '~/screens/SavedCities';
import { HomeStack } from '~/types';

const Stack = createNativeStackNavigator<HomeStack>();

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SavedCities"
        component={SavedCities}
        options={{ headerTitle: 'Minhas Cidades' }}
      />
    </Stack.Navigator>
  );
}

export default StackScreen;
