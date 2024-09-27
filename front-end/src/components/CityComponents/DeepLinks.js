import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MyIcons from "../MyIcons";

const DeepLinks = ({ myurl, myPhoneNumber, hasPhoneNumber, hasEmail }) => {
  const openWebsite = () => {
    //const url = "http://ynet.co.il";

    Linking.openURL(myurl).catch((err) =>
      console.error("An error occurred", err),
    );
  };

  const callNumber = () => {
    const url = `tel:${myPhoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open this URL: " + url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <View style={styles.element1}>
      <View style={styles.elementLine}>
        <TouchableOpacity
          style={styles.iconCircle2}
          onPress={() => {
            openWebsite();
          }}
        >
          <MyIcons
            name="Website"
            customStyle={styles.customStyle}
            size={44}
          ></MyIcons>
        </TouchableOpacity>

        <Text style={styles.myText}>Website</Text>
      </View>

      {hasEmail && (
        <View style={styles.elementLine}>
          <TouchableOpacity style={styles.iconCircle2} onPress={() => {}}>
            <MyIcons
              name="Email"
              customStyle={styles.customStyle}
              size={44}
            ></MyIcons>
          </TouchableOpacity>
          <Text style={styles.myText}>Email</Text>
        </View>
      )}

      {hasPhoneNumber && (
        <View style={styles.elementLine}>
          <TouchableOpacity
            style={styles.iconCircle2}
            onPress={() => {
              callNumber();
            }}
          >
            <MyIcons
              name="Phone"
              customStyle={styles.customStyle}
              size={44}
            ></MyIcons>
          </TouchableOpacity>

          <Text style={styles.myText}>Phone</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  customStyle: {
    color: "black",
    //size: 60,
  },
  element1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  elementLine: {
    //backgroundColor: "pink",
    flexDirection: "column",
    alignItems: "center",
    //justifyContent: "center",
    padding: 30,
  },
  iconCircle2: {
    backgroundColor: "lightblue",
    //padding: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  myText: {
    color: "white",
    fontSize: 14,
    //backgroundColor: "pink",
  },
});

export default DeepLinks;
