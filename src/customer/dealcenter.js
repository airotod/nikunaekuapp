import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopBar from '../components/topbar';
import {
  GREY_20_COLOR,
  GREY_60_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../models/colors';

import CouponMarket from './dealcentertab/couponmarket';
import DealLog from './dealcentertab/deallog';
import PostDeal from './dealcentertab/postdeal';

const Tab = createMaterialTopTabNavigator();

const DealCenter = ({ route, navigation }) => {
  const { userId, otherParam } = route.params;

  return (
    <>
      <TopBar
        title="거래 센터"
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
      />
      <Tab.Navigator
        initialRouteName="쿠폰 장터"
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
          name="쿠폰 장터"
          component={CouponMarket}
          options={{ tabBarLabel: '쿠폰 장터' }}
          initialParams={{ userId: userId }}
        />
        <Tab.Screen
          name="쿠폰 판매"
          component={PostDeal}
          options={{ tabBarLabel: '쿠폰 판매' }}
          initialParams={{ userId: userId }}
        />
        <Tab.Screen
          name="거래 내역"
          component={DealLog}
          options={{ tabBarLabel: '거래 내역' }}
          initialParams={{ userId: userId }}
        />
      </Tab.Navigator>
    </>
  );
};

export default DealCenter;
