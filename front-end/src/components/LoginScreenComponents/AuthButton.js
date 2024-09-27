import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AuthButton = ({ title, onPress, isLoading }) => (
  <TouchableOpacity
    style={[styles.button, isLoading && styles.disabledButton]}
    onPress={onPress}
    disabled={isLoading}
  >
    <Text style={styles.buttonText}>
      {isLoading ? "Please wait..." : title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#00897B",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
});

export default AuthButton;
