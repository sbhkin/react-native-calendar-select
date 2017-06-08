import {
  StyleSheet,
  Dimensions
} from 'react-native';
const {scale, width} = Dimensions.get('window');
let dayWidth = width / 7;
let mod = scale * width % 7;
if (mod) {
  dayWidth = ((7 - mod) / scale + width) / 7;
}
export default StyleSheet.create({
  dayContainer: {
    width: dayWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startContainer: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100
  },
  endContainer: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100
  },
  today: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.40)'
  },
  day: {
    flex:1,
    width: dayWidth,
    borderRadius: 8,
    overflow: 'hidden',
    paddingVertical: 4,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center'
  },
  dayTextDisabled: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.54)',
    textAlign: 'center'
  },
  eventsContainer:{
    paddingTop: 4,
    flex: 1,
  },
  eventsTextFocus:{
    color: 'white'
  },
  eventText: {
    color: '#4d4d4d',
    fontSize: 8,
    fontWeight: '100',
  }
});
