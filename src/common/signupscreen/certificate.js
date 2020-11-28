import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import 'react-native-gesture-handler';

import StepButton from '../../components/stepbutton';
import TopBar from '../../components/topbar';
import {
  BLACK_COLOR,
  GREY_30_COLOR,
  GREY_40_COLOR,
  GREY_50_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from '../../models/colors';
import { AuthContext } from '../../utils/context';

export default function Certificate({ route, navigation }) {
  const { account, otherParam } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const ref = firestore().collection('users');

  function _handleComplete(event) {
    setModalVisible(true);
  }

  async function _handleSignUp(event) {
    await AsyncStorage.setItem('userType', 'owner');
    await ref.doc(account.userid).set({
      birthdate: account.birthdate,
      cafeName: account.cafename,
      cafePhone: account.cafephone,
      password: account.password,
      phone: account.userphone,
      region: account.region,
      userId: account.userid,
      userName: account.username,
      userType: 'owner',
      registeredAt: firestore.FieldValue.serverTimestamp(),
    });
    setModalVisible(false);
  }

  return (
    <AuthContext.Consumer>
      {({ signUp }) => (
        <>
          <TopBar
            title="카페 등록 절차"
            navigation={navigation}
            barColor={BLACK_COLOR}
          />
          <View style={styles.container}>
            <View style={styles.mainContents}>
              <Text style={styles.question}>1. 주민등록증을 등록해주세요.</Text>
              <View style={styles.img}>
                <Text style={styles.imgAlt}>주민등록증</Text>
              </View>
              <Text style={styles.question}>
                2. 사업자등록증을 등록해주세요.
              </Text>
              <View style={styles.img}>
                <Text style={styles.imgAlt}>사업자등록증</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <StepButton
                text="이전"
                onPress={() => navigation.pop()}
                borderColor={GREY_40_COLOR}
              />
              <StepButton
                text="신청"
                onPress={_handleComplete}
                buttonColor={RED_COLOR}
              />
            </View>
          </View>
          <Modal animated="fade" visible={modalVisible} transparent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.msg}>
                  [확인]을 누르면 카페 등록 신청이 완료됩니다.{'\n'}
                  정보를 올바르게 입력했는지 다시 한번 확인해보시기 바랍니다.
                </Text>
                <View style={styles.buttonContainer}>
                  <StepButton
                    text="취소"
                    onPress={() => setModalVisible(false)}
                    borderColor={GREY_40_COLOR}
                  />
                  <StepButton
                    text="확인"
                    onPress={() => {
                      signUp({ userType: 'owner' });
                      _handleSignUp();
                    }}
                    buttonColor={RED_COLOR}
                  />
                </View>
              </View>
            </View>
          </Modal>
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
  centeredView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    margin: 25,
  },
  img: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: GREY_30_COLOR,
    borderRadius: 15,
    height: 160,
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 20,
    width: '90%',
  },
  imgAlt: {
    color: GREY_50_COLOR,
    fontSize: 24,
    textAlign: 'center',
  },
  mainContents: {
    flex: 1,
  },
  modalView: {
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  msg: {
    color: BLACK_COLOR,
    fontSize: 13,
    fontWeight: 'bold',
    margin: 5,
  },
  question: {
    color: BLACK_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
