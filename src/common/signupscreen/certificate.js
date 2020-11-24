import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import StepButton from '../../components/stepbutton';

import TopBar from '../../components/topbar';
import {
  BLACK_COLOR,
  GREY_30_COLOR,
  GREY_40_COLOR,
  GREY_50_COLOR,
  RED_COLOR,
} from '../../models/colors';

export default function Certificate({ route, navigation }) {
  function _handleComplete(event) {
    navigation.navigate('신청 완료 화면');
  }

  return (
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
          <Text style={styles.question}>2. 사업자등록증을 등록해주세요.</Text>
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
    </>
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
  question: {
    color: BLACK_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
