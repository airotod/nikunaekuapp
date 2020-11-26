import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { BLACK_COLOR } from '../models/colors';
import PhoneAuth from './signupscreen/phoneauth';
import SignUpForm from './signupscreen/signupform';
import Terms from './signupscreen/terms';
import CafeForm from './signupscreen/cafeform';
import Certificate from './signupscreen/certificate';

const Stack = createStackNavigator();

const SignUp = ({ route, navigation }) => {
  const { user, otherParam } = route.params;

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="휴대폰 번호 인증 화면"
          component={PhoneAuth}
          options={{ title: '휴대폰 번호 인증 화면', headerShown: false }}
        />
        <Stack.Screen
          name="서비스 이용 약관 화면"
          component={Terms}
          options={{ title: '서비스 이용 약관 화면', headerShown: false }}
        />
        {user === 'customer' ? (
          <>
            <Stack.Screen
              name="정보 입력 화면"
              component={SignUpForm}
              options={{ title: '회원가입 화면', headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="정보 입력 화면"
              component={CafeForm}
              options={{
                title: '정보 입력 화면',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="증명서 인증 화면"
              component={Certificate}
              options={{
                title: '증명서 인증 화면',
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: BLACK_COLOR,
  },
});

export default SignUp;
