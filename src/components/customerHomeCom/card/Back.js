import React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const Back = ({ data }) => {
  const detailHandler = () => {};

  return (
    <>
      <Image
        source={{ uri: data.qr }}
        resizeMode="contain"
        style={styles.img}
      />
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    position: 'absolute',
    width: '40%',
    aspectRatio: 1 / 1,
    alignSelf: 'center',
  },
  text: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 4,
    backgroundColor: '#f8f8ff',
    elevation: 3,
  },
});

export default Back;
