import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';

import { BLACK_COLOR, RED_COLOR } from '../../models/colors';

export default function PhoneAuth({ route, navigation }) {
  async function _handleNext(event) {
    navigation.navigate('서비스 이용 약관 화면');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>휴대폰 번호 인증</Text>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={_handleNext}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  nextButton: {
    alignItems: 'center',
    backgroundColor: RED_COLOR,
    height: 34,
    justifyContent: 'center',
    width: 74,
  },
  nextButtonContainer: {
    alignItems: 'flex-end',
    marginVertical: 15,
  },
  nextButtonText: {
    color: BLACK_COLOR,
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    color: BLACK_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
});
