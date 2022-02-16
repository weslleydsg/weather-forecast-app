import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabRoutes from './bottom-tab.routes';

function Routes() {
  return (
    <SafeAreaProvider style={{ position: 'relative' }}>
      <TabRoutes />
    </SafeAreaProvider>
  );
}

export default Routes;
