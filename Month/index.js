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
      color
    } = this.props;
    this._getDayList = this._getDayList.bind(this);
    this._renderDayRow = this._renderDayRow.bind(this);
    this._getMonthText = this._getMonthText.bind(this);
    this.subColor = {color: color.subColor};
    this.titleText = this._getMonthText();
    this.dayList = this._getDayList(month.clone());
    this.rowArray = new Array(this.dayList.length / 7).fill('');
    this.state ={titleText: this.titleText, month: month, dayList: this.dayList, rowArray: this.rowArray};

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
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
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
    console.log(date.week())
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
  _renderDayRow (dayList, index) {
    const {
      startDate,
      endDate,
      today,
      chooseday,
      month,
    } = this.props;
    var rowstyle = styles.dayRow;
    if(chooseday && chooseday.year() == month.year()){
      if(dayList[0].empty && dayList[0].empty.week() == chooseday.week()){
        rowstyle = styles.dayRowExpand;
      }else if(dayList[0].date && dayList[0].date.week() == chooseday.week()){
        rowstyle = styles.dayRowExpand;
      }
    }
    return (
      <View style={rowstyle} key={'row' + index}>
        {dayList.map((item, i) =>
          <Day
            date={item.date}
            empty={item.empty}
            {...this.props}
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
    console.log('CAL: MONTH:',+this.state.month.format('YYYYMM'));

    return (
      <View style={styles.month}>
        <View style={styles.monthTitle}>
          <Text style={[styles.monthTitleText, this.subColor]}>{this.state.titleText}</Text>
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
