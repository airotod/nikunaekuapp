import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import AsyncStorage from '@react-nativet-async-storage/async-storage';

import TopBar from '../components/topbar';
import {
  GREY_20_COLOR,
  GREY_60_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../models/colors';
import MyCouponLog from './brandDetailTab/mycouponlog';
import Introduction from './brandDetailTab/introduction';

const Tab = createMaterialTopTabNavigator();

const BrandDetail = ({ route, navigation }) => {
  const { data, otherParam } = route.params;

  console.log('complete?: ', data);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserIdAsync = async () => {
      try {
        const getUserId = await AsyncStorage.getItem('userId');
        setUserId(getUserId);
      } catch (e) {
        // Restoring Id failed
        console.log('Restoring Id failed');
      }
    };
    getUserIdAsync();
  }, []);

  return (
    <>
      <TopBar
        title="상세 정보"
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
      />

      <Image
        source={{ uri: data.logo }}
        resizeMode="contain"
        style={[styles.img]}
      />
      <Tab.Navigator
        initialRouteName="소개"
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
        }}
        >
        <Tab.Screen
          name="소개"
          component={Introduction}
          options={{ tabBarLabel: '소개' }}
          initialParams={{data:data}}
        />
        <Tab.Screen
          name="쿠폰 내역"
          component={MyCouponLog}
          options={{ tabBarLabel: '쿠폰 내역' }}
          initialParams={{data:data}}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 0.6,
    width: '100%',
    height: '100%',
    
  },
});

export default BrandDetail;
