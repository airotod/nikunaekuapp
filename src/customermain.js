import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import MyAccount from './common/myaccount';
import FindPW from './common/signinscreen/findPW';
import DealCenter from './customer/dealcenter';
import FindBrand from './customer/findbrand';
import CustomerHome from './customer/home';
import MyPoint from './customer/mypoint';
import StartScreen from './startscreen';

import { GREY_80_COLOR, GREY_90_COLOR, WHITE_COLOR } from './models/colors';

const Drawer = createDrawerNavigator();

const CustomerMain = ({ route, navigation }) => {
  const { userId, phone, userType, otherParam } = route.params;

  return (
    <Drawer.Navigator
      initialRouteName="홈"
      drawerStyle={{
        backgroundColor: GREY_90_COLOR,
      }}
      drawerContentOptions={{
        activeBackgroundColor: GREY_80_COLOR,
        activeTintColor: WHITE_COLOR,
        inactiveTintColor: WHITE_COLOR,
        labelStyle: {
          fontSize: 18,
        },
      }}>
      <Drawer.Screen
        name="홈"
        component={CustomerHome}
        initialParams={{ userId: userId, phone: phone }}
      />
      <Drawer.Screen
        name="내 정보"
        component={MyAccount}
        initialParams={{ userId: userId, phone: phone, userType: userType }}
      />
      <Drawer.Screen
        name="My 포인트"
        component={MyPoint}
        initialParams={{ userId: userId, phone: phone }}
      />
      <Drawer.Screen
        name="브랜드 찾기"
        component={FindBrand}
        initialParams={{ userId: userId, phone: phone }}
      />
      <Drawer.Screen
        name="거래 센터"
        component={DealCenter}
        initialParams={{ userId: userId, phone: phone }}
      />
    </Drawer.Navigator>
  );
};

export default CustomerMain;
