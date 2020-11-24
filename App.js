import React, { useEffect, useMemo, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './src/main';
import CustomerMain from './src/customermain';
import OwnerMain from './src/ownermain';
import StartScreen from './src/startscreen';
import TestMain from './src/testmain';

import SignIn from './src/common/signin';
import SignUp from './src/common/signup';

import { AuthContext } from './src/utils/context';

const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userId: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userId: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userId: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userId: null,
    },
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userId;

      try {
        userId = await AsyncStorage.getItem('userId');
      } catch (e) {
        // Restoring Id failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userId });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
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
                  name="메인화면"
                  component={MainScreen}
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
              </>
            )}
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </>
  );
};

export default App;
