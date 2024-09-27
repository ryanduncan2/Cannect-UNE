import React from "react";
import { Image, StyleSheet, View } from "react-native";

const circleSize = 100;
const factor = 1.4;
const transparency = 0.08; // Transparency level (0.0 to 1.0, where 0.0 is fully transparent)

const CircleImage = () => {
  return (
    <View style={styles.transparantCircle}>
      <View style={styles.circleStyle}>
        <Image
          // source={require("../../../assets/MBackground.jpg")}
          source={require("../../../assets/Cannect_logo_updated.webp")}
          style={styles.imageStyle}
        ></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transparantCircle: {
    width: circleSize * factor,
    height: circleSize * factor,
    borderRadius: (circleSize * factor) / 2, // Makes the View circular
    backgroundColor: `rgba(0, 0, 0, ${transparency})`,
    justifyContent: "center",
    alignItems: "center",
  },
  circleStyle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2, // Makes the container circular
    overflow: "hidden", // Ensures the image fits within the circle
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "pink",
  },
  imageStyle: { width: "100%", height: "100%", borderRadius: circleSize / 2 },
});

export default CircleImage;
