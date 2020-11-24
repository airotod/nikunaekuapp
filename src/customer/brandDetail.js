import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


import TopBar from '../components/topbar';
import { BLACK_COLOR } from '../models/colors';

const BrandDetail = ({ route, navigation }) => {
  return (
    <>
      <TopBar
        title="상세 정보"
        navigation={navigation}
        drawerShown={true}
        myaccountShown={true}
      />
      <View style={styles.container}>
        <Text style={styles.mainText}>상세 정보</Text>
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

export default BrandDetail;
