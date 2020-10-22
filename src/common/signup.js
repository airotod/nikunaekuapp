import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from '../components/topbar';

import { BLACK_COLOR } from '../models/colors';

const SignUp = ({ route, navigation }) => {
  return (
    <>
      <TopBar title="회원가입" navigation={navigation} barColor={BLACK_COLOR} />
      <View style={styles.container}>
        <Text style={styles.mainText}>회원가입 화면</Text>
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

export default SignUp;
