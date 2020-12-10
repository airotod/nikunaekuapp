import React, { useState, useEffect } from 'react';

import { StyleSheet, Image, LogBox } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';


import TopBar from '../components/topbar';
import {
  GREY_20_COLOR,
  GREY_60_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../models/colors';
import firestore from '@react-native-firebase/firestore';

import MyCouponLog from './brandDetailTab/mycouponlog';
import Introduction from './brandDetailTab/introduction';
import StoreList from './brandDetailTab/storelist';
import { ScrollView } from 'react-native-gesture-handler';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Tab = createMaterialTopTabNavigator();

const BrandDetail = ({ route, navigation }) => {
  const { data, otherParam } = route.params;
  // const [brandList, setBrandList] = useState([]);
  // const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   const getUserIdAsync = async () => {
  //     try {
  //       const getUserId = await AsyncStorage.getItem('userId');
  //       setUserId(getUserId);
  //       const ref = firestore().collection('Brand');

  //       let userCoupons = [];
  //       firestore()
  //         .collection('User')
  //         .doc(getUserId)
  //         .collection('coupons')
  //         .get()
  //         .then(function (querySnapshot) {
  //           let coupons = [];
  //           querySnapshot.forEach(function (doc) {
  //             coupons.push(doc.id);
  //           });
  //           userCoupons = coupons;
  //         });

  //       ref.onSnapshot((querySnapshot) => {
  //         let items = [];
  //         querySnapshot.forEach((doc) => {
  //           const { brandName, logo } = doc.data();
  //           if (userCoupons.includes(brandName)) {
  //             items.push({
  //               brandName: brandName,
  //               logo: logo,
  //             });
  //           }
  //         });
  //         setBrandList(items);
  //       });
  //     } catch (e) {
  //       // Restoring Id failed
  //       console.log('Restoring Id failed');
  //     }
  //   };
  //   getUserIdAsync();
  // }, []);


  return (
    <>
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
          }}>
          <Tab.Screen
            name="소개"
            component={Introduction}
            options={{ tabBarLabel: '소개' }}
            initialParams={{ data: data }}
          />
          <Tab.Screen
            name="매장"
            component={StoreList}
            options={{ tabBarLabel: '매장' }}
            initialParams={{ data: data }}
          />

          <Tab.Screen
            name="쿠폰 내역"
            component={MyCouponLog}
            options={{ tabBarLabel: '쿠폰 내역' }}
            initialParams={{ data: data }}
          />
        </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    flex:0.4,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  container: {
    flex:1,
    width: '100%',
    height: '100%',
  },
});

export default BrandDetail;
