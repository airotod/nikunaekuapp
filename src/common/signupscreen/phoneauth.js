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
import {
  BLACK_COLOR,
  GREY_40_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../models/colors';
import { checkPhone } from '../../utils/validate';

export default function PhoneAuth({ route, navigation }) {
  const [authNum, setAuthNum] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [nextErrMsg, setNextErrMsg] = useState(null);
  const [sendErrMsg, setSendErrMsg] = useState(null);
  const [userPhone, setUserPhone] = useState(null);

  let sendButtonColor = {
    backgroundColor: clicked ? GREY_40_COLOR : RED_COLOR,
  };

  let nextButtonColor = authNum ? RED_COLOR : GREY_40_COLOR;

  function _handleSend(event) {
    if (!userPhone) {
      setSendErrMsg('전화번호를 입력해주세요.');
    } else if (!checkPhone(userPhone)) {
      setSendErrMsg('전화번호가 올바르지 않습니다.');
    } else if (!clicked) {
      setSendErrMsg(null);
      setClicked(true);
    }
  }

  function _handleNext(event) {
    if (!authNum) {
      setNextErrMsg('인증번호가 올바르지 않습니다.');
    } else {
      setNextErrMsg(null);
      navigation.navigate('서비스 이용 약관 화면');
    }
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
            editable={!clicked}
          />
        </View>
        <View style={styles.phoneContainerRight}>
          <TouchableOpacity
            style={[styles.sendButton, sendButtonColor]}
            onPress={_handleSend}
            activeOpacity={clicked ? 1 : 0.2}>
            <Text style={styles.sendText}>보내기</Text>
          </TouchableOpacity>
        </View>
      </View>
      {sendErrMsg && <Text style={styles.errMsg}>{sendErrMsg}</Text>}
      {clicked && (
        <>
          <View style={styles.authContainer}>
            <TextInput
              style={styles.input}
              placeholder="인증번호 4자리"
              onChangeText={(text) => setAuthNum(text)}
            />
          </View>
          {nextErrMsg && <Text style={styles.errMsg}>{nextErrMsg}</Text>}
          <StepButton
            text="다음"
            onPress={_handleNext}
            buttonColor={nextButtonColor}
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
  errMsg: {
    color: RED_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
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
