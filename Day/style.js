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
    overflow: 'hidden',
    alignItems:'center',
  },
  bubble: {
    borderRadius: 16,
    height: 32,
    width: 32,
    justifyContent: 'center',
    paddingTop: 0,
    overflow: 'hidden',
  },
  bubbleExpanded: {
    width: dayWidth,
    flex: 1,
    borderRadius: 8,
    paddingTop : 4,
    overflow: 'hidden',
  },
  startPart :{
    borderRightWidth: 0,
    width: dayWidth,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  endPart :{
    borderLeftWidth: 0,
    width: dayWidth,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius : 0,
  },
  noRadius :{
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: dayWidth,
    borderRadius: 0,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
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
