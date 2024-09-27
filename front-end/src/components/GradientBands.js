import React from "react";
import { View, StyleSheet } from "react-native";

const GradientBands = () => {
  return (
    <View style={styles.container}>
      <View style={styles.band1} />
      <View style={styles.band2} />
      <View style={styles.band3} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  band1: {
    flex: 4, // 80% of the height
    backgroundColor: "#43a275", // Original color
  },
  band2: {
    flex: 1, // 10% of the height
    backgroundColor: "rgba(67, 162, 117, 0.8)", // Same color with 20% black overlay
  },
  band3: {
    flex: 1, // 10% of the height
    backgroundColor: "rgba(67, 162, 117, 0.6)", // Same color with 40% black overlay
  },
});

export default GradientBands;
