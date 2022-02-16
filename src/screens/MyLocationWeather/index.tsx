import React from 'react';
import { SafeAreaView } from 'react-native';
import { Title, withTheme } from 'react-native-paper';
import styles from './styles';

const MyLocationWeatherScreen = withTheme(({ theme }) => {
  return (
    <SafeAreaView style={[styles.screen, { margin: theme.spacings.large }]}>
      <Title>Minha Cidade</Title>
    </SafeAreaView>
  );
});

export default MyLocationWeatherScreen;
