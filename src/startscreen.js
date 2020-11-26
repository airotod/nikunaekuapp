import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';

import {
  BLACK_COLOR,
  GREY_70_COLOR,
  GREY_80_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from './models/colors';

export default function StartScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        안녕하세요{'\n'}
        <Text style={styles.red}>APP NAME</Text> 입니다.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: RED_COLOR }]}
          onPress={() => navigation.navigate('회원가입', { user: 'customer' })}>
          <Text style={styles.buttonText}>일반회원 회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: GREY_80_COLOR }]}
          onPress={() => navigation.navigate('회원가입', { user: 'owner' })}>
          <Text style={styles.buttonText}>사장님 회원가입</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signInContainer}>
        <Text style={styles.signIn}>
          이미 계정이 있으신가요?{'  '}
          <Text
            style={styles.signInButton}
            onPress={() => navigation.navigate('로그인')}>
            로그인
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginVertical: 5,
  },
  buttonContainer: {
    margin: 10,
    width: '70%',
  },
  buttonText: {
    color: WHITE_COLOR,
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  red: {
    color: RED_COLOR,
  },
  signIn: {
    color: GREY_70_COLOR,
    fontSize: 14,
  },
  signInButton: {
    color: BLACK_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    color: BLACK_COLOR,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 120,
    textAlign: 'center',
  },
});
