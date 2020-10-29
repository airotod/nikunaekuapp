import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopBar from '../components/topbar';
import {
  GREY_20_COLOR,
  GREY_60_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../models/colors';

import MyPointLog from './mypointtab/mypointlog';
import MyWallet from './mypointtab/mywallet';

const Tab = createMaterialTopTabNavigator();

const MyPoint = ({ route, navigation }) => {
  return (
    <>
      <TopBar
        title="My 포인트"
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
      />
      <Tab.Navigator
        initialRouteName="내 지갑"
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
          name="내 지갑"
          component={MyWallet}
          options={{ tabBarLabel: '내 지갑' }}
        />
        <Tab.Screen
          name="포인트 내역"
          component={MyPointLog}
          options={{ tabBarLabel: '포인트 내역' }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MyPoint;
