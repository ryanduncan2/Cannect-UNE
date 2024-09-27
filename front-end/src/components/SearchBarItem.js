import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MyIcons from "./MyIcons";

const SearchBarItem = (props) => {
  const myArr = Object.values(props.state);
  const myState = myArr[0];
  const myStateSet = myArr[1];

  const mySearch = Object.values(props.search);

  const toggle = () => myStateSet(!myState);

  return (
    <TouchableOpacity
      //   style={selectedItemStyle}
      style={myState ? styles.itemStyleSelected : styles.itemStyle}
      onPress={() => {
        if (props.name != "Clear") {
          if (
            props.name == "Name" ||
            props.name == "Rating" ||
            props.name == "Price"
          ) {
            if (!myState) {
              for (let i = 0; i < mySearch.length; i++) {
                Object.values(mySearch[i])[1](false);
              }
              myStateSet(1); //change to myStateSet(1)
            } else {
              // toggle from 1 to 2 or 2 to 1.
              myStateSet((prevState) => (prevState === 1 ? 2 : 1));
              //
            }
          } else {
            myStateSet(!myState);
          }
          //Object.values(mySearch[0])[1](false);
        } else {
          for (let i = 0; i < mySearch.length; i++) {
            //if (Object.values(mySearch[i])[2] != "ReOrder")

            //myStateSet(false);
            Object.values(mySearch[i])[1](false);
          }
          //alert("my name is: " + props.name);
          myStateSet(true);
          //myStateSet(false);
        }
      }}
    >
      <View style={styles.myItemStyle}>
        {/* {props.name != "Price" &&
          props.name != "Name" &&
          props.name != "Rating" &&
          (props.name != "Clear" && props.name != "ReOrder" ? (
            <Text
              style={
                myState ? styles.itemTextStyleSelected : styles.itemTextStyle
              }
            >
              {props.name}{" "}
            </Text>
          ) : (
            <Text
              style={
                myState
                  ? styles.itemTextStyleSelectedPrompt
                  : styles.itemTextStylePrompt
              }
            >
              {props.name}{" "}
            </Text>
          ))} */}

        {props.name != "Clear" && props.name != "ReOrder" ? (
          <Text
            style={
              myState ? styles.itemTextStyleSelected : styles.itemTextStyle
            }
          >
            {props.name}{" "}
          </Text>
        ) : (
          <Text
            style={
              myState
                ? styles.itemTextStyleSelectedPrompt
                : styles.itemTextStylePrompt
            }
          >
            {props.name == "ReOrder" ? "Order" : props.name}{" "}
          </Text>
        )}

        {props.name == "Name" && myState < 2 && (
          <View style={{ paddingLeft: 5 }}>
            <MyIcons
              name="AB_asc"
              customStyle={
                myState ? styles.itemTextStyleSelected : styles.itemTextStyle
              }
              customStyleOverLay={styles.overlayIcon}
              size={24}
            ></MyIcons>
          </View>
        )}
        {props.name == "Name" && myState == 2 && (
          <View style={{ paddingLeft: 5 }}>
            <MyIcons
              name="AB_desc"
              customStyle={
                myState ? styles.itemTextStyleSelected : styles.itemTextStyle
              }
              customStyleOverLay={styles.overlayIcon}
              size={24}
            ></MyIcons>
          </View>
        )}

        {props.name == "Rating" && myState < 2 && (
          <View style={{ paddingLeft: 12 }}>
            <MyIcons
              name="rating_desc"
              customStyle={
                myState ? styles.itemTextStyleSelected : styles.itemTextStyle
              }
              customStyleOverLay={styles.overlayIcon}
              size={24}
            ></MyIcons>
          </View>
        )}
        {props.name == "Rating" && myState == 2 && (
          <View style={{ paddingLeft: 12 }}>
            <MyIcons
              name="rating_asc"
              customStyle={
                myState ? styles.itemTextStyleSelected : styles.itemTextStyle
              }
              customStyleOverLay={styles.overlayIcon}
              size={24}
            ></MyIcons>
          </View>
        )}
        {props.name == "Price" && myState < 2 && (
          <View style={{ paddingLeft: 12 }}>
            <MyIcons
              name="price_asc"
              customStyle={
                myState ? styles.itemTextStyleSelected : styles.itemTextStyle
              }
              customStyleOverLay={styles.overlayIcon}
              size={24}
            ></MyIcons>
          </View>
        )}
        {props.name == "Price" && myState == 2 && (
          <View style={{ paddingLeft: 12 }}>
            <MyIcons
              name="price_desc"
              customStyle={
                myState ? styles.itemTextStyleSelected : styles.itemTextStyle
              }
              customStyleOverLay={styles.overlayIcon}
              size={24}
            ></MyIcons>
          </View>
        )}

        <MyIcons
          name={props.name}
          customStyle={
            myState ? styles.itemTextStyleSelected : styles.itemTextStyle
          }
          customStyleOverLay={styles.overlayIcon}
          size={24}
        ></MyIcons>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "lightblue",
    // paddingTop: 5,
    // paddingBottom: 5,
    // paddingHorizontal: 20,
    padding: 8,
  },
  myItemStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  itemStyleSelected: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    ////backgroundColor: "#43a275",
    //backgroundColor: "#89b9c4",

    backgroundColor: "#72b3c2",
    //backgroundColor: "#pink",

    // paddingTop: 5,
    // paddingBottom: 5,
    // paddingHorizontal: 20,
    padding: 8,
  },
  itemTextStyle: {
    color: "black",
  },
  itemTextStyleSelected: { color: "white" },
  itemTextStylePrompt: {
    color: "black",
    fontStyle: "italic",
  },
  itemTextStyleSelectedPrompt: { color: "white", fontStyle: "italic" },
  overlayIcon: {
    position: "absolute",
    top: -2,
    left: 6,
  },
  //   overlayIcon: {
  //     position: "absolute",
  //     top: -2,
  //     //
  //     left: 8,
  //   },
});

export default SearchBarItem;
