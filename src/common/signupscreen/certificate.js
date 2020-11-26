import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import StepButton from '../../components/stepbutton';

import TopBar from '../../components/topbar';

import { BLACK_COLOR, GREY_40_COLOR, RED_COLOR } from '../../models/colors';

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
        <Text style={styles.mainText}>증명서 인증 화면</Text>
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
  mainText: {
    color: BLACK_COLOR,
  },
});
