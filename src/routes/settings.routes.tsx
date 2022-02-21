import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Settings from '~/screens/Settings';
import { SettingsStack } from '~/types';

const Stack = createNativeStackNavigator<SettingsStack>();

function StackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export default StackScreen;
