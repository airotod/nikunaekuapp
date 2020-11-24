import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';

import TopBar from '../../components/topbar';
import { AuthContext } from '../../utils/context';

import { BLACK_COLOR, RED_COLOR, WHITE_COLOR } from '../../models/colors';

export default function SignUpForm({ route, navigation }) {
  const [userid, setUserid] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);

  async function _handleSignUp(event) {
    await AsyncStorage.setItem('userId', userid);
  }

  return (
    <AuthContext.Consumer>
      {({ signIn }) => (
        <>
          <TopBar
            title="회원가입"
            navigation={navigation}
            barColor={BLACK_COLOR}
          />
          <View style={styles.container}>
            <Text style={styles.question}>1. 아이디를 입력하세요.</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="한글, 영어만 가능"
                onChangeText={(text) => {
                  setUserid(text);
                }}
              />
            </View>
            <Text style={styles.question}>2. 비밀번호를 입력하세요.</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="예) abcde12345"
                onChangeText={(text) => {
                  setPassword1(text);
                }}
                secureTextEntry={true}
              />
            </View>
            <Text style={styles.redMsg}>
              영어, 숫자, 특수문자 최소 2개 포함, 총 10글자 이상
            </Text>
            <Text style={styles.question}>3. 비밀번호를 확인하세요.</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="비밀번호를 똑같이 적어주세요."
                onChangeText={(text) => {
                  setPassword2(text);
                }}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  signIn({ userid, password1 });
                  _handleSignUp();
                }}>
                <Text style={styles.buttonText}>완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </AuthContext.Consumer>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: RED_COLOR,
    height: 45,
    justifyContent: 'center',
    width: 90,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginVertical: 15,
    justifyContent: 'flex-end',
  },
  buttonText: {
    color: BLACK_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    margin: 25,
  },
  input: {
    fontSize: 18,
  },
  inputContainer: {
    backgroundColor: WHITE_COLOR,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: 5,
    width: '100%',
  },
  question: {
    color: BLACK_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  redMsg: {
    color: RED_COLOR,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'right',
  },
});
