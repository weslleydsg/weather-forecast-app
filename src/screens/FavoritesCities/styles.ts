import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyFavorites: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: { textAlign: 'center' },
  favoriteIcon: { alignSelf: 'center' },
  row: { flexDirection: 'row' },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between' },
});
