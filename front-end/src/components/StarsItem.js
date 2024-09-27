import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const StarsItem = (props) => {
  const { rating, size = 17 } = props;

  {
    if (rating > 4.75) {
      return (
        <View style={styles.starsItemStyles}>
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
        </View>
      );
    } else if (rating > 4.25 && rating <= 4.75) {
      return (
        <View style={styles.starsItemStyles}>
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome
            name="star-half-empty"
            style={styles.starsItemStyles}
            size={size}
          />
        </View>
      );
    } else if (rating > 3.75 && rating <= 4.25) {
      return (
        <View style={styles.starsItemStyles}>
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
        </View>
      );
    } else if (rating > 3.25 && rating <= 3.75) {
      return (
        <View style={styles.starsItemStyles}>
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome
            name="star-half-empty"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
        </View>
      );
    } else if (rating > 2.75 && rating <= 3.25) {
      return (
        <View style={styles.starsItemStyles}>
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
        </View>
      );
    } else if (rating > 2.25 && rating <= 2.75) {
      return (
        <View style={styles.starsItemStyles}>
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome
            name="star-half-empty"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
        </View>
      );
    } else if (rating > 1.75 && rating <= 2.25) {
      return (
        <View style={styles.starsItemStyles}>
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
        </View>
      );
    } else if (rating > 1.25 && rating <= 1.75) {
      return (
        <View style={styles.starsItemStyles}>
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome
            name="star-half-empty"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
        </View>
      );
    } else if (rating > 0.75 && rating <= 1.25) {
      return (
        <View style={styles.starsItemStyles}>
          <FontAwesome name="star" style={styles.starsItemStyles} size={size} />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
        </View>
      );
    } else if (rating > 0.25 && rating <= 0.75) {
      return (
        <View style={styles.starsItemStyles}>
          <FontAwesome
            name="star-half-empty"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.starsItemStyles}>
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
          <FontAwesome
            name="star-o"
            style={styles.starsItemStyles}
            size={size}
          />
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  starsItemStyles: {
    flexDirection: "row",
    color: "white",
    paddingHorizontal: 2,
    size: 13,
  },
});

export default StarsItem;
