import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StarsItem from "../../StarsItem";
import CircleImage from "../CircleImage";
import AddReview from "./AddReview";
import MyIcons from "../../MyIcons";
import { getUserId } from "../../../Auth/app";
//import { useAuth } from "../../AuthContext";
//import { getUserId } from "../../../Auth/app";

const ReviewsSummary = ({ myrating, ratingsLength, relevantReviews }) => {
  const [userID, setUserID] = useState(null);
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserID(id);
    };

    fetchUserId();
  }, []);

  const checkIfReviewed = relevantReviews.some(
    (review) => review.reviewer === userID,
  );

  return (
    <View>
      {userID && (
        <View style={styles.style3}>
          {!checkIfReviewed && <AddReview></AddReview>}

          <View style={styles.style2}>
            <Text style={styles.style1}>{myrating.toFixed(1)} </Text>
            <StarsItem rating={myrating} size={40} />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {ratingsLength > 1 && (
              <Text style={styles.style1_2}>({ratingsLength} ratings</Text>
            )}
            {ratingsLength == 1 && (
              <Text style={styles.style1_2}>(1 rating</Text>
            )}
            {ratingsLength == 0 && (
              <Text style={styles.style1_2}>(no ratings</Text>
            )}

            <Text style={styles.style1_2}>)</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  style1: {
    color: "white",

    fontSize: 24,
  },
  style1_2: {
    color: "lightblue",

    fontSize: 24,
  },
  style2: {
    flexDirection: "row",
    // alignContent: "center",
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  style3: {
    // alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  customStyle: {
    color: "lightblue",
  },
});

export default ReviewsSummary;
