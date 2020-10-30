import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TopBar from '../components/topbar';
import { BLACK_COLOR } from '../models/colors';

const CustomerHome = ({ route, navigation }) => {
  return (
    <>
      <TopBar
        title="니쿠내쿠"
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
      />
      <View style={styles.container}>
        <Text style={styles.mainText}> HOME 화면</Text>
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

export default CustomerHome;
