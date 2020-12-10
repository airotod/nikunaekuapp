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
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import 'react-native-gesture-handler';
import CheckInfo from '../../components/checkinfo';
import StepButton from '../../components/stepbutton';
import TopBar from '../../components/topbar';
import {
  BLACK_COLOR,
  GREEN_COLOR,
  GREY_20_COLOR,
  GREY_30_COLOR,
  GREY_40_COLOR,
  GREY_50_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../models/colors';
import { regions } from '../../models/regions';
import { dateWithKorean } from '../../utils/format';
import { checkPW } from '../../utils/validate';

export default function CafeForm({ route, navigation }) {
  const [birthdate, setBirthdate] = useState(new Date());
  const [cafephone, setCafephone] = useState(null);
  const [cafename, setCafename] = useState(null);
  const [duplicated, setDuplicated] = useState(null);
  const [duplicatedMsg, setDuplicatedMsg] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [region, setRegion] = useState(regions[8]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userid, setUserid] = useState(null);
  const [userphone, setUserphone] = useState(null);
  const [username, setUsername] = useState(null);
  const [storeID, setStoreID] = useState(null);
  const [brandList, setBrandList] = useState([]);
  const [isBrand, setIsBrand] = useState(false);
  const [des, setDes] = useState(null);

  const ref = firestore().collection('User');

  async function _handleNext(event) {
    navigation.navigate('증명서 인증 화면', { account: account });
  }

  let buttonColor = {
    backgroundColor: duplicated === false ? GREEN_COLOR : RED_COLOR,
  };

  let account = {
    birthdate: birthdate,
    cafephone: cafephone,
    brandID: cafename,
    region: region,
    nickname: nickname || userid,
    password: password1,
    storeID: storeID,
    userid: userid,
    phoneNumber: userphone,
    username: username,
    usertype: 'owner',
    des: des,
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
    if (!username) {
      setErrMsg('이름을 입력해주세요.');
    } else if (duplicated !== false) {
      setErrMsg('아이디 중복 확인을 진행해주세요.');
    } else if (!password1) {
      setErrMsg('비밀번호를 입력해주세요.');
    // } else if (checkPW(password1)) {
    //   // 영어, 숫자, 특수문자 최소 2개 포함, 총 10글자 이상
    //   setErrMsg(checkPW(password1));
    } else if (password1 !== password2) {
      setErrMsg('비밀번호가 일치하지 않습니다.');
    } else if (!storeID) {
      setErrMsg('지점명을 입력해주세요.');
    } else if (!userphone) {
      setErrMsg('사장님 휴대폰 번호를 입력해주세요.');
    } else {
      setModalVisible(true);
    }
  }

  function _showDatePicker(event) {
    setShowDatePicker(true);
  }

  function _onBirthdateChange(event, date) {
    const currentDate = date || birthdate;
    setShowDatePicker(false);
    setBirthdate(currentDate);
  }

  function TermItem({ text, textWeight, value, onValueChange }) {
    return (
      <View style={styles.itemContainer}>
        <CheckBox
          tintColors={{ true: RED_COLOR, false: GREY_40_COLOR }}
          value={value}
          onValueChange={onValueChange}
          style={styles.checkbox}
        />
        <Text style={[styles.itemText, { fontWeight: textWeight || 'normal' }]}>
          {text}
        </Text>
      </View>
    );
  }

  function _getbrandList(event) {
    const brandRef = firestore().collection('Brand');
    brandRef.get().then(function (querySnapshot) {
      let items = [];
      querySnapshot.forEach(function (doc) {
        items.push(doc.id.slice(0,));
      });
      setBrandList(items);
    });
  }

  async function _whenBrand(event) {
    if (isBrand === false) {
      setIsBrand(true);
    } else {
      setIsBrand(false);
    }
    setCafename(null);
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
    _getbrandList();
  }, []);

  return (
    <>
      <TopBar
        title="매장 등록 절차"
        navigation={navigation}
        barColor={BLACK_COLOR}
      />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.question}>1. 본인 이름을 입력하세요.</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="예) 홍길동"
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <Text style={styles.question}>2. 아이디를 입력하세요.</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="예) 길동"
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
          <Text style={styles.question}>3. 비밀번호를 입력하세요.</Text>
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
          <Text style={styles.question}>4. 닉네임을 입력하세요.</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="한글, 영어, 숫자 가능"
              onChangeText={(text) => setNickname(text)}
            />
          </View>
          <Text style={styles.redMsg}>
            닉네임을 입력하지 않을 경우, 아이디와 동일하게 저장됩니다.
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
          <Text style={styles.question}>6. 브랜드를 등록하세요.</Text>
          <TermItem
            text="프랜차이즈 브랜드인가요?"
            value={isBrand}
            onValueChange={_whenBrand}
          />
          {isBrand &&
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={cafename}
                style={styles.picker}
                onValueChange={(value, index) => setCafename(value)}>
                {brandList.map((item) => (
                  <Picker.Item label={item} value={item} key={item} />
                ))}
              </Picker>
            </View>}
          {!isBrand &&
            <View style={styles.bigInputContainer}>
              <TextInput
                style={styles.input}
                multiline={true}
                placeholder='고객들이 브랜드에 대해 잘 알 수 있게 브랜드 설명을 적어주세요.'
                onChangeText={(text) => setDes(text)}
              />
            </View>}
          <Text style={styles.question}>7. 지점명을 입력하세요. (브랜드명 + 지점명)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="예1) 스타벅스 신촌점"
              onChangeText={(text) => setStoreID(text)}
            />
          </View>
          <Text style={styles.question}>8. 영업 지역을 선택하세요.</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={region}
              style={styles.picker}
              onValueChange={(value, index) => setRegion(value)}>
              {regions.map((item) => (
                <Picker.Item label={item} value={item} key={item} />
              ))}
            </Picker>
          </View>
          <Text style={styles.question}>
            9. 사장님 휴대폰 번호를 입력하세요.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="예) 010-0000-0000"
              onChangeText={(text) => setUserphone(text)}
            />
          </View>
          <Text style={styles.question}>
            10. 매장 전화번호를 입력하세요.
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
            onPress={_handleComplete}
            buttonColor={RED_COLOR}
          />
        </View>
        <CheckInfo
          data={account}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={() => {
            setModalVisible(false);
            _handleNext();
          }}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
    borderColor: GREY_20_COLOR,
    borderWidth: 1,
    flexDirection: 'row',
    height: 55,
    paddingHorizontal: 10,
  },
  itemText: {
    color: BLACK_COLOR,
    fontSize: 16,
  },
  checkbox: {
    marginRight: 5,
  },
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
  bigInputContainer: {
    backgroundColor: WHITE_COLOR,
    height: 200,
    justifyContent: 'flex-start',
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
