import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import React from 'react';
import { withTheme } from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabStacks } from '~/types';
import HomeStack from './home.routes';
import MyLocationStack from './my-location.routes';

const Tab = createMaterialBottomTabNavigator<BottomTabStacks>();

const BottomTabRoutes = withTheme(({ theme }) => {
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  const combinedTheme: Theme = {
    ...navigationTheme,
    ...theme,
    colors: {
      ...navigationTheme.colors,
      ...theme.colors,
    },
  };
  return (
    <NavigationContainer theme={combinedTheme}>
      <Tab.Navigator sceneAnimationEnabled>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Icons
                name="home-filled"
                color={color}
                size={theme.iconSizes.bottomTab}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MyLocationStack"
          component={MyLocationStack}
          options={{
            tabBarLabel: 'Minha Cidade',
            tabBarIcon: ({ color }) => (
              <Icons
                name="location-pin"
                color={color}
                size={theme.iconSizes.bottomTab}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
});

export default BottomTabRoutes;
