import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BLACK_COLOR } from '../models/colors';

const MyPoint = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.mainText}>My 포인트 화면</Text>
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

export default MyPoint;
