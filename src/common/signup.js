import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { BLACK_COLOR } from '../models/colors';
import PhoneAuth from './signupscreen/phoneauth';
import SignUpForm from './signupscreen/signupform';
import Terms from './signupscreen/terms';
import CafeForm from './signupscreen/cafeform';
import Certificate from './signupscreen/certificate';
import Complete from './signupscreen/complete';
import ProfileImage from './signupscreen/profileImage';

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
            <Stack.Screen
              name="프로필 이미지 등록 화면"
              component={ProfileImage}
              options={{ title: '프로필 이미지 등록 화면', headerShown: false }}
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
            <Stack.Screen
              name="신청 완료 화면"
              component={Complete}
              options={{
                title: '신청 완료 화면',
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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  mainText: {
    color: BLACK_COLOR,
    fontSize: 24,
    margin: 10,
    fontWeight: 'bold',
  },
  text: {
    color: BLACK_COLOR,
    margin: 15,
    fontSize: 14,
    alignItems: 'stretch',
  },
});

export default SignUp;
