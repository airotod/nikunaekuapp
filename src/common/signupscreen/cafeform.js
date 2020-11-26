import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

import StepButton from '../../components/stepbutton';
import TopBar from '../../components/topbar';
import { BLACK_COLOR, RED_COLOR } from '../../models/colors';

export default function CafeForm({ route, navigation }) {
  function _handleNext(event) {
    navigation.navigate('증명서 인증 화면');
  }

  return (
    <>
      <TopBar
        title="카페 등록 절차"
        navigation={navigation}
        barColor={BLACK_COLOR}
      />
      <View style={styles.container}>
        <Text style={styles.mainText}>정보 입력 화면</Text>
        <StepButton text="다음" onPress={_handleNext} buttonColor={RED_COLOR} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
  },
  mainText: {
    color: BLACK_COLOR,
  },
});
