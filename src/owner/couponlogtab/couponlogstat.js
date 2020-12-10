import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  BLACK_COLOR,
  ORANGE_10_COLOR,
  GREY_10_COLOR,
  GREY_60_COLOR,
  ORANGE_COLOR,
  WHITE_COLOR,
} from '../../models/colors';

import { LineChart, Path, XAxis, Grid } from 'react-native-svg-charts';

import { LogBox } from 'react-native';
import { DATA } from './Data';
import * as scale from 'd3-scale';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const { height } = Dimensions.get('window');

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
      <SafeAreaView style={styles.hourGraph}>
        <View style={styles.container2}>
          {data.length !== 0 ? (
            <>
              <LineChart
                style={{ height: '70%' }}
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

const CouponLogStat = ({ route, navigation }) => {
  const data = [20, 18, 40, 33, 0, 0, 0];
  return (
    <>
      <View style={styles.container}>
        <View style={styles.graphContainer}>
          <View style={styles.graphSubcontainer}>
            {data.map((item) => (
              <TouchableOpacity
                style={[styles.graph, { height: item * 2 }]}></TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>23</Text>
          <Text style={styles.dateText}>24</Text>
          <Text style={styles.dateText}>25</Text>
          <Text style={styles.dateText}>26</Text>
          <Text style={styles.dateText}>27</Text>
          <Text style={styles.dateText}>28</Text>
          <Text style={styles.dateText}>29</Text>
        </View>
        <View style={styles.todayCoupon}>
          <Text style={styles.todayText}>2020년 9월 26일 (토)</Text>
          <Text style={styles.todayCountText}>12</Text>
        </View>
      </View>
      <Area />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
  },
  mainText: {
    color: BLACK_COLOR,
  },
  todayCoupon: {
    flex: 0.6,
    alignItems: 'center',
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
    color: BLACK_COLOR,
  },
  graphContainer: {
    height: 150,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  graphSubcontainer: {
    paddingHorizontal: 23,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  graph: {
    backgroundColor: '#FA9917',
    width: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
  },
  graphText: {
    color: '#FA9917',
    textAlign: 'left',
  },
  dateContainer: {
    flexDirection: 'row',
    height: 40,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 23,
    backgroundColor: GREY_10_COLOR,
  },
  dateText: {
    fontSize: 16,
  },
  hourGraph: {
    flex: 0.8,
  },
  container2: {
    height: height / 2,
    flex: 1,
  },
  heading: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default CouponLogStat;
