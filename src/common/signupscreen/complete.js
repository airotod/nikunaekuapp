import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

import TopBar from '../../components/topbar';

import { BLACK_COLOR } from '../../models/colors';

export default function Complete({ route, navigation }) {
  return (
    <>
      <TopBar
        title="카페 등록 절차"
        navigation={navigation}
        barColor={BLACK_COLOR}
      />
      <View style={styles.container}>
        <Text style={styles.mainText}>신청 완료 화면</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 25,
  },
  mainText: {
    color: BLACK_COLOR,
  },
});
