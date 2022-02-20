import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, AppState, Linking } from 'react-native';
import RNLocation from 'react-native-location';
import {
  ActivityIndicator,
  Button,
  Headline,
  withTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeatherForecastByCoord from '~/components/WeatherForecastByCoord';
import { Coord } from '~/types';
import styles from './styles';

const MyLocationWeatherScreen = withTheme(({ theme }) => {
  const [coord, setCoord] = useState<Coord>();
  const [isNotGranted, setIsNotGranted] = useState(false);
  const isRequestingLocationRef = useRef(false);

  const showAlertError = useCallback((retryCallback: () => unknown) => {
    Alert.alert(
      'Erro ao buscar sua localização',
      'Não foi possível encontrar sua localização.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Tentar novamente',
          onPress: () => {
            isRequestingLocationRef.current = true;
            retryCallback();
          },
        },
      ],
    );
  }, []);

  const getLatestLocation = useCallback(async () => {
    try {
      const result = await RNLocation.getLatestLocation({
        timeout: 10000,
      });
      if (!result) {
        showAlertError(getLatestLocation);
        return;
      }
      setIsNotGranted(false);
      setCoord({ lat: result.latitude, lon: result.longitude });
    } catch (error) {
      showAlertError(getLatestLocation);
    }
  }, [showAlertError]);

  const requestPermissionAndLocation = useCallback(async () => {
    try {
      const granted = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      });
      if (!granted) {
        setIsNotGranted(true);
        return;
      }
      getLatestLocation();
    } catch (error) {
      showAlertError(getLatestLocation);
    }
  }, [getLatestLocation, showAlertError]);

  const requestLocation = useCallback(async () => {
    isRequestingLocationRef.current = true;
    try {
      const granted = await RNLocation.checkPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      });
      if (granted) {
        await getLatestLocation();
      } else {
        await requestPermissionAndLocation();
      }
    } catch (error) {
      showAlertError(requestLocation);
    } finally {
      isRequestingLocationRef.current = false;
    }
  }, [getLatestLocation, requestPermissionAndLocation, showAlertError]);

  useEffect(() => {
    requestLocation();

    const subscription = AppState.addEventListener('change', (state) => {
      if (state !== 'active' || isRequestingLocationRef.current) return;
      requestLocation();
    });

    return subscription?.remove;
  }, [requestLocation]);

  if (isNotGranted) {
    return (
      <SafeAreaView
        style={[styles.errorView, { margin: theme.spacings.large }]}
      >
        <Headline
          style={[styles.errorTitle, { marginBottom: theme.spacings.large }]}
        >
          É necessário aceitar a permissão de localização.
        </Headline>
        <Button mode="outlined" onPress={Linking.openSettings}>
          Toque aqui para aceitar a permissão
        </Button>
      </SafeAreaView>
    );
  }
  if (!coord) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <WeatherForecastByCoord coord={coord} />
    </SafeAreaView>
  );
});

export default MyLocationWeatherScreen;
