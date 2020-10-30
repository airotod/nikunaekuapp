import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './src/main';
import CustomerMain from './src/customermain';
import OwnerMain from './src/ownermain';
import TestMain from './src/testmain';

import SignIn from './src/common/signin';
import SignUp from './src/common/signup';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="메인화면"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="로그인"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="회원가입"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="고객 화면"
            component={CustomerMain}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="사장님 화면"
            component={OwnerMain}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="테스트 화면"
            component={TestMain}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;