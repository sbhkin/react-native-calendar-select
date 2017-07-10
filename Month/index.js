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
import Day from '../Day';


export default class Month extends Component {
  constructor (props) {
    super(props);
    const {
      month,
      today,
      color,
      events,
      chooseday,
    } = this.props;
    this._getDayList = this._getDayList.bind(this);
    this._renderDayRow = this._renderDayRow.bind(this);
    this._getMonthText = this._getMonthText.bind(this);
    this._mapEvents = this._mapEvents.bind(this);
    this.subColor = {color: color.subColor};
    this.titleText = this._getMonthText();
    this.dayList = this._mapEvents(this._getDayList(month.clone()), events);
    this.rowArray = new Array(this.dayList.length / 7).fill('');
    this.state ={titleText: this.titleText, month: month, dayList: this.dayList, rowArray: this.rowArray,chooseday: today};

  }
  static I18N_MAP = {
    'zh': [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    'jp': [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    'en': [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
  }

  _onChooseDay(day, event){
    this.props.onChooseDay(day, event)
    this.setState({
      chooseday: day
    })
  }

  _getMonthText () {
    const {
      month,
      today,
      i18n
    } = this.props;
    let y = month.year();
    let m = month.month();
    let year = today.year();
    if (year === y) {
      return Month.I18N_MAP[i18n][m];
    } else {
      if (i18n === 'en') {
        return `${Month.I18N_MAP[i18n][m]}, ${y}`;
      }
      return month.format('YYYY年M月');
    }
  }
  _getDayList (date) {
    let dayList;
    let month = date.month();
    let weekday = date.isoWeekday();
    if (weekday === 7) {
      dayList = [];
    } else {
      dayList = new Array(weekday).fill({
        empty: date.clone().subtract(1, 'h')
      });
    }
    while (date.month() === month) {
      dayList.push({
        date: date.clone()
      });
      date.add(1, 'days');
      // console.log(date.isoWeekday()+','+date.month()+","+date.date());
    }
    date.subtract(1, 'days');
    weekday = date.isoWeekday();
    if (weekday === 7) {
      return dayList.concat(new Array(6).fill({
        empty: date.clone().hour(1)
      }));
    }
    return dayList.concat(new Array(Math.abs(weekday - 6)).fill({
      empty: date.clone().hour(1)
    }));
  }

  _mapEvents(dayList, eventlist) {
    dayList =  dayList.map((item,index) =>
    {
      var  event = null;
      if(eventlist != null && item.date !=null) {
        // let thedate = item.date.format('X')
        let dayStartStr = item.date.format('X')
        let theedate = item.date.clone().add(1,'d')
        let dayEndStr = theedate.format('X')
        //Check inBetween
        event = eventlist.filtered('startDate <= '+dayStartStr+' && '+dayStartStr+' <= endDate || startDate >='+dayStartStr+' && startDate <= '+dayEndStr)
        // //Check isEnd
        // event =
        // event = eventlist.find((ev) =>{ return ev.startDate.isSame(item.date,'day') || ev.endDate.isSame(item.date,'day')});
      }

      return(
        {
          date: item.date,
          empty: item.empty,
          event : event
        }
      )
    });
    return dayList;
  }

  _renderDayRow (dayList, index) {
    const {
      startDate,
      endDate,
      today,
      month,
    } = this.props;
    var rowstyle = styles.dayRow;
    var isExpand = false;
    if(this.state.chooseday && this.state.chooseday.year() == month.year()){
      if(dayList[0].empty && dayList[0].empty.week() == this.state.chooseday.week()){
        rowstyle = styles.dayRowExpand;
        isExpand = true;
      }else if(dayList[0].date && dayList[0].date.week() == this.state.chooseday.week()){
        rowstyle = styles.dayRowExpand;
        isExpand = true;
      }
    }
    return (
      <View style={rowstyle} key={'row' + index}>
        {dayList.map((item, i) =>
          <Day
            isExpand={isExpand}
            event={item.event}
            date={item.date}
            empty={item.empty}
            onChoose = {this._onChooseDay.bind(this)}
            {...this.props}
            chooseday = {this.state.chooseday}
            key={'day' + i}/>
        )}
      </View>
    );
  }

  componentWillReceiveProps(nextProps){
    // const {
    //   month,
    //   today,
    //   color,
    //   key,
    // } = nextProps;
    // if(nextProps.month != this.props.month) {
    //   this.subColor = {color: color.subColor};
    //   this.titleText = this._getMonthText();
    //   this.dayList = this._getDayList(month.clone());
    //   this.rowArray = new Array(this.dayList.length / 7).fill('');
    //   this.setState({titleText: this.titleText, month: month, dayList: this.dayList, rowArray: this.rowArray});
    // }

  }
  render () {
    return (
      <View style={styles.month}>
        <View style={styles.monthTitle}>
          <Text style={[styles.monthTitleText, this.subColor]}>{this.state.titleText}</Text>
        </View>
        <View style={styles.weekbar}>
          <Text style={[styles.weekText,styles.weekTextWeekend]}>S</Text>
          <Text style={styles.weekText}>M</Text>
          <Text style={styles.weekText}>T</Text>
          <Text style={styles.weekText}>W</Text>
          <Text style={styles.weekText}>T</Text>
          <Text style={styles.weekText}>F</Text>
          <Text style={[styles.weekText,styles.weekTextWeekend]}>S</Text>
        </View>
        <View style={styles.days}>
          {this.state.rowArray.map((item, i) =>
            this._renderDayRow(this.state.dayList.slice(i * 7, i * 7 + 7), i)
          )}
        </View>
      </View>
    );
  }
}
