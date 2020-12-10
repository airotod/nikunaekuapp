import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopBar from '../components/topbar';
import {
  GREY_20_COLOR,
  GREY_60_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../models/colors';

import CouponLogRecord from './couponlogtab/couponlogrecord';
import CouponLogStat from './couponlogtab/couponlogstat';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Tab = createMaterialTopTabNavigator();

const CouponLog = ({ route, navigation }) => {
  const {brandId, storeId} = route.params;

  return (
    <>
      <TopBar
        title="쿠폰 사용량"
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
        myaccountColor={GREY_60_COLOR}
      />
      <Tab.Navigator
        initialRouteName="쿠폰 사용량 기록"
        tabBarOptions={{
          activeTintColor: RED_COLOR,
          inactiveTintColor: GREY_60_COLOR,
          indicatorStyle: { backgroundColor: RED_COLOR },
          pressColor: GREY_20_COLOR,
          labelStyle: { fontSize: 16 },
          style: { backgroundColor: WHITE_COLOR, height: 44 },
          tabStyle: {
            borderBottomColor: GREY_20_COLOR,
            borderBottomWidth: 1,
            height: 44,
          },
        }}>
        <Tab.Screen
          name="쿠폰 사용량 기록"
          component={CouponLogRecord}
          options={{ tabBarLabel: '기록' }}
          initialParams={{brandId, storeId }}
        />
        <Tab.Screen
          name="쿠폰 사용량 통계"
          component={CouponLogStat}
          options={{ tabBarLabel: '통계' }}
        />
      </Tab.Navigator>
    </>
  );
};

export default CouponLog;
