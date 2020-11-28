import React, { useEffect, useMemo, useReducer } from 'react';
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
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userId: action.userId,
            userType: action.userType,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userId: null,
            userType: null,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: true,
            userId: null,
            userType: action.userType,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userId: null,
      userType: null,
    },
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userId;
      let userType;

      try {
        userId = await AsyncStorage.getItem('userId');
        userType = await AsyncStorage.getItem('userType');
      } catch (e) {
        // Restoring Id failed
      }
      dispatch({ type: 'RESTORE_TOKEN', userId: userId, userType: userType });
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
        });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        dispatch({
          type: 'SIGN_UP',
          userId: data.userId,
          userType: data.userType,
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
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="고객 화면"
                  component={CustomerMain}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="상세 정보"
                  component={BrandDetail}
                  options={{ headerShown: false }}
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
