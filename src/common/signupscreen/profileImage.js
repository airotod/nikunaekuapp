import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import 'react-native-gesture-handler';

import CheckInfo from '../../components/checkinfo';
import StepButton from '../../components/stepbutton';
import TopBar from '../../components/topbar';
import { AuthContext } from '../../utils/context';
import { chooseImage } from './ImagePicker';

import {
  BLACK_COLOR,
  GREEN_COLOR,
  GREY_30_COLOR,
  GREY_60_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../models/colors';
import { dateWithKorean } from '../../utils/format';

export default function ProfileImage({ route, navigation }) {
  const { account, otherParam } = route.params;

  const ref = firestore().collection('User');

  async function _handleSignUp(event) {
    storage().ref('/profile_' + account.userid).getDownloadURL().then(async function (url) {
      await AsyncStorage.setItem('userId', account.userid);
      await AsyncStorage.setItem('userType', 'customer');
      await ref.doc(account.userid).set({
        birthDate: account.birthdate,
        password: account.password,
        phoneNumber: account.userphone,
        totalPoint: 0,
        usedPoint: 0,
        savePoint: 0,
        chargePoint: 0,
        profileUrl: url,
        userId: account.userid,
        userName: account.username,
        nickName: account.nickname,
        userType: 'customer',
        registeredAt: firestore.FieldValue.serverTimestamp(),
      });
    }).catch((e) => console.log('download url error: ', e));
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
                회원가입이 완료되었습니다.{'\n'}
                프로필 이미지를 등록 하실 수 있습니다.{'\n'}
                이미지를 등록하지 않더라도 서비스 이용이 가능합니다.
              </Text>
              <View style={styles.img}>
                <Text style={styles.imgAlt}>
                  사진을{'\n'}등록하세요.{'\n'}(선택)
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <StepButton
                  text="선택"
                  onPress={() => {
                    console.log('before..', account.userid);
                    chooseImage({userid: account.userid, option: 'profile'});
                  }}
                  buttonColor={RED_COLOR}
                />
                <StepButton
                  text="완료"
                  onPress={() => {
                    signIn({ userId: account.userid, userType: 'customer' });
                    _handleSignUp();
                  }}
                  buttonColor={RED_COLOR}
                />
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </AuthContext.Consumer>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
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
  image: {
    alignItems: 'center',
    alignSelf: 'center',
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
