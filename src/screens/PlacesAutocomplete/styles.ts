import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: { width: '100%' },
  flatListContent: { flexGrow: 1 },
  buttonItemContent: { justifyContent: 'flex-start' },
  flatListEmptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
