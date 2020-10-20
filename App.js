import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './src/main';
import CustomerMain from './src/customermain';
import OwnerMain from './src/ownermain';

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
            options={{ title: '메인 화면' }}
          />
          <Stack.Screen
            name="로그인"
            component={SignIn}
            options={{ title: '로그인' }}
          />
          <Stack.Screen
            name="회원가입"
            component={SignUp}
            options={{ title: '회원가입' }}
          />
          <Stack.Screen
            name="고객 화면"
            component={CustomerMain}
            options={{ title: '고객 화면' }}
          />
          <Stack.Screen
            name="사장님 화면"
            component={OwnerMain}
            options={{ title: '사장님 화면' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
