import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CityItems = (props) => {
  const myState = props.state;
  const myStateFunction = props.stateFunction;
  const allStateFunctions = props.allStateFunctions;
  return (
    <TouchableOpacity
      style={myState ? styles.itemStylesSelected : styles.itemStyles}
      onPress={() => {
        if (!myState) {
          allStateFunctions[0](false);
          allStateFunctions[1](false);
          allStateFunctions[2](false);
          myStateFunction(true);
        }
      }}
    >
      <View style={styles.myItemStyle}>
        <Text
          style={myState ? styles.itemTextStyleSelected : styles.itemTextStyle}
        >
          {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  myItemStyle: {
    width: 70,
    //flexDirection: "row",
    //justifyContent: "space-evenly",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "green",
  },
  itemStyles: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "grey",
    paddingVertical: 5,
    paddingHorizontal: 10,

    backgroundColor: "lightblue",
  },
  itemStylesSelected: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    //backgroundColor: "cornflowerblue",
    backgroundColor: "#72b3c2",
  },
  itemTextStyle: {
    color: "black",
  },
  itemTextStyleSelected: {
    color: "white",
    //color: "black",
  },
});

export default CityItems;
