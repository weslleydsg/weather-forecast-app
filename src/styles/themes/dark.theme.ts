import { DarkTheme } from 'react-native-paper';
import { iconSizes } from '~/styles/icon-size';
import { spacings } from '~/styles/spacings';

export const darkTheme: ReactNativePaper.Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#6932A8',
    accent: '#973AA8',
  },
  spacings,
  iconSizes,
};
