import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from '../components/topbar';

import { BLACK_COLOR } from '../models/colors';

const FindAccount = ({ route, navigation }) => {
  return (
    <>
      <TopBar
        title="ID/PW 찾기"
        navigation={navigation}
        barColor={BLACK_COLOR}
      />
      <View style={styles.container}>
        <Text style={styles.mainText}>ID/PW 찾기 화면</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: BLACK_COLOR,
  },
});

export default FindAccount;
