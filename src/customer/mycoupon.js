import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopBar from '../components/topbar';
import {
  GREY_20_COLOR,
  GREY_60_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../models/colors';

import MyCouponLog from './mycoupontab/mycouponlog';
import MyCoupons from './mycoupontab/mycoupons';

const Tab = createMaterialTopTabNavigator();

const MyCoupon = ({ route, navigation }) => {
  return (
    <>
      <TopBar
        title="My 쿠폰"
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
      />
      <Tab.Navigator
        initialRouteName="보유 쿠폰"
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
          name="보유 쿠폰"
          component={MyCoupons}
          options={{ tabBarLabel: '보유 쿠폰' }}
        />
        <Tab.Screen
          name="쿠폰 내역"
          component={MyCouponLog}
          options={{ tabBarLabel: '쿠폰 내역' }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MyCoupon;
