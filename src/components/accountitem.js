import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { GREY_40_COLOR, GREY_80_COLOR } from '../models/colors';

const AccountItem = ({ text, onPress }) => {
  return (
    <>
      <View style={styles.navigationItem}>
        <Text style={styles.navigationText}>{text}</Text>
        <View style={styles.arrowContainer}>
          <Icon
            name="keyboard-arrow-right"
            size={40}
            color={GREY_40_COLOR}
            onPress={onPress}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navigationItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 65,
    paddingHorizontal: 15,
  },
  navigationText: {
    color: GREY_80_COLOR,
    fontSize: 18,
    marginLeft: 20,
  },
});

export default AccountItem;
