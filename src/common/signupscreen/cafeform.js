import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={_handleNext}>
            <Text style={styles.buttonText}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: RED_COLOR,
    height: 45,
    justifyContent: 'center',
    width: 90,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: 15,
  },
  buttonText: {
    color: BLACK_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    margin: 25,
  },
  mainText: {
    color: BLACK_COLOR,
  },
});
