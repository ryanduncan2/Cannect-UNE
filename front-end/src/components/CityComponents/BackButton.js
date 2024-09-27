import React from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

const BackButton = ({ func }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        func();
        navigation.navigate("Clinics");
      }}
      //

      title="Back"
      style={styles.myButton}
    >
      <AntDesign name="arrowleft" size={34} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  myButton: {
    //backgroundColor: "#72b3c2",
    backgroundColor: "lightblue",
    width: 50,
    height: 50,
    marginLeft: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "grey",
  },
});

export default BackButton;
