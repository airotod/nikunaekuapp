import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import Front from "./Front";
import Back from "./Back";

const Card = ({ data }) => {
  const [isFront, setIsFront] = useState(true);

  const flipHandler = () => {
    setIsFront((prev) => !prev);
  };

  return (
    <TouchableOpacity onPress={flipHandler} style={styles.container}>
      <Text style={styles.text}>
        {data.count}/{data.totalCount}
      </Text>
      <Front data={data} isFront={isFront} />
      {!isFront && <Back data={data} />}
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
    top: 0,
    right: 0,
    padding: 4,
    backgroundColor: "#f8f8ff",
  },
});

export default Card;
