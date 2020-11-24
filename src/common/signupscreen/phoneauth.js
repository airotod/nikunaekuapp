import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';

import StepButton from '../../components/stepbutton';
import { BLACK_COLOR, RED_COLOR, WHITE_COLOR } from '../../models/colors';

export default function PhoneAuth({ route, navigation }) {
  const [authNum, setAuthNum] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [userPhone, setUserPhone] = useState(null);

  function _handleSend(event) {
    setClicked(true);
  }

  function _handleNext(event) {
    navigation.navigate('서비스 이용 약관 화면');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>휴대폰 번호 인증</Text>
      <Text style={styles.msg}>
        연락 받을 수 있는 휴대폰 번호를 입력하세요. 서비스 이용에 반드시
        필요합니다.
      </Text>
      <View style={styles.phoneContainer}>
        <View style={styles.phoneContainerLeft}>
          <Text style={styles.regionCode}>+82</Text>
        </View>
        <View style={styles.phoneContainerCenter}>
          <TextInput
            style={styles.input}
            placeholder="010-0000-0000"
            onChangeText={(text) => setUserPhone(text)}
            autoFocus={true}
          />
        </View>
        <View style={styles.phoneContainerRight}>
          <TouchableOpacity style={styles.sendButton} onPress={_handleSend}>
            <Text style={styles.sendText}>보내기</Text>
          </TouchableOpacity>
        </View>
      </View>
      {clicked && (
        <>
          <View style={styles.authContainer}>
            <TextInput
              style={styles.input}
              placeholder="인증번호 4자리"
              onChangeText={(text) => setAuthNum(text)}
            />
          </View>
          <StepButton
            text="다음"
            onPress={_handleNext}
            buttonColor={RED_COLOR}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    backgroundColor: WHITE_COLOR,
    borderColor: BLACK_COLOR,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  container: {
    margin: 30,
  },
  input: {
    color: BLACK_COLOR,
    fontSize: 16,
    height: '100%',
    width: '100%',
  },
  msg: {
    color: BLACK_COLOR,
    fontSize: 13,
    marginTop: 10,
    marginBottom: 25,
  },
  phoneContainer: {
    alignItems: 'center',
    borderColor: BLACK_COLOR,
    borderWidth: 1,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
  },
  phoneContainerCenter: {
    borderLeftColor: BLACK_COLOR,
    borderLeftWidth: 1,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  phoneContainerLeft: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: 60,
  },
  phoneContainerRight: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: 74,
  },
  title: {
    color: BLACK_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  regionCode: {
    color: BLACK_COLOR,
    fontSize: 16,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: RED_COLOR,
    height: 28,
    justifyContent: 'center',
    width: 60,
  },
  sendText: {
    color: BLACK_COLOR,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
