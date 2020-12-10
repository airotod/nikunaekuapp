import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet, SafeAreaView, LogBox } from 'react-native';
import {
  BLACK_COLOR,
  ORANGE_10_COLOR,
  GREY_60_COLOR,
  ORANGE_COLOR,
} from '../../models/colors';

import { LineChart, Path, XAxis, Grid } from 'react-native-svg-charts';
import firestore from '@react-native-firebase/firestore';

import { DATA } from './Data';
import * as scale from 'd3-scale';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const { height } = Dimensions.get('window');

export function CouponUseage(num, explain) {
  return (
    <>
      <View style={styles.useage}>
        <Text style={styles.CountText}>{num}</Text>
        <Text style={styles.explainText}>{explain}</Text>
      </View>
    </>
  );
}



class Area extends React.PureComponent {
  state = {
    data: [],
  };

  componentDidMount() {
    this.reorderData();
  }

  reorderData = () => {
    const reorderedData = DATA.sort((a, b) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.date) - new Date(b.date);
    });

    this.setState({
      data: reorderedData,
    });
  };

  render() {
    const { data } = this.state;
    const contentInset = { left: 10, right: 10, top: 10, bottom: 7 };
    const Shadow = ({ line }) => (
      <Path
        key={'shadow'}
        y={1}
        d={line}
        fill={'none'}
        strokeWidth={2}
        stroke={ORANGE_10_COLOR}
      />
    );

    return (
      <SafeAreaView style={styles.graph}>
        <View style={styles.container2}>
          {data.length !== 0 ? (
            <>
              <LineChart
                style={{ height: '100%' }}
                data={data}
                yAccessor={({ item }) => item.score}
                xAccessor={({ item }) => item.id}
                contentInset={contentInset}
                svg={{ stroke: ORANGE_10_COLOR }}
                yMin={0}>
                <Grid
                  svg={{ stroke: 'rgba(151, 151, 151, 0.09)' }}
                  belowChart={false}
                />
                <Shadow />
              </LineChart>

              <XAxis
                style={{ marginHorizontal: 10 }}
                data={data}
                scale={scale.scaleBand}
                formatLabel={(value, index) => {
                  if (index % 3 == 0) return value;
                  //returns the data for the odd indexes
                  else return ''; //returns an empty string for the even indexes
                }}
                labelStyle={{ color: 'black' }}
              />
            </>
          ) : (
            <View
              style={{
                height: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#ccc',
                }}></Text>
            </View>
          )}
          <Text style={styles.heading}>시간대별 사용량</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const CouponLogRecord = ({ route, navigation }) => {

  const {brandId, storeId} = route.params;
  const [todayCoupon, setToday] = useState([])
  const [yesterCoupon, setYester] = useState([])
  const [monthCoupon, setMonth] = useState([])
  const [yearCoupon, setYear] = useState([])
  const storeRef = firestore()
    .collection('Brand')
    .doc(brandId)
    .collection('Stores')
    .doc(storeId);

  useEffect(() => {
    return storeRef.collection('clientLog').onSnapshot((querySnapshot) => {
      let today_items = [];
      let yesterday_items = [];
      let month_items = [];
      let year_items = [];

      var today_first = new Date();
      var today_last = new Date();
      var yesterday_first = new Date();

      var month_first = new Date();
      month_first.setDate(0);
      month_first.setHours(24,0,0,0);


      var temp_month_last = new Date();
      temp_month_last.setMonth(0)
      temp_month_last.setDate(0);
      temp_month_last.setHours(24,0,0,0);
      var year = temp_month_last.getFullYear();
      var month = temp_month_last.getMonth();
      var day = temp_month_last.getDate();
      var month_last = new Date(year + 1, month, day);

      today_first.setHours(0,0,0,0)
      yesterday_first.setHours(0,0,0,0)
      today_last.setHours(24,0,0,0)
      yesterday_first.setDate(yesterday_first.getDate() - 1);

      var now_year = new Date(new Date().getFullYear(), 1, -29);
      var next_year = new Date(new Date().getFullYear()+1, 1, -29);

      querySnapshot.forEach((doc) => {
        const {
          count,
          dateTime,
          logType
        } = doc.data();

        if(logType == "사용") {
          if(today_first < dateTime.toDate() && today_last > dateTime.toDate()) {
            today_items.push({
              count : count,
              dateTime : dateTime
            });
          }
          if(yesterday_first < dateTime.toDate() && today_first > dateTime.toDate()) {
            yesterday_items.push({
              count : count,
              dateTime : dateTime
            });
          }
          if(month_first < dateTime.toDate() && month_last > dateTime.toDate()) {
            month_items.push({
              count : count,
              dateTime : dateTime
            });
          }
          if(now_year < dateTime.toDate() && next_year > dateTime.toDate()) {
            year_items.push({
              count : count,
              dateTime : dateTime
            });
          }
        }
      });
      setToday(today_items)
      setYester(yesterday_items)
      setMonth(month_items)
      setYear(year_items)
      //console.log("list : ", today_items)
      //setWholeItemList(sortByDate(items));
    });
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.todayCoupon}>
          <Text style={styles.todayText}>오늘</Text>
          <Text style={styles.todayCountText}>{todayCoupon.length}</Text>
        </View>
        <View style={styles.usageFlex}>
          {CouponUseage(yesterCoupon.length, '전날 사용량')}
          {CouponUseage(monthCoupon.length, '월 사용량')}
          {CouponUseage(yearCoupon.length, '년 사용량')}
        </View>
      </View>
      <Area />
      <View style={{ flex: 0.5 }} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container2: {
    height: height / 2,
    flex: 1,
  },
  heading: {
    fontSize: 15,
    textAlign: 'center',
  },
  mainText: {
    color: BLACK_COLOR,
  },
  todayCoupon: {
    flex: 0.6,
    alignItems: 'center',
  },
  usageFlex: {
    flex: 0.6,
    flexDirection: 'row',
  },
  useage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
  },
  todayText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 8,
    color: GREY_60_COLOR,
  },
  todayCountText: {
    fontSize: 50,
    color: ORANGE_COLOR,
  },
  CountText: {
    fontSize: 24,
    marginBottom: 12,
  },
  explainText: {
    fontSize: 13,
    color: GREY_60_COLOR,
  },
  graph: {
    flex: 0.8,
  },
});

export default CouponLogRecord;
