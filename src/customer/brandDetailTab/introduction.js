import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BLACK_COLOR } from '../../models/colors';

const Introduction = ({ route, navigation }) => {
    const {data, otherParam} = route.params;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.mainText}>{data.count}</Text>
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

export default Introduction;
