import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'react-native-gesture-handler';

import StepButton from '../../components/stepbutton';
import TopBar from '../../components/topbar';
import { AuthContext } from '../../utils/context';

import {
  BLACK_COLOR,
  GREY_30_COLOR,
  GREY_60_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../models/colors';
import { dateWithKorean } from '../../utils/format';

export default function SignUpForm({ route, navigation }) {
  const [birthdate, setBirthdate] = useState(new Date());
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userid, setUserid] = useState(null);
  const [username, setUsername] = useState(null);

  async function _handleSignUp(event) {
    await AsyncStorage.setItem('userId', userid);
  }

  function _showDatePicker(event) {
    setShowDatePicker(true);
  }

  function _onBirthdateChange(event, date) {
    const currentDate = date || birthdate;
    setShowDatePicker(false);
    setBirthdate(currentDate);
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
                  onChangeText={(text) => setUserid(text)}
                />
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
              <StepButton
                text="완료"
                onPress={() => {
                  signIn({ userid, password1 });
                  _handleSignUp();
                }}
                buttonColor={RED_COLOR}
              />
            </View>
          </ScrollView>
        </>
      )}
    </AuthContext.Consumer>
  );
}

const styles = StyleSheet.create({
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
