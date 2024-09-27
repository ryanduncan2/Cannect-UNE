import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedbackBase,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import StarsItem from "./StarsItem";
import MyIcons from "./MyIcons";
import {
  createNativeStackNavigation,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import AntDesign from "@expo/vector-icons/AntDesign";

const ListItem = (props) => {
  const {
    isOrderedbyPrice,
    public_id,
    name,
    pharmacyChoice,
    noReferral,
    concession,
    noConsultFee,
    myNavigation,
    rating,
    website,
    initialConsultFee,
    followUpConsultFee,
  } = props;

  //console.log("in ListItems.js", name, public_id);

  const [selectState, setSelectState] = useState(styles.item);

  let myname = "sun";
  if (props.condition == "Clouds") {
    myname = "cloud";
  } else if (props.condition == "Rain") {
    myname = "cloud-rain";
  }

  const padString = (str, length) => {
    const totalPadding = 26 - str.length;

    // If the string is already longer or equal to the desired length, return it as is
    if (totalPadding <= 0) {
      return str;
    }
    return " ".repeat(totalPadding / 2) + str + " ".repeat(totalPadding / 2);

    // const paddingSide = Math.floor(totalPadding / 2);
    // const padding = " ".repeat(paddingSide * 2);

    // // If the total padding is odd, add one more space to the end
    // return padding + str + padding + (totalPadding % 2 !== 0 ? " " : "");
  };

  return (
    <View style={selectState}>
      <View>
        <View style={styles.iconStyles1}>
          <StarsItem rating={rating}></StarsItem>
        </View>
        <View style={styles.iconStyles2}>
          {concession && (
            <MyIcons
              name="Concession"
              size={24}
              color="white"
              customStyle={styles.feather}
            ></MyIcons>
          )}
          {noConsultFee && (
            <MyIcons
              name="No Consult Fee"
              size={24}
              color="white"
              customStyle={styles.feather}
              customStyleOverLay={styles.overlayIcon}
            ></MyIcons>
          )}
          {noReferral && (
            <MyIcons
              name="No Referral"
              size={24}
              color="white"
              customStyle={styles.feather}
              customStyleOverLay={styles.overlayIcon}
            ></MyIcons>
          )}

          {pharmacyChoice && (
            <MyIcons
              name="Pharmacist"
              size={24}
              color="white"
              customStyle={styles.feather}
            ></MyIcons>
          )}
        </View>
        {/* <View style={styles.iconStyles}>
          <StarsItem rating={2.5}></StarsItem>
        </View> */}
      </View>

      {/* <Image
        source={require("../../assets/Cannect_logo_updated.webp")}
        style={styles.tinyLogo}
      /> */}
      <View style={styles.mydata2}>
        <Text style={styles.date}>{padString(name)}</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            //backgroundColor: "pink",
          }}
        >
          {isOrderedbyPrice ? (
            <View style={styles.goButton2}>
              <Text style={styles.goButton2Text}>
                ${initialConsultFee + followUpConsultFee}
              </Text>
            </View>
          ) : (
            <View style={styles.goButton3}></View>
          )}

          <Image
            source={require("../../assets/Cannect_logo_updated.webp")}
            style={styles.tinyLogo}
          />

          <View style={styles.goButton3}></View>
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => {
              myNavigation.navigate("City", {
                public_id: public_id,
                clinicName: name,
                pharmaBool: pharmacyChoice,
                noReferralBool: noReferral,
                concessionBool: concession,
                noConsultFeeBool: noConsultFee,
                rating: rating,
                website: website,
                initialConsultFee: initialConsultFee,
                followUpConsultFee: followUpConsultFee,
              });
            }}
          >
            <AntDesign name="arrowright" size={34} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyles1: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "lightgrey",
    width: 140,
    height: 30,
  },
  iconStyles2: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-around",
    //backgroundColor: "lightblue",
    width: 140,
    height: 50,

    alignItems: "center",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 5,
    backgroundColor: "#43a275",
    //backgroundColor: "pink",
    borderRadius: 15,
  },

  item2: {
    padding: 20,
    marginVertical: 38,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 5,
    //backgroundColor: "43a275",
    backgroundColor: "lightblue",
    borderRadius: 15,
  },

  temp: {
    color: "white",
    fontSize: 20,
    padding: 5,
  },
  date: {
    color: "white",
    fontSize: 15,
    //backgroundColor: "pink",
    textAlign: "center",
  },
  feather: {
    color: "white",
    paddingHorizontal: 3,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    justifyContent: "center",
    //backgroundColor: "red",
    alignSelf: "center",
  },
  mydata2: {
    width: 200,
    height: 80,
    //backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayIcon: {
    position: "absolute",
    top: -2,
    left: 6,
  },
  goButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "grey",
  },
  goButton2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  goButton2Text: {
    color: "black",
  },
  goButton3: {
    width: 50,
    height: 50,
    borderRadius: 25,
    //backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItem;
