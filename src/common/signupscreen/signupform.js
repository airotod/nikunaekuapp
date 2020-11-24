import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import 'react-native-gesture-handler';

import CheckInfo from '../../components/checkinfo';
import StepButton from '../../components/stepbutton';
import TopBar from '../../components/topbar';
import { AuthContext } from '../../utils/context';

import {
  BLACK_COLOR,
  GREEN_COLOR,
  GREY_30_COLOR,
  GREY_60_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../models/colors';
import { dateWithKorean } from '../../utils/format';

export default function SignUpForm({ route, navigation }) {
  const [birthdate, setBirthdate] = useState(new Date());
  const [duplicated, setDuplicated] = useState(null);
  const [duplicatedMsg, setDuplicatedMsg] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userid, setUserid] = useState(null);
  const [username, setUsername] = useState(null);
  const [userphone, setUserphone] = useState(null);

  const ref = firestore().collection('users');

  let buttonColor = {
    backgroundColor: duplicated === false ? GREEN_COLOR : RED_COLOR,
  };

  let account = {
    birthdate: birthdate,
    userid: userid,
    userphone: userphone,
    username: username,
    usertype: 'customer',
  };

  function _handleUserId(text) {
    setUserid(text);
    setDuplicated(null);
    setDuplicatedMsg(null);
  }

  async function _handleDuplicated(event) {
    if (!userid) {
      setDuplicatedMsg('아이디를 입력해주세요.');
    } else {
      ref
        .doc(userid)
        .get()
        .then(async function (doc) {
          if (doc.exists) {
            setDuplicated(true);
            setDuplicatedMsg('이미 존재하는 아이디입니다.');
          } else {
            setDuplicated(false);
            setDuplicatedMsg('사용가능한 아이디입니다.');
          }
        });
    }
  }

  function _handleComplete(event) {
    if (!userid) {
      setErrMsg('아이디를 입력해주세요.');
    } else if (duplicated !== false) {
      setErrMsg('아이디 중복 확인을 진행해주세요.');
    } else if (!password1) {
      setErrMsg('비밀번호를 입력해주세요.');
    } else if (password1 !== password2) {
      setErrMsg('비밀번호가 일치하지 않습니다.');
    } else if (!username) {
      setErrMsg('이름을 입력해주세요.');
    } else {
      setModalVisible(true);
    }
  }

  async function _handleSignUp(event) {
    await AsyncStorage.setItem('userId', userid);
    await AsyncStorage.setItem('userType', 'customer');
    await ref.doc(userid).set({
      birthdate: birthdate,
      password: password1,
      phone: userphone,
      point: 0,
      userId: userid,
      userName: username,
      userType: 'customer',
      registeredAt: firestore.FieldValue.serverTimestamp(),
    });
  }

  function _showDatePicker(event) {
    setShowDatePicker(true);
  }

  function _onBirthdateChange(event, date) {
    const currentDate = date || birthdate;
    setShowDatePicker(false);
    setBirthdate(currentDate);
  }

  useEffect(() => {
    const getUserPhone = async () => {
      try {
        let userPhone = await AsyncStorage.getItem('userPhone');
        setUserphone(userPhone);
      } catch (e) {
        console.log('error: ', e);
      }
    };
    getUserPhone();
  }, []);

  return (
    <AuthContext.Consumer>
      {({ signIn }) => (
        <>
          <TopBar
            title="회원가입"
            navigation={navigation}
            barColor={BLACK_COLOR}
          />
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.msg}>
                반갑습니다.{'\n'}
                회원가입 하시면 서비스 이용이 바로 가능합니다.
              </Text>
              <View style={styles.img}>
                <Text style={styles.imgAlt}>
                  사진을{'\n'}등록하세요.{'\n'}(선택)
                </Text>
              </View>
              <Text style={styles.question}>1. 아이디를 입력하세요.</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="한글, 영어만 가능"
                  onChangeText={(text) => _handleUserId(text)}
                />
              </View>
              <View style={styles.buttonContainer}>
              {duplicatedMsg && <Text style={styles.redMsg}>{duplicatedMsg}</Text>}
                <TouchableOpacity
                  style={[styles.button, buttonColor]}
                  onPress={_handleDuplicated}
                  activeOpacity={duplicated ? 1 : 0.2}>
                  <Text style={styles.buttonText}>중복 확인</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.question}>2. 비밀번호를 입력하세요.</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="비밀번호"
                  onChangeText={(text) => setPassword1(text)}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="비밀번호 재확인"
                  onChangeText={(text) => setPassword2(text)}
                  secureTextEntry={true}
                />
              </View>
              <Text style={styles.redMsg}>
                영어, 숫자, 특수문자 최소 2개 포함, 총 10글자 이상
              </Text>
              <Text style={styles.question}>3. 본인 이름을 입력하세요.</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="예) 홍길동"
                  onChangeText={(text) => setUsername(text)}
                />
              </View>
              <Text style={styles.question}>4. 생년월일을 입력하세요.</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.date} onPress={_showDatePicker}>
                  {dateWithKorean(birthdate)}
                </Text>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={birthdate}
                    mode="date"
                    display="default"
                    onChange={_onBirthdateChange}
                  />
                )}
              </View>
              {errMsg && <Text style={styles.redMsg}>{errMsg}</Text>}
              <StepButton
                text="완료"
                onPress={_handleComplete}
                buttonColor={RED_COLOR}
              />
              <CheckInfo
                data={account}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={() => {
                  signIn({ userId: userid, userType: 'customer' });
                  _handleSignUp();
                  setModalVisible(false);
                }}
              />
            </View>
          </ScrollView>
        </>
      )}
    </AuthContext.Consumer>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: 28,
    justifyContent: 'center',
    width: 70,
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  buttonText: {
    color: BLACK_COLOR,
    fontSize: 12,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    margin: 25,
  },
  date: {
    color: BLACK_COLOR,
    fontSize: 18,
  },
  img: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: GREY_30_COLOR,
    borderRadius: 90,
    height: 180,
    justifyContent: 'center',
    marginVertical: 20,
    width: 180,
  },
  imgAlt: {
    color: GREY_60_COLOR,
    fontSize: 18,
    textAlign: 'center',
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
  msg: {
    color: BLACK_COLOR,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
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
