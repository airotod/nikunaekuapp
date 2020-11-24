import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';

import StepButton from '../../components/stepbutton';
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
        <StepButton text="다음" onPress={_handleNext} buttonColor={RED_COLOR} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
