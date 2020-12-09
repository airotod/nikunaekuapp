import React, { useEffect, useMemo, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CustomerMain from './src/customermain';
import OwnerMain from './src/ownermain';
import StartScreen from './src/startscreen';

import SignIn from './src/common/signin';
import SignUp from './src/common/signup';
import Complete from './src/common/signupscreen/complete';

import { AuthContext } from './src/utils/context';
import BrandDetail from './src/customer/brandDetail';

import FindBrandRegister from './src/customer/findbrandpage/findbrandregister';
import CustomerHome from './src/customer/home';

const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userId: action.userId,
            userType: action.userType,
            phoneNumber: action.phoneNumber,
            brandName: action.brandName || null,
            brandId: action.brandId || null,
            storeId: action.storeId || null,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userId: action.userId,
            userType: action.userType,
            phoneNumber: action.phoneNumber,
            brandName: action.brandName || null,
            brandId: action.brandId || null,
            storeId: action.storeId || null,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userId: null,
            userType: null,
            phoneNumber: null,
            brandName: null,
            brandId: null,
            storeId: null,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: true,
            userId: null,
            userType: action.userType,
            phoneNumber: null,
            brandName: null,
            brandId: null,
            storeId: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userId: null,
      userType: null,
      phoneNumber: null,
      brandName: null,
      brandId: null,
      storeId: null,
    },
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userId;
      let userType;
      let phoneNumber;
      let brandName;
      let brandId;
      let storeId;

      try {
        userId = await AsyncStorage.getItem('userId');
        userType = await AsyncStorage.getItem('userType');
        phoneNumber = await AsyncStorage.getItem('phoneNumber');
        brandName = await AsyncStorage.getItem('brandName');
        brandId = await AsyncStorage.getItem('brandId');
        storeId = await AsyncStorage.getItem('storeId');
      } catch (e) {
        // Restoring Id failed
      }
      dispatch({
        type: 'RESTORE_TOKEN',
        userId: userId,
        userType: userType,
        phoneNumber: phoneNumber,
        brandName: brandName || null,
        brandId: brandId || null,
        storeId: storeId || null,
      });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({
          type: 'SIGN_IN',
          userId: data.userId,
          userType: data.userType,
          phoneNumber: data.phoneNumber,
          brandName: data.brandName,
          brandId: data.brandId,
          storeId: data.storeId,
        });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        dispatch({
          type: 'SIGN_UP',
          userId: data.userId,
          userType: data.userType,
          phoneNumber: data.phoneNumber,
          brandName: data.brandName,
          brandId: data.brandId,
          storeId: data.storeId,
        });
      },
    }),
    [],
  );

  return (
    <>
      <NavigationContainer>
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator>
            {state.userId === null ? (
              state.userType === null ? (
                <>
                  <Stack.Screen
                    name="시작화면"
                    component={StartScreen}
                    options={{ title: '시작화면', headerShown: false }}
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
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="신청 완료 화면"
                    component={Complete}
                    options={{
                      title: '신청 완료 화면',
                      headerShown: false,
                    }}
                  />
                </>
              )
            ) : state.userType === 'owner' ? (
              <>
                <Stack.Screen
                  name="사장님 화면"
                  component={OwnerMain}
                  options={{ headerShown: false }}
                  initialParams={{
                    userId: state.userId,
                    phone: state.phoneNumber,
                    userType: state.userType,
                    brandId: state.brandId,
                    storeId: state.storeId,
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="고객 화면"
                  component={CustomerMain}
                  options={{ headerShown: false }}
                  initialParams={{
                    userId: state.userId,
                    phone: state.phoneNumber,
                    userType: state.userType,
                  }}
                />
                <Stack.Screen
                  name="상세 정보"
                  component={BrandDetail}
                  // options={{ headerShown: false }}
                  
                />
                <Stack.Screen
                  name="멤버십 가입"
                  component={FindBrandRegister}
                  // options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </>
  );
};

export default App;
