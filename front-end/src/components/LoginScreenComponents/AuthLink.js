import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AuthLink = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.link}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  link: {
    color: "#fff",
    marginTop: 15,
  },
});

export default AuthLink;
