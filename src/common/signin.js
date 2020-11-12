import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { BLACK_COLOR, GREY_90_COLOR, RED_COLOR } from '../models/colors';

const SignIn = ({ route, navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>
          안녕하세요.{'\n'}
          <Text style={{ color: RED_COLOR }}>니쿠내쿠</Text> 입니다.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="이메일 또는 전화번호"
          onChangeText={(text) => console.log(text)}
          autoFocus={true}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          onChangeText={(text) => console.log(text)}
          secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="로그인"
            onPress={() => console.log('로그인')}
            color={GREY_90_COLOR}
          />
        </View>
      </View>
    </>
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
  title: {
    color: BLACK_COLOR,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 80,
    textAlign: 'center',
  },
});

export default SignIn;
