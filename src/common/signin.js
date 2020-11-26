import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import { BLACK_COLOR, GREY_90_COLOR, RED_COLOR } from '../models/colors';
import { AuthContext } from '../utils/context';

const SignIn = ({ route, navigation }) => {
  const [userId, setUserId] = useState(null);
  const [userPw, setUserPw] = useState(null);
  const [msg, setMsg] = useState(null);

  const ref = firestore().collection('users');

  async function _handleSignIn({ evet, signIn }) {
    if (!userId) {
      setMsg('이메일 또는 전화번호를 입력해주세요.');
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
            if (userPw !== getPassword) {
              setMsg('비밀번호가 일치하지 않습니다.');
            } else {
              setMsg(null);
              await AsyncStorage.setItem('userId', userId);
              await AsyncStorage.setItem('userType', userType);
              signIn({ userId: userId, userType: userType });
            }
          } else {
            setMsg('존재하지 않은 계정입니다.');
          }
        });
    }
  }

  return (
    <AuthContext.Consumer>
      {({ signIn }) => (
        <View style={styles.container}>
          <Text style={styles.title}>
            안녕하세요.{'\n'}
            <Text style={{ color: RED_COLOR }}>니쿠내쿠</Text> 입니다.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="이메일 또는 전화번호"
            onChangeText={(text) => setUserId(text)}
            autoFocus={true}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            onChangeText={(text) => setUserPw(text)}
            secureTextEntry={true}
          />
          <View>
            <Text style={styles.msg}>{msg}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="로그인"
              onPress={() => {
                _handleSignIn({ signIn: signIn });
              }}
              color={GREY_90_COLOR}
            />
          </View>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 30,
    width: '60%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderBottomColor: GREY_90_COLOR,
    borderBottomWidth: 1.5,
    fontSize: 18,
    height: 40,
    margin: 3,
    padding: 2,
    width: '60%',
  },
  msg: {
    color: RED_COLOR,
    fontSize: 13,
  },
  title: {
    color: BLACK_COLOR,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 80,
    textAlign: 'center',
  },
});

export default SignIn;
