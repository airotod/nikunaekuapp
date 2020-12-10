import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import 'react-native-gesture-handler';

import {
  BLACK_COLOR,
  GREY_70_COLOR,
  GREY_80_COLOR,
  GREY_90_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../models/colors';
import { AuthContext } from '../utils/context';

const SignIn = ({ route, navigation }) => {
  const [userId, setUserId] = useState(null);
  const [userPw, setUserPw] = useState(null);
  const [msg, setMsg] = useState(null);

  const ref = firestore().collection('User');

  async function _handleSignIn({ evet, signIn }) {
    if (!userId) {
      setMsg('아이디를 입력해주세요.');
    } else if (!userPw) {
      setMsg('비밀번호를 입력해주세요.');
    } else {
      ref
        .doc(userId)
        .get()
        .then(async function (doc) {
          if (doc.exists) {
            let userType = doc.data().userType;
            let getPassword = doc.data().password;
            let phoneNumber = doc.data().phoneNumber;
            let brandId = null;
            let storeId = null;
            if (userPw !== getPassword) {
              setMsg('비밀번호가 일치하지 않습니다.');
            } else {
              setMsg(null);
              await AsyncStorage.setItem('userId', userId);
              await AsyncStorage.setItem('userType', userType);
              await AsyncStorage.setItem('phoneNumber', phoneNumber);
              if (userType == 'owner') {
                brandId = doc.data().brandID;
                storeId = doc.data().storeID;
                await AsyncStorage.setItem('brandId', brandId);
                await AsyncStorage.setItem('storeId', storeId);
              }
              signIn({
                userId: userId,
                userType: userType,
                phoneNumber: phoneNumber,
                brandId: brandId,
                storeId: storeId,
              });
            }
          } else {
            setMsg('존재하지 않은 계정입니다.');
          }
        });
    }
  }
}

export default SignIn;
