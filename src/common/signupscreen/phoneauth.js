import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import StepButton from '../../components/stepbutton';

import { BLACK_COLOR, RED_COLOR } from '../../models/colors';

export default function PhoneAuth({ route, navigation }) {
  async function _handleNext(event) {
    navigation.navigate('서비스 이용 약관 화면');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>휴대폰 번호 인증</Text>
      <StepButton text="다음" onPress={_handleNext} buttonColor={RED_COLOR} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  title: {
    color: BLACK_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
});
