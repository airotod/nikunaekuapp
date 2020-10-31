import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import FirestoreGetTest from './test/firestoregettest';
import TestHome from './test/home';
import FirestoreAddTest from './test/firestoreaddtest';

import { GREY_80_COLOR, GREY_90_COLOR, WHITE_COLOR } from './models/colors';

const Drawer = createDrawerNavigator();

const TestMain = ({ route, navigation }) => {
  return (
    <>
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
          component={TestHome}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Firestore 데이터 가져오기"
          component={FirestoreGetTest}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Firestore 데이터 추가하기"
          component={FirestoreAddTest}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default TestMain;
