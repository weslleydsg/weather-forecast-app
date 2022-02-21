import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  row: { flexDirection: 'row' },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between' },
  iconText: { flexDirection: 'row', alignItems: 'center' },
  cardTempView: { flexDirection: 'row', alignItems: 'center' },
});
