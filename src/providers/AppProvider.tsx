import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClientProvider } from 'react-query';
import { FavoritesCitiesProvider } from '~/contexts/useFavoritesCities';
import { SettingsProvider } from '~/contexts/useSettings';
import useIsDarkMode from '~/hooks/useIsDarkMode';
import { queryClient } from '~/services/queryClient';
import { darkTheme, defaultTheme } from '~/styles';

interface Props {
  children: React.ReactNode;
}

function AppProvider({ children }: Props) {
  const isDarkMode = useIsDarkMode();
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={isDarkMode ? darkTheme : defaultTheme}>
        <SettingsProvider>
          <FavoritesCitiesProvider>{children}</FavoritesCitiesProvider>
        </SettingsProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default AppProvider;
