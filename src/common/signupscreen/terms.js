import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';

import TopBar from '../../components/topbar';
import { BLACK_COLOR, RED_COLOR } from '../../models/colors';

export default function Terms({ route, navigation }) {
  function _handleNext(event) {
    navigation.navigate('정보 입력 화면');
  }

  return (
    <>
      <TopBar
        title="니쿠내쿠 서비스 이용 약관"
        navigation={navigation}
        barColor={BLACK_COLOR}
      />
      <View style={styles.container}>
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
  container: {
    flex: 1,
    margin: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: RED_COLOR,
    height: 34,
    justifyContent: 'center',
    width: 74,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: 15,
  },
  buttonText: {
    color: BLACK_COLOR,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
