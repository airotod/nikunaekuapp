import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { GREY_60_COLOR } from '../models/colors';

export default function Loading() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={GREY_60_COLOR} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
