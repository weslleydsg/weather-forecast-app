import React, { Suspense } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import useIsDarkMode from '~/hooks/useIsDarkMode';
import AppProvider from '~/providers/AppProvider';
import Routes from '~/routes';
import '~/services/i18n';

function App() {
  const isDarkMode = useIsDarkMode();
  StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    StatusBar.setBackgroundColor(isDarkMode ? 'gray' : 'white');
  }
  return (
    <Suspense
      fallback={
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
      }
    >
      <AppProvider>
        <Routes />
      </AppProvider>
    </Suspense>
  );
}

export default App;
