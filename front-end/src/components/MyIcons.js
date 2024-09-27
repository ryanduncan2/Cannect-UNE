import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Foundation from "@expo/vector-icons/Foundation";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";

const MyIcons = (props) => {
  const name = props.name;

  if (props.name == "RateReview") {
    return (
      <View>
        <FontAwesome6 name="pen-to-square" size={24} color="black" />
        {/* <MaterialIcons name="rate-review" size={24} color="black" /> */}
      </View>
    );
  }

  if (props.name == "ToOpen") {
    return (
      <View>
        {/* <Entypo
          name="triangle-down"
          style={props.customStyle}
          size={props.size}
        /> */}
        <AntDesign name="down" style={props.customStyle} size={props.size} />
      </View>
    );
  } else if (props.name == "ToClose") {
    return (
      <View>
        {/* <Entypo
          name="triangle-up"
          style={props.customStyle}
          size={props.size}
        /> */}
        <AntDesign name="up" style={props.customStyle} size={props.size} />
      </View>
    );
  } else if (props.name == "Website") {
    return (
      <View>
        <MaterialCommunityIcons
          name="web"
          size={props.size}
          style={props.customStyle}
        />
      </View>
    );
  } else if (props.name == "Email") {
    return (
      <View>
        <Fontisto name="email" size={props.size} style={[props.customStyle]} />
      </View>
    );
  } else if (name == "Phone") {
    return (
      <View>
        <FontAwesome5
          name="phone"
          size={(3 / 4) * props.size}
          style={[props.customStyle]}
        />
      </View>
    );
  } else if (props.name == "ReOrder") {
    return (
      <View>
        <FontAwesome
          name="reorder"
          size={props.size}
          style={props.customStyle}
        />
      </View>
    );
  } else if (props.name == "No Referral") {
    return (
      <View>
        <Fontisto
          name="prescription"
          size={props.size}
          style={[props.customStyle, props.customStyleOverLay]}
        />
        {/* <Foundation name="prohibited" size={30} style={props.customStyle} /> */}
        <FontAwesome6
          name="slash"
          size={props.size}
          style={props.customStyle}
        />
      </View>
    );
  } else if (name == "Pharmacist") {
    return (
      <MaterialIcons
        name="local-pharmacy"
        size={props.size}
        style={props.customStyle}
      />
    );
  } else if (name == "No Consult Fee") {
    return (
      <View>
        <FontAwesome6
          name="hand-holding-dollar"
          size={(5 / 6) * props.size}
          style={[props.customStyle, props.customStyleOverLay]}
        />
        {/* <Foundation name="prohibited" size={30} style={props.customStyle} /> */}
        <FontAwesome6
          name="slash"
          size={props.size}
          style={[props.customStyle]}
        />
      </View>
    );
  } else if (name == "Consult Fee") {
    return (
      <View>
        <FontAwesome6
          name="hand-holding-dollar"
          size={(5 / 6) * props.size}
          style={[props.customStyle]}
        />
      </View>
    );
  } else if (name == "AB_asc") {
    return (
      <FontAwesome5
        name="sort-alpha-down"
        size={props.size}
        style={[props.customStyle]}
      />
    );
  } else if (name == "AB_desc") {
    return (
      <FontAwesome5
        name="sort-alpha-up"
        size={props.size}
        style={[props.customStyle]}
      />
    );
  } else if (props.name == "rating_desc") {
    return (
      <View>
        <FontAwesome
          name="star-half-empty"
          size={(4 / 5) * props.size}
          style={[props.customStyle]}
        />

        <FontAwesome
          name="long-arrow-down"
          size={(6 / 7) * props.size}
          style={[props.customStyle, styles.styleOverLay3]}
        />
      </View>
    );
  } else if (props.name == "rating_asc") {
    return (
      <View>
        <FontAwesome
          name="star-half-empty"
          size={(4 / 5) * props.size}
          style={[props.customStyle]}
        />

        <FontAwesome
          name="long-arrow-up"
          size={(6 / 7) * props.size}
          style={[props.customStyle, styles.styleOverLay3]}
        />
      </View>
    );
  } else if (props.name == "price_desc") {
    return (
      <View>
        <Feather
          name="dollar-sign"
          size={(4 / 5) * props.size}
          style={[props.customStyle]}
        />

        <FontAwesome
          name="long-arrow-down"
          size={(6 / 7) * props.size}
          style={[props.customStyle, styles.styleOverLay4]}
        />
      </View>
    );
  } else if (props.name == "price_asc") {
    return (
      <View>
        <Feather
          name="dollar-sign"
          size={(4 / 5) * props.size}
          style={[props.customStyle]}
        />

        <FontAwesome
          name="long-arrow-up"
          size={(6 / 7) * props.size}
          style={[props.customStyle, styles.styleOverLay4]}
        />
      </View>
    );
  } else if (name == "Concession") {
    return (
      <MaterialIcons
        name="elderly"
        //size={props.size}
        size={props.size}
        style={props.customStyle}
      />
    );
  } else {
    return <View></View>;
  }
};

//

const styles = StyleSheet.create({
  overlayIcon: {
    position: "absolute",
    top: -2,
    left: 11,
  },
  overlayIcon2: {
    position: "absolute",
    top: -2,
    //
    left: 8,
  },
  styleOverLay3: {
    position: "absolute",
    //top: -2,
    //
    left: -10,
  },
  styleOverLay4: {
    position: "absolute",
    //top: -2,
    //
    left: -8,
  },
});
export default MyIcons;
