import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MyLocationStack } from '~/types';
import MyLocationWeather from '~/screens/MyLocationWeather';

const Stack = createNativeStackNavigator<MyLocationStack>();

function StackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyLocationWeather" component={MyLocationWeather} />
    </Stack.Navigator>
  );
}

export default StackScreen;
