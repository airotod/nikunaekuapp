import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import DealCenter from './customer/dealcenter';
import EnrollCoupon from './customer/enrollcoupon';
import FindBrand from './customer/findbrand';
import CustomerHome from './customer/home';
import CustomerAccount from './customer/myaccount';
import MyCoupon from './customer/mycoupon';
import MyPoint from './customer/mypoint';

const Drawer = createDrawerNavigator();

const CustomerMain = ({ route, navigation }) => {
  return (
    <Drawer.Navigator initialRouteName="홈">
      <Drawer.Screen name="홈" component={CustomerHome} />
      <Drawer.Screen name="내 정보" component={CustomerAccount} />
      <Drawer.Screen name="My 쿠폰" component={MyCoupon} />
      <Drawer.Screen name="My 포인트" component={MyPoint} />
      <Drawer.Screen name="쿠폰 등록" component={EnrollCoupon} />
      <Drawer.Screen name="브랜드 찾기" component={FindBrand} />
      <Drawer.Screen name="거래 센터" component={DealCenter} />
    </Drawer.Navigator>
  );
};

export default CustomerMain;
