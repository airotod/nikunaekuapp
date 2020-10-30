import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TopBar from '../components/topbar';
import { BLACK_COLOR, GREY_60_COLOR, RED_COLOR } from '../models/colors';

const SHOP_NAME = '안다르 커피';

const OwnerHome = ({ route, navigation }) => {
  return (
    <>
      <TopBar
        title={SHOP_NAME}
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
        titleColor={RED_COLOR}
        myaccountColor={GREY_60_COLOR}
      />
      <View style={styles.container}>
        <Text style={styles.mainText}>사장님 HOME 화면</Text>
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

export default OwnerHome;
