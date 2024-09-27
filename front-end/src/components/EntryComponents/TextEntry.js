import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const TextEntry = ({ myText, setMyText }) => {
  //const [myText, setMyText] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    // Effect runs when the screen is focused or unfocused
    if (!isFocused) {
      // Modify state when the screen is unfocused

      setMyText("");
    }
  }, [isFocused]);

  return (
    <View style={styles.style1}>
      <TextInput
        style={styles.style2}
        value={myText}
        onChangeText={setMyText}
        placeholder="   Type here"
        placeholderTextColor="#888"
        multiline={true} // Enable multiline input
        textAlignVertical="top" // Aligns text to the top
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  style1: { backgroundColor: "#c7f2ce", padding: 20 },
  style2: {
    backgroundColor: "lightblue",
    color: "black",
    height: 200,
    // width: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "grey",
  },
  style3: {},
});

export default TextEntry;
