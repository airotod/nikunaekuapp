import React from 'react';
import { Text, View, Dimensions, StyleSheet, SafeAreaView  } from 'react-native';
import { BLACK_COLOR, ORANGE_10_COLOR, GREY_60_COLOR, ORANGE_COLOR } from '../../models/colors';

import { BarChart, Grid} from 'react-native-svg-charts';
import { Circle } from 'react-native-svg';

import { DATA } from './Data';
import Tooltip from './Tooltip';

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
};

class Area extends React.PureComponent {
  state = {
    data: [],
    tooltipX: null,
    tooltipY: null,
    tooltipIndex: null,
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
    const { data, tooltipX, tooltipY, tooltipIndex } = this.state;
    const contentInset = { left: 10, right: 10, top: 10, bottom: 7 };

    const ChartPoints = ({ x, y }) =>
      data.map((item, index) => (
        <Circle
          key={index}
          cx={x(item.id)+7}
          cy={y(item.score)}
          r={3}
          stroke='#ffd700'
          fill='#ffd700'
          onPress={() =>
            this.setState({
              tooltipX: item.id,
              tooltipY: item.score,
              tooltipIndex: index,
            })
          }
        />
      ));


    return (
      <SafeAreaView style={styles.graph}>
        <View style={styles.container2}>
          {data.length !== 0 ? (
            <BarChart
              style={{ height: '100%' }}
              data={data}
              yAccessor={({ item }) => item.score}
              xAccessor={({ item }) => item.id}
              contentInset={contentInset}
              svg={{ fill: ORANGE_10_COLOR } }
              yMin={0}
            >
              <Grid svg={{ stroke: 'rgba(151, 151, 151, 0.09)' }} belowChart={false} />
              <ChartPoints color="#003F5A" />
              {tooltipX !== null? ( // 이 조건문이 있어야 처음에 tooltip이 뜨는 것을 방지할 수 있음
                <Tooltip
                  tooltipX={tooltipX}
                  tooltipY={tooltipY}
                  color="#003F5A"
                  index={tooltipIndex}
                  dataLength={data.length}
                />
                ) : null
              } 
            </BarChart>
          ) : (
            <View
              style={{
                height: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: '#ccc',
                }}
              >
              </Text>
            </View>
          )}
          <Text style={styles.heading}>시간대별 사용량</Text>
        </View>
      </SafeAreaView>
    );
  }
};

const CouponLogRecord = ({ route, navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.todayCoupon}>
          <Text style={styles.todayText}>오늘</Text>
          <Text style={styles.todayCountText}>12</Text>
        </View>
        <View style={styles.usageFlex}>
          {CouponUseage(10, "전날 사용량")}
          {CouponUseage(12.5, "주 평균 사용량")}
          {CouponUseage(19, "월 사용량")}
        </View>
      </View>
      <Area/>
      <View style={{flex: 0.5}}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : 'white'
  },
  container2: {
    height: height/2,
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
    flex : 0.6,
    alignItems: 'center',
  },
  usageFlex: {
    flex : 0.6,
    flexDirection : 'row'
  },
  useage : {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal : 25
  },
  todayText: {
    fontSize : 12,
    fontWeight : "bold",
    marginTop : 32,
    marginBottom : 8,
    color : GREY_60_COLOR
  },
  todayCountText: {
    fontSize : 50,
    color : ORANGE_COLOR
  },
  CountText : {
    fontSize : 24,
    marginBottom : 12
  },
  explainText : {
    fontSize : 13,
    color : GREY_60_COLOR
  },
  barStyle : {
    height: 200
  },
  graph : {
    flex : 0.8
  }
});

export default CouponLogRecord;
