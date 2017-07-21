import {
  StyleSheet,
  Dimensions
} from 'react-native';
const {scale, width} = Dimensions.get('window');

export default StyleSheet.create({
  month: {
    height:346,
  },
  monthTitle: {
    height:40,
    justifyContent: 'center',
    paddingHorizontal: 16,
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
  },
  dayRowExpand: {
    height:80,
    backgroundColor:'#f5f5f5',
    flexDirection: 'row',
  },
  days:{
    flex:1
  },
  weekText : {
  flex: 1,
  fontSize:12,
  color: '#4d4d4d',
  textAlign:'center',
},
weekTextWeekend: {
  color: '#a0a0a0'
},
weekbar: {
  height:16,
  marginVertical:20,
  flexDirection: 'row',
},

});
