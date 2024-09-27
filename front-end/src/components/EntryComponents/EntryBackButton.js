import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const EntryBackButton = ({}) => {
  const route = useRoute();
  const navigation = useNavigation();

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
      onPress={() => {
        navigation.navigate("City", {
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
        });
      }}
      title="Back"
      style={styles.myButton}
    >
      <AntDesign name="arrowleft" size={34} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  myButton: {
    backgroundColor: "lightblue",
    width: 50,
    height: 50,
    marginLeft: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "grey",
  },
});

export default EntryBackButton;
