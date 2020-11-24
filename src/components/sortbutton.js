import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { GREY_60_COLOR, RED_COLOR } from '../models/colors';

export default function SortButton({ buttonText, sortType, onPress }) {
  let buttonColor = sortType === buttonText ? RED_COLOR : GREY_60_COLOR;
  let buttonBorderWidth = sortType === buttonText ? 1 : 0.5;

  return (
    <TouchableOpacity
      style={[
        styles.sortButton,
        {
          borderColor: buttonColor,
          borderWidth: buttonBorderWidth,
        },
      ]}
      onPress={onPress}>
      <Text style={[styles.sortButtonText, { color: buttonColor }]}>
        {buttonText} V
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sortButton: {
    borderRadius: 5,
    padding: 4,
    justifyContent: 'center',
    marginHorizontal: 4,
    height: 24,
  },
  sortButtonText: {
    fontSize: 11,
  },
});
