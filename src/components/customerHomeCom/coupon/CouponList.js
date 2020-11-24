import React from "react";
import { StyleSheet } from "react-native";

const CouponList = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <CouponListItem key={item.id} item={items} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginHorizontal: 20,
  },
});

export default CouponList;
