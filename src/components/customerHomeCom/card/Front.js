import React from "react";
import { StyleSheet, ImageBackground } from "react-native";

const Front = ({ data, isFront }) => {
  console.log(data);
  return (
    <ImageBackground
      source={{ uri: data.logo }}
      resizeMode="contain"
      style={{
        opacity: isFront ? 1 : 0.2,
        ...styles.img,
      }}
    />
  );
};

const styles = StyleSheet.create({
  img: {
    height: "100%",
    width: "100%",
  },
});

export default Front;
