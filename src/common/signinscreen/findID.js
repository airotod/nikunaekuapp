import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

import StepButton from '../../components/stepbutton';
import {
  BLACK_COLOR,
  GREY_40_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../models/colors';
import { checkPhone } from '../../utils/validate';

export default function FindID({ route, navigation }) {
  const [authNum, setAuthNum] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [nextErrMsg, setNextErrMsg] = useState(null);
  const [sendErrMsg, setSendErrMsg] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [msg, setMsg] = useState(false);

  const ref = firestore().collection('User');

  let sendButtonColor = {
    backgroundColor: clicked ? GREY_40_COLOR : RED_COLOR,
  };

  let nextButtonColor = authNum ? RED_COLOR : GREY_40_COLOR;

  function _handleSend(event) {
    let check = false;
    ref
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.data().phoneNumber);
        if (doc.data().phoneNumber == userPhone) {
          setMsg(doc.data().userId);
          check = true;
          console.log(doc.data().userId, userPhone);
        }
      });
      if (!userPhone) {
        setSendErrMsg('전화번호를 입력해주세요.');
      } else if (!check) {
        setSendErrMsg('등록되지 않은 번호입니다.');
      } else if (!clicked) {
        setSendErrMsg(null);
        setClicked(true);
      }
    });
  }

  function _handleNext(event) {
    if (!authNum) {
      setNextErrMsg('인증번호가 올바르지 않습니다.');
    } else {
      setNextErrMsg(null);
      setModalVisible(true);
    }
  }

  function _handleHome(event) {
    navigation.navigate('로그인');
  }

  function _handlefindPw(event) {
    navigation.navigate('비밀번호 찾기');
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>휴대폰 번호 인증</Text>
      <Text style={styles.msg}>
        가입시 입력한 휴대폰 번호를 입력하세요.
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
          <Modal animated="fade" visible={modalVisible} transparent={true}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.msg}>
                    회원님의 ID: {msg}{'\n'}
                    [확인]을 누르면 로그인 화면으로 돌아갑니다.{'\n'}
                    비밀번호를 찾으시려면 비밀번호 찾기를 누르십시오.
                  </Text>
                  <View style={styles.buttonContainer}>
                    <StepButton
                      text="확인"
                      onPress={() => _handleHome()}
                      buttonColor={GREY_40_COLOR}
                    />
                    <StepButton
                      text="비밀번호 찾기"
                      onPress={() => _handlefindPw()}
                      borderColor={RED_COLOR}
                    />
                  </View>
                </View>
              </View>
            </Modal>
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
  buttonContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  container: {
    margin: 30,
  },
  centeredView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
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
  modalView: {
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sendText: {
    color: BLACK_COLOR,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
