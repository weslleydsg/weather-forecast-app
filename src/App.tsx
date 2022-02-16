import React from 'react';
import { Platform, SafeAreaView, StatusBar, Text } from 'react-native';
import { displayName } from '~/../app.json';
import useIsDarkMode from '~/hooks/useIsDarkMode';

function App() {
  const isDarkMode = useIsDarkMode();
  StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    StatusBar.setBackgroundColor(isDarkMode ? 'gray' : 'white');
  }
  return (
    <SafeAreaView>
      <Text style={[{ color: isDarkMode ? 'white' : 'black' }]}>
        {displayName}
      </Text>
    </SafeAreaView>
  );
}

export default App;
