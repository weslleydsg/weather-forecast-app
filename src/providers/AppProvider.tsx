import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClientProvider } from 'react-query';
import { FavoritesCitiesProvider } from '~/hooks/useFavoritesCities';
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
        <FavoritesCitiesProvider>{children}</FavoritesCitiesProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default AppProvider;
