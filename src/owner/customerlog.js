import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TopBar from '../components/topbar';
import { BLACK_COLOR, GREY_60_COLOR } from '../models/colors';

const CustomerLog = ({ route, navigation }) => {
  return (
    <>
      <TopBar
        title="고객 로그"
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
        myaccountColor={GREY_60_COLOR}
      />
      <View style={styles.container}>
        <Text style={styles.mainText}>고객 로그 화면</Text>
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

export default CustomerLog;
