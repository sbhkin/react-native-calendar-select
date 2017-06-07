import {
  StyleSheet,
  Dimensions
} from 'react-native';
const {scale, width} = Dimensions.get('window');

export default StyleSheet.create({
  month: {
    height: 304,
  },
  monthTitle: {
    paddingHorizontal: 20
  },
  monthTitleText: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '300'
  },
  dayRow: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 5
  }
});
