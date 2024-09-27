import React, { useCallback, useEffect, useState } from "react";

import {
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  View,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import IconText from "../IconText";
import CircleImage from "../CityComponents/CircleImage";
import StarsItem from "../StarsItem";
import CityItems from "../CityComponents/CityItems";
import BackButton from "../CityComponents/BackButton";
import Overview from "../CityComponents/Overview";
import Review from "../CityComponents/Reviews";
import Reviews from "../CityComponents/Reviews";
//import { useAuth } from "../AuthContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import api from "../../Auth/app";
import { IsLoggedIn } from "../../Auth/app";
import axios from "axios";

const City = ({ route }) => {
  const {
    public_id,
    clinicName,
    pharmaBool,
    noReferralBool,
    concessionBool,
    noConsultFeeBool,
    //rating,
    website,
    initialConsultFee,
    followUpConsultFee,
  } = route.params;

  const [overview, setOverview] = useState(true);
  const [reviews, setReviews] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [hasPhoneNumber, setHasPhoneNumber] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);
  const [count, setCount] = useState(0);
  const [rating, setNewRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  // const [wantInfo, setWantInfo] = useState(true);

  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const status = await IsLoggedIn();
  //     setIsLoggedIn(status);
  //     setLoading(false);
  //   };

  //   checkLoginStatus();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const checkLoginStatus = async () => {
        const status = await IsLoggedIn();
        setIsLoggedIn(status);
        setLoading(false);
      };

      checkLoginStatus();
      resetButtons;
      fetchRating();
      return () => {
        // Code here runs when the screen is unfocused
        //alert("fuck this");
      };
    }, []),
  );

  //const { isLoggedIn } = useAuth();

  const allStateFunctions = [setOverview, setReviews, setFeedback];

  const fetchRating = async () => {
    try {
      const NewName = { clinicName }.clinicName;

      // const response = await fetch(
      //   "http://192.168.1.109:4560/api/clinic/search?name=" + NewName + "",
      // ); // Update this URL to your backend URL
      // const data = await response.json();

      //const response = await api.get("/clinic/search");
      //console.log(response.data);
      // setDATA3(response.data);
      const response = await api.get("clinic/search?name=" + NewName + "");
      // console.log(
      //   response.data[0].average_rating,
      //   response.data[0].total_ratings,
      // );
      // console.log(response.data[0]);

      //const newRating = data[0].rating;
      //console.log("new rating is :", data[0].rating, "for ", data[0].name);
      setNewRating(
        response.data[0].average_rating == null
          ? 0
          : response.data[0].average_rating,
      );
      setTotalRatings(response.data[0].total_ratings);
      // setDATA3(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetButtons = () => {
    //alert("Button pressed in Child Component!");
    setOverview(true);
    setReviews(false);
    setFeedback(false);
    // setWantInfo(true);
  };

  const toggleBoolean = () => {
    setCount((prevCount) => prevCount + 1);
    if (count % 2 == 0) {
      setHasPhoneNumber((prevState) => !prevState); // Toggle the boolean state
    }
    if (count % 3 == 0) {
      setHasEmail((prevState) => !prevState);
    }
    console.log("//                       //");
    console.log("//                       //");
    console.log("//                       //");
  };

  // console.log("in City.js", public_id);
  // console.log("in City.js", clinicName);
  // console.log("in City.js", { public_id });

  fetchRating();
  return (
    <SafeAreaView style={style.container}>
      <View style={style.backButton}>
        <BackButton func={resetButtons}></BackButton>
      </View>

      <View style={style.topbar1}>
        <View style={style.topbar2}>
          <TouchableWithoutFeedback onPress={toggleBoolean}>
            <View style={style.circleStyle}>
              <CircleImage />
              <Text style={style.photoTextStyle}>no photos </Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={style.topbarright}>
            <Text style={[style.cityName, style.cityText]}>{clinicName}</Text>
            <View style={style.ratingStyle}>
              <Text style={style.cityText}>{rating.toFixed(1)} </Text>
              <StarsItem rating={rating} />
              {/* <Text style={style.cityText}>(13 ratings)</Text> */}
            </View>
            <Text style={style.cityText}>({totalRatings} ratings)</Text>
          </View>
        </View>
      </View>
      <View style={style.topbar3}>
        <CityItems
          name={"overview"}
          state={overview}
          stateFunction={setOverview}
          allStateFunctions={allStateFunctions}
          // wantInfo={wantInfo}
          // setWantInfo={setWantInfo}
        />
        <CityItems
          name={"reviews"}
          state={reviews}
          stateFunction={setReviews}
          allStateFunctions={allStateFunctions}
        />
        {isLoggedIn && (
          <CityItems
            name={"feedback"}
            state={feedback}
            stateFunction={setFeedback}
            allStateFunctions={allStateFunctions}
          />
        )}
      </View>
      {overview && (
        <Overview
          public_id={public_id}
          pharmaBool={pharmaBool}
          noReferralBool={noReferralBool}
          concessionBool={concessionBool}
          noConsultFeeBool={noConsultFeeBool}
          website={website}
          hasPhoneNumber={hasPhoneNumber}
          hasEmail={hasEmail}
          initialConsultFee={initialConsultFee}
          followUpConsultFee={followUpConsultFee}
        />
      )}
      {reviews && isLoggedIn && (
        <View>
          <Reviews
            name={clinicName}
            rating={rating}
            public_id={public_id}
          ></Reviews>
        </View>
      )}
      {reviews && !isLoggedIn && (
        <TouchableOpacity
          style={style.notLoggedInReview1}
          onPress={() => {
            navigation.navigate("HomeScreen", {});
          }}
        >
          <Text style={style.notLoggedInReview2}>
            Click here to join or login!
          </Text>
        </TouchableOpacity>
      )}
      {feedback && (
        <View style={style.reviewContainer}>
          <TouchableOpacity
            style={style.notLoggedInReview1}
            onPress={() => {
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
                isFeedback: true,
              });
            }}
          >
            <Text style={style.notLoggedInReview2}>
              Click here to send Feedback
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default City;

const style = StyleSheet.create({
  backButton: {
    //backgroundColor: "pink",
    backgroundColor: "#c7f2ce",
  },
  photoTextStyle: {
    position: "absolute",
    top: 90,
    left: 35,
    color: "white",
  },
  ratingStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  topbarright: {
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "pink",
    paddingRight: 20,
  },
  circleStyle: {},
  topbar1: {
    backgroundColor: "#43a275",
    //backgroundColor: "pink",
    height: 150,
    justifyContent: "space-around",
    // flexDirection: "row",
    // alignItems: "center",
  },
  topbar2: {
    // backgroundColor: "mediumseagreen",
    // height: 200,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  topbar3: {
    //backgroundColor: "lightblue",
    backgroundColor: "#c7f2ce",
    //backgroundColor: "#387d65",
    //backgroundColor: "#2e6856",
    flexDirection: "row",
    justifyContent: "space-evenly",
    //alignContent: "center",
    alignItems: "center",
    height: 60,
  },
  topbar4: {
    backgroundColor: "pink",
    //backgroundColor: "#387d65",
    //backgroundColor: "#2e6856",
    height: 40,
  },
  container: {
    flex: 1,
    //backgroundColor: "#0a0f0a",
    backgroundColor: "black",

    //backgroundColor: "black",
    // marginTop: StatusBar.currentHeight || 0,
  },
  imagelayout: {
    flex: 1,
  },
  cityName: {
    fontSize: 25,
  },
  countryName: {
    fontSize: 30,
  },
  cityText: {
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "bold",
    color: "white",
  },
  populationText: {
    fontSize: 25,
    marginLeft: 7.5,
    color: "blackx",
  },
  populationWrapper: {
    justifyContent: "center",
    marginTop: 30,
  },
  riseSetWrapper: {
    justifyContent: "space-around",
    marginTop: 30,
  },
  riseSetText: {
    fontSize: 20,
    color: "white",
  },
  rowLayout: { flexDirection: "row", alignItems: "center" },
  reviewContainer: { flex: 1 },

  notLoggedInReview1: {
    backgroundColor: "lightblue",
    margin: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "grey",
  },
  notLoggedInReview2: {
    color: "black",
    marginVertical: 30,
    fontSize: 20,
  },
});
