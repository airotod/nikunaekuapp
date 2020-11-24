import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';

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
          <TouchableOpacity
            style={[
              styles.button,
              { borderColor: GREY_40_COLOR, borderWidth: 2 },
            ]}
            onPress={() => navigation.pop()}>
            <Text style={styles.buttonText}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: RED_COLOR }]}
            onPress={_handleComplete}>
            <Text style={styles.buttonText}>신청</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    width: 90,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
