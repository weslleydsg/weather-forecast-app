import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: { flex: 1 },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorTitle: { textAlign: 'center' },
});
