import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MyIcons from "../MyIcons";
import { useState } from "react";

const MoreInfo = ({
  wantInfo,
  setWantInfo,
  initialConsultFee,
  followUpConsultFee,
}) => {
  //const [wantInfo, setWantInfo] = useState(true);

  //const setWantInfo = { setWantInfo };

  const toggleBoolean = () => {
    setWantInfo((prevCount) => !prevCount);
  };

  return (
    <View>
      <View style={styles.elementLine}>
        <View style={styles.iconCircle}>
          <MyIcons
            name="Consult Fee"
            customStyle={styles.customStyle}
            //customStyleOverLay={styles.overlayIcon2}
            size={44}
          ></MyIcons>
        </View>
        <Text style={styles.myText}>Consultation fee </Text>
        <TouchableOpacity
          onPress={toggleBoolean}
          style={{
            width: 40,
            height: 40,
            backgroundColor: "lightblue",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!wantInfo ? (
            <MyIcons name="ToOpen" customStyle={styles.OpenArrow} size={24} />
          ) : (
            <MyIcons name="ToClose" customStyle={styles.OpenArrow} size={24} />
          )}
        </TouchableOpacity>
      </View>
      {wantInfo && (
        <View style={{ backgroundColor: "black", alignItems: "center" }}>
          <Text style={styles.myText2}>
            Initial Consultation Fee ${initialConsultFee}
          </Text>
          <Text style={styles.myText2}>
            Follow Up Consultation Fee ${followUpConsultFee}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  OpenArrow: {
    color: "black",
  },
  myText: {
    color: "white",
    fontSize: 24,
    //backgroundColor: "pink",
    paddingLeft: 30,
  },
  myText2: {
    color: "white",
    fontSize: 14,
    //backgroundColor: "orange",
    paddingLeft: 30,
  },
  elementLine: {
    //backgroundColor: "purple",
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "flex-start",
    padding: 30,
    //paddingVertical: 30,
  },
  iconCircle: {
    backgroundColor: "#43a275",
    //padding: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MoreInfo;
