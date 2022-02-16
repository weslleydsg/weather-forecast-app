import { DefaultTheme } from 'react-native-paper';
import { iconSizes } from '~/styles/icon-size';
import { spacings } from '~/styles/spacings';

export const defaultTheme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6932A8',
    accent: '#AC46A1',
  },
  spacings,
  iconSizes,
};
