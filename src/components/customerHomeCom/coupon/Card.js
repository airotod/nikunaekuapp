import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const Card = ({ data }) => {
  const items = [{ id: 1 }];
  return (
    <TouchableOpacity style={styles.container}>
      <Image />
      <CouponList items={items} />
      <Text style={styles.text}>상세 보기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 5 / 3,
    width: "60%",
    marginHorizontal: "20%",
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 1,
  },
  text: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 4,
    backgroundColor: "#f8f8ff",
  },
});

export default Card;
