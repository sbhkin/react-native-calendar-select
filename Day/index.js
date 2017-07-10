/**
 * Created by TinySymphony on 2017-05-11.
 */

import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Moment from 'moment';
import styles from './style';

export default class Day extends Component {
  static propTypes = {
    onChoose: PropTypes.func
  }
  constructor (props) {
    super(props);
    this._chooseDay = this._chooseDay.bind(this);
    this._statusCheck = this._statusCheck.bind(this);
    this._statusCheck();
  }
  _chooseDay () {
    if(this.props.date)
      this.props.onChoose && this.props.onChoose(this.props.date, this.props.event);
  }
  _statusCheck (props) {
    const {
      chooseday,
      startDate,
      endDate,
      today,
      date = null,
      minDate,
      maxDate,
      empty,
      event,
      isExpand,
    } = props || this.props;
    this.isToday = today.isSame(date, 'd');
    this.isWeekend = date && date.isoWeekday() > 5;
    this.isFocus = chooseday.isSame(date);

    this.hasEvent = event &&  event.length > 0;
    this.isExpand = isExpand;
    // this.isValid = date &&
    //   (date >= minDate || date.isSame(minDate, 'd')) &&
    //   (date <= maxDate || date.isSame(maxDate, 'd'));
    this.isValid = true;
    this.isMid = date > startDate && date < endDate ||
      (!date && empty >= startDate && empty <= endDate);
    this.events = []
    // this.isStart = date && date.isSame(startDate, 'd');
    // this.isStartPart = this.isStart && endDate;
    if(event){
      for(var i=0 ; i<event.length; i++){
        let e = event[i]
        var isSameEventDay = false;
        if(date == null){ return;}
        let sd = Moment.unix(e.startDate)
        let ed = Moment.unix(e.endDate)
        // console.log(sd.format('YYYYMMDD'))
        // console.log(date.format('YYYYMMDD'))
        // console.log(ed.format('YYYYMMDD'))
        if(sd.isSame(ed,'d')){
          isSameEventDay = true;
         }else if(date.isBetween(sd,ed,'d', '()')){
          this.isInside = true;
        }else if(sd.isSame(date,'d')){
          this.isStart = true;
          this.isStartPart = true;
          isSameEventDay = true;
        }else if(ed.isSame(date,'d')){
          this.isEnd = true;
        }
        // let sdStr = isSameEventDay ? sd.format('hh:mm') : sd.format('DD/M')
        this.events.push(<View key={e._id} style={{paddingVertical:5, paddingHorizontal:5, height:12}}><Text numberOfLines={1} ellipsizeMode='tail' style={[{fontSize:10, color:'#4d4d4d', height:12},this.isFocus && {color: '#fff'}]}>{e.name}</Text></View>)
    }
      // console.log(date.format('YYYYMMDD'))
      // console.log(this.isStartPart)
      // console.log(this.isEnd)

    }
    // this.isEnd = date && date.isSame(endDate, 'd');
    // this.isFocus = this.isMid || this.isStart || this.isEnd;
    return this.isFocus;
  }
  shouldComponentUpdate (nextProps) {
    let prevStatus = this.isFocus;
    let nextStatus = this._statusCheck(nextProps);
    if (prevStatus || nextStatus) return true;
    return true;
  }
  render () {
    const {
      date,
      color
    } = this.props;
    let text = date ? date.date() : '';
    let mainColor = {color: color.mainColor};
    let subColor = {color: color.subColor};
    let weekendColor = {color : color.weekendColor};
    let mainBack = {backgroundColor: color.mainColor};
    let subBack = {backgroundColor: color.subColor};
    let todayColor = {color: color.todayColor};
    let focusDayColor = {color: '#FFF'};
    let eventColor = {backgroundColor: '#ccc'};
    return (
      <View
        style={[
          styles.dayContainer,
          // this.isMid && subBack,
          // this.isStartPart && styles.startContainer,
          // this.isEnd && styles.endContainer,
          // (this.isStartPart || this.isEnd) && subBack
        ]}>
        {this.isValid ?
          <TouchableHighlight
            style={styles.day}
            underlayColor="rgba(255, 255, 255, 0.35)"
            onPress={this._chooseDay}>
            <View style={[this.isExpand == true ? styles.bubbleExpanded : styles.bubble, this.hasEvent && eventColor, this.isStartPart && styles.startPart, this.isEnd && styles.endPart, this.isInside && styles.noRadius, this.isFocus && subBack]}>
              <View style={{height: 32, alignItems:'center', justifyContent:'center'}}>
                <Text style={[styles.dayText, mainColor,this.isWeekend && weekendColor, this.isFocus && focusDayColor, this.isToday && todayColor]}>{text}</Text>
              </View>
              <View style={{flex: 1}}>
                {this.events}
              </View>
            </View>
          </TouchableHighlight> :
          <View style={[styles.day, this.isToday && styles.today]}>
          </View>
        }
      </View>
    );
  }
}
