import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import FirestoreGetTest from './test/firestoregettest';
import TestHome from './test/home';
import FirestoreAddTest from './test/firestoreaddtest';

const Drawer = createDrawerNavigator();

const TestMain = ({ route, navigation }) => {
  return (
    <>
      <Drawer.Navigator initialRouteName="홈">
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
