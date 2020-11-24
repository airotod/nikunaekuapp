import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';
import 'react-native-gesture-handler';

import CheckInfo from '../../components/checkinfo';
import StepButton from '../../components/stepbutton';
import TopBar from '../../components/topbar';
import {
  BLACK_COLOR,
  GREY_30_COLOR,
  GREY_50_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../models/colors';
import { regions } from '../../models/regions';
import { dateWithKorean } from '../../utils/format';

export default function CafeForm({ route, navigation }) {
  const [birthdate, setBirthdate] = useState(new Date());
  const [cafephone, setCafephone] = useState(null);
  const [cafename, setCafename] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState(regions[8]);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userid, setUserid] = useState(null);
  const [username, setUsername] = useState(null);

  let account = {
    birthdate: birthdate,
    cafephone: cafephone,
    cafename: cafename,
    region: region,
    password: password1,
    userid: userid,
    username,
    username,
    usertype: 'owner',
  };

  function _handleNext(event) {
    if (!username) {
      setErrMsg('이름을 입력해주세요.');
    } else if (!password1) {
      setErrMsg('비밀번호를 입력해주세요.');
    } else if (password1 !== password2) {
      setErrMsg('비밀번호가 일치하지 않습니다.');
    } else if (!cafename) {
      setErrMsg('카페명을 입력해주세요.');
    } else {
      setModalVisible(true);
    }
  }

  function _handleConfirm(event) {
    navigation.navigate('증명서 인증 화면');
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
    <>
      <TopBar
        title="카페 등록 절차"
        navigation={navigation}
        barColor={BLACK_COLOR}
      />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.question}>1. 카페 사진을 등록해주세요.</Text>
          <View style={styles.img}>
            <Text style={styles.imgAlt}>CAFE{'\n'}IMAGE</Text>
          </View>
          <Text style={styles.question}>2. 본인 이름을 입력하세요.</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="예) 홍길동"
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <Text style={styles.question}>3. 아이디를 입력하세요.</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="예) 길동"
              onChangeText={(text) => setUserid(text)}
            />
          </View>
          <Text style={styles.question}>4. 비밀번호를 입력하세요.</Text>
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
          <Text style={styles.question}>5. 생년월일을 입력하세요.</Text>
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
          <Text style={styles.question}>6. 등록할 카페명을 입력하세요.</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="예) 니쿠내쿠"
              onChangeText={(text) => setCafename(text)}
            />
          </View>
          <Text style={styles.question}>7. 영업 지역을 선택하세요.</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={region}
              style={styles.picker}
              onValueChange={(value, index) => setRegion(value)}>
              {regions.map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
          </View>
          <Text style={styles.question}>
            8. 카페 전화번호를 입력하세요. (선택)
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="예) 010-0000-0000"
              onChangeText={(text) => setCafephone(text)}
            />
          </View>
          {errMsg && <Text style={styles.redMsg}>{errMsg}</Text>}
          <StepButton
            text="다음"
            onPress={_handleNext}
            buttonColor={RED_COLOR}
          />
        </View>
        <CheckInfo
          data={account}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={() => {
            setModalVisible(false);
            _handleConfirm();
          }}
        />
      </ScrollView>
    </>
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
    borderRadius: 25,
    height: 160,
    justifyContent: 'center',
    marginVertical: 20,
    width: 240,
  },
  imgAlt: {
    color: GREY_50_COLOR,
    fontSize: 32,
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
  picker: {
    color: BLACK_COLOR,
    height: 40,
  },
  pickerContainer: {
    alignContent: 'center',
    backgroundColor: WHITE_COLOR,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 2,
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
