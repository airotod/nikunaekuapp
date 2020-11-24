import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import 'react-native-gesture-handler';

import StepButton from '../../components/stepbutton';
import TopBar from '../../components/topbar';
import {
  BLACK_COLOR,
  GREY_20_COLOR,
  GREY_40_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../models/colors';

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

export default function Terms({ route, navigation }) {
  const [allChecked, setAllChecked] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [locationChecked, setLocationChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [provideChecked, setProvideChecked] = useState(false);

  let checked = locationChecked && privacyChecked && provideChecked;
  let buttonColor = checked ? RED_COLOR : GREY_40_COLOR;

  function _handleNext(event) {
    if (!checked) {
      setErrMsg('필수 약관 동의 후 서비스 이용이 가능합니다.');
    } else {
      setErrMsg(null);
      navigation.navigate('정보 입력 화면');
    }
  }

  return (
    <>
      <TopBar
        title="니쿠내쿠 서비스 이용 약관"
        navigation={navigation}
        barColor={BLACK_COLOR}
      />
      <View style={styles.container}>
        <View style={styles.mainContents}>
          <View style={styles.checkAllContainer}>
            <TermItem
              text="모두 확인 동의합니다."
              textWeight="bold"
              value={allChecked}
              onValueChange={(value) => {
                setAllChecked(value);
                setPrivacyChecked(value);
                setLocationChecked(value);
                setProvideChecked(value);
              }}
            />
          </View>
          <TermItem
            text="(필수) 개인정보 수집 및 이용에 대한 동의"
            value={privacyChecked}
            onValueChange={setPrivacyChecked}
          />
          <TermItem
            text="(필수) 위치기반 서비스 이용약관 동의"
            value={locationChecked}
            onValueChange={setLocationChecked}
          />
          <TermItem
            text="(필수) 개인정보 제3자 제공 동의"
            value={provideChecked}
            onValueChange={setProvideChecked}
          />
        </View>
        <View style={styles.bottomContainer}>
          {errMsg && <Text style={styles.errMsg}>{errMsg}</Text>}
          <StepButton
            text="다음"
            onPress={_handleNext}
            buttonColor={buttonColor}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    marginRight: 5,
  },
  checkAllContainer: {
    marginBottom: 24,
  },
  container: {
    flex: 1,
    margin: 20,
  },
  errMsg: {
    color: RED_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
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
  mainContents: {
    flex: 1,
  },
});
