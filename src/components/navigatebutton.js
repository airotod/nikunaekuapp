import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';

import { GREY_80_COLOR } from '../models/colors';

const NavigateButton = ({ text, navigation, colors }) => {
  const _handleNavigate = (event) => {
    navigation.navigate(text);
  };

  return (
    <>
      <View style={styles.buttonContainer}>
        <Button
          title={text}
          onPress={_handleNavigate}
          color={colors || GREY_80_COLOR}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    width: "60%",
  },});

export default NavigateButton;
