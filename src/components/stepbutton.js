import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';

import { BLACK_COLOR } from '../models/colors';

const StepButton = ({
  borderColor,
  buttonAlign,
  buttonColor,
  onPress,
  text,
  textColor,
}) => {
  const buttonCustomStyle = {
    backgroundColor: buttonColor ? buttonColor : 'transparent',
    borderColor: borderColor ? borderColor : 'transparent',
    borderWidth: borderColor ? 2 : 0,
  };

  const buttonContainerCustomStyle = {
    alignItems: buttonAlign ? buttonAlign : 'flex-end',
  };

  const buttonTextCustomStyle = {
    color: textColor ? textColor : BLACK_COLOR,
  };

  return (
    <>
      <View style={[styles.buttonContainer, buttonContainerCustomStyle]}>
        <TouchableOpacity
          style={[styles.button, buttonCustomStyle]}
          onPress={onPress}>
          <Text style={[styles.buttonText, buttonTextCustomStyle]}>{text}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 80,
  },
  buttonContainer: {
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StepButton;
