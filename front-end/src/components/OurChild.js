import React from "react";

import { View, Text, StyleSheet } from "react-native";

const OurChild = (props) => {
  const { message } = props;
  return (
    <View style={styles.bob}>
      <Text>{message}</Text>
    </View>
  );
};

export default OurChild;

const styles = new StyleSheet.create({
  bob: {
    height: 200,
    width: 200,
    backgroundColor: "red",
  },
});
