import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const IconText = (props) => {
  const { container, textTheme } = styles;
  const { iconName, iconColor, bodyText, bodyTextStyles } = props;
  return (
    <View style={container}>
      <Feather name={iconName} size={50} color={iconColor}></Feather>
      <Text style={[textTheme, bodyTextStyles]}>{bodyText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textTheme: { fontWeight: "bold" },
  container: { alignItems: "center" },
});

export default IconText;
