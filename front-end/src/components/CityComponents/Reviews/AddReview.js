import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MyIcons from "../../MyIcons";
import StarsItem from "../../StarsItem";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddReview = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    public_id,
    clinicName,
    pharmaBool,
    noReferralBool,
    concessionBool,
    noConsultFeeBool,
    rating,
    website,
    initialConsultFee,
    followUpConsultFee,
  } = route.params;

  return (
    <TouchableOpacity
      style={styles.style1}
      onPress={() => {
        //console.log("in addreview:", clinicName);
        // navigation.navigate("Entry");
        navigation.navigate("Entry", {
          public_id,
          clinicName,
          pharmaBool,
          noReferralBool,
          concessionBool,
          noConsultFeeBool,
          rating,
          website,
          initialConsultFee,
          followUpConsultFee,
          isUpdate: false,
        });
      }}
    >
      <Text>Rate</Text>

      <Text> and Review </Text>

      <MyIcons name="RateReview"></MyIcons>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  style1: {
    backgroundColor: "lightblue",
    borderColor: "grey",
    borderWidth: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    margin: 25,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default AddReview;
