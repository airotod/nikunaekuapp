import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TopBar from '../components/topbar';
import { BLACK_COLOR, GREY_90_COLOR } from '../models/colors';

const OwnerAccount = ({ route, navigation }) => {
  return (
    <>
      <TopBar
        title="내 정보"
        navigation={navigation}
        drawerShown={true}
        titleColor={GREY_90_COLOR}
      />
      <View style={styles.container}>
        <Text style={styles.mainText}>사장님 내 정보 화면</Text>
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

export default OwnerAccount;
