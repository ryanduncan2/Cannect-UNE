import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MyIcons from "../MyIcons";
import DeepLinks from "./DeepLinks";
import MoreInfo from "./MoreInfo";
import { useFocusEffect } from "@react-navigation/native";

const Overview = ({
  pharmaBool,
  noReferralBool,
  concessionBool,
  noConsultFeeBool,
  website,
  hasPhoneNumber,
  hasEmail,
  initialConsultFee,
  followUpConsultFee,
}) => {
  const [wantInfo, setWantInfo] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Code here runs when the screen is focused

      return () => {
        // Code here runs when the screen is unfocused
        setWantInfo(false);
        //alert("fuck this");
      };
    }, []),
  );

  return (
    <ScrollView>
      {/* <DeepLinks myurl="http://www.ynet.co.il" /> */}
      <DeepLinks
        myurl={website}
        myPhoneNumber="0405843883"
        hasPhoneNumber={hasPhoneNumber}
        hasEmail={hasEmail}
      />
      {noConsultFeeBool ? (
        <View style={styles.elementLine}>
          <View style={styles.iconCircle}>
            <MyIcons
              name="No Consult Fee"
              customStyle={styles.customStyle}
              customStyleOverLay={styles.overlayIcon2}
              size={44}
            ></MyIcons>
          </View>

          <Text style={styles.myText}>No consultation fee</Text>
        </View>
      ) : (
        <View style={styles.elementLine43}>
          <MoreInfo
            wantInfo={wantInfo}
            setWantInfo={setWantInfo}
            initialConsultFee={initialConsultFee}
            followUpConsultFee={followUpConsultFee}
          ></MoreInfo>
        </View>
      )}
      {pharmaBool ? (
        <View style={styles.elementLine}>
          <View style={styles.iconCircle}>
            <MyIcons
              name="Pharmacist"
              customStyle={styles.customStyle}
              size={44}
            ></MyIcons>
          </View>

          <Text style={styles.myText}>pharmacy choice</Text>
        </View>
      ) : (
        <View></View>
        //<Text style={styles.myText}>no pharmacy choice</Text>
      )}
      {noReferralBool ? (
        <View style={styles.elementLine}>
          <View style={styles.iconCircle}>
            <MyIcons
              name="No Referral"
              customStyle={styles.customStyle}
              customStyleOverLay={styles.overlayIcon}
              size={44}
            ></MyIcons>
          </View>

          <Text style={styles.myText}>No referral required</Text>
        </View>
      ) : (
        <View></View>
        //<Text style={styles.myText}>Referral required</Text>
      )}
      {concessionBool ? (
        <View style={styles.elementLine}>
          <View style={styles.iconCircle}>
            <MyIcons
              name="Concession"
              customStyle={styles.customStyle}
              size={44}
            ></MyIcons>
          </View>

          <Text style={styles.myText}>Concessions available</Text>
        </View>
      ) : (
        <View></View>
        //<Text style={styles.myText}>no concessions</Text>
      )}
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  iconCircle: {
    backgroundColor: "#43a275",
    //padding: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 24,
    //backgroundColor: "pink",
    paddingLeft: 30,
  },
  customStyle: {
    color: "black",
    //size: 60,
  },
  OpenArrow: {
    color: "white",
  },
  elementLine: {
    //backgroundColor: "pink",
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
  },
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
});

export default Overview;
