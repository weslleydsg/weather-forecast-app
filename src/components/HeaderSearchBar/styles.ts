import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { width: 360, maxWidth: '80%' },
  searchBar: { height: Platform.OS === 'ios' ? 36 : 42, elevation: 2 },
});
