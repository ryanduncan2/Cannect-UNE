import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../CityComponents/BackButton";
import EntryBackButton from "../EntryComponents/EntryBackButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import CircleImage from "../CityComponents/CircleImage";
import StarsItem from "../StarsItem";
import StarsRating from "../EntryComponents/StarsRating";
import TextEntry from "../EntryComponents/TextEntry";
import { useAuth } from "../AuthContext";
import api from "../../Auth/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Entry = () => {
  const navigation = useNavigation();

  const { accessToken, refreshAuthToken } = useAuth();

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
    isUpdate,
    oldText,
    oldRating,
    review_id,
    isFeedback,
  } = route.params;

  const [myRating, setMyRating] = useState(isUpdate ? oldRating : 0);
  const [myText, setMyText] = useState(isUpdate ? oldText : "");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    if (isUpdate) {
      // Check if the current values are different from the old values
      setIsButtonEnabled(myRating !== oldRating || myText !== oldText);
    } else {
      // Check if new review fields are filled
      setIsButtonEnabled(myRating > 0 || myText.length > 0);
    }
  }, [myRating, myText, oldRating, oldText, isUpdate]);

  const handleAddReview = async () => {
    console.log("in Entry.js, isFeedback", isFeedback);
    console.log(isUpdate ? "updating" : "creating");

    const url =
      isFeedback == undefined
        ? isUpdate
          ? "/review/update"
          : "/review/create"
        : "/feedback/create"; // Relative URL for the review API endpoint

    const requestBody = isUpdate
      ? {
          publicID: review_id,
          newText: myText,
          newRating: myRating,
        }
      : {
          clinic_id: public_id,
          text: myText,
          rating: myRating,
        };

    try {
      // Make the POST request using your api instance (Axios)
      let response = await api.post(url, requestBody);

      // If successful, navigate to the City screen
      if (response.status === 200) {
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
      } else {
        throw new Error(
          `Failed to create or update review: ${response.statusText}`,
        );
      }
    } catch (error) {
      // Display an error alert and log the error message
      Alert.alert(
        "Error",
        "An error occurred while creating or updating the review.",
      );
      console.error("Error creating clinic:", error);
    }
  };

  // const handleAddReview = async () => {
  //   const url = isUpdate
  //     ? "http://192.168.1.109:4560/api/review/update"
  //     : "http://192.168.1.109:4560/api/review/create";

  //   const requestBody = {
  //     clinic_id: public_id,
  //     text: myText,
  //     rating: myRating,
  //   };

  //   try {
  //     // Make the initial POST request
  //     let response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`, // Use the current access token
  //       },
  //       body: JSON.stringify(requestBody),
  //     });

  //     // If the response status is 401, refresh the token and retry the request
  //     if (response.status === 401) {
  //       console.log("Access token expired, refreshing token...");
  //       await refreshAuthToken(); // Refresh the access token

  //       // Retry the POST request with the new access token
  //       response = await fetch(url, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`, // Updated access token after refresh
  //         },
  //         body: JSON.stringify(requestBody),
  //       });
  //     }

  //     // Check if the response is still not OK after retry
  //     if (!response.ok) {
  //       throw new Error(
  //         `Failed to create or update review: ${response.statusText}`,
  //       );
  //     }

  //     // If successful, navigate to the City screen
  //     navigation.navigate("City", {
  //       public_id,
  //       clinicName,
  //       pharmaBool,
  //       noReferralBool,
  //       concessionBool,
  //       noConsultFeeBool,
  //       rating,
  //       website,
  //       initialConsultFee,
  //       followUpConsultFee,
  //     });
  //   } catch (error) {
  //     // Display an error alert and log the error message
  //     Alert.alert("Error", "An error occurred while creating the review.");
  //     console.error("Error creating clinic:", error);
  //   }
  // };

  //const [myRating, setMyRating] = useState(0);
  //const [myText, setMyText] = useState("");

  //console.log("in Entry: ", isUpdate, " : ", oldRating, " : ", oldText);

  // const handleAddReview = async () => {
  //   const url = isUpdate
  //     ? "http://192.168.1.109:4560/api/review/update"
  //     : "http://192.168.1.109:4560/api/review/create";

  //   const requestBody = {
  //     clinic_id: public_id,
  //     //clinic_id: "clinic01",
  //     text: myText,
  //     rating: myRating,
  //   };

  //   try {
  //     // Make the POST request with the Authorization header
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify(requestBody),
  //     });

  //     // Check if the response is successful
  //     if (!response.ok) {
  //       throw new Error("in entry error", response.statusText);
  //     } else {
  //       navigation.navigate("City", {
  //         public_id,
  //         clinicName,
  //         pharmaBool,
  //         noReferralBool,
  //         concessionBool,
  //         noConsultFeeBool,
  //         rating,
  //         website,
  //         initialConsultFee,
  //         followUpConsultFee,
  //       });
  //     }
  //   } catch (error) {
  //     Alert.alert("Error", "An error occurred while creating the review.");
  //     console.error("Error creating clinic:", error);
  //   }
  // };

  const handleFeedback = async () => {
    //const reviewID = encodeURIComponent(review_id); // Encode the review ID
    const url = `/feedback/create`;
    const a = await AsyncStorage.getItem("login_username");

    const requestBody = {
      text: `from clinic: ${clinicName} from user: ${a} message: ${myText}`,
    };

    try {
      // Make the DELETE request with the reviewID as a query parameter
      const response = await api.post(url, requestBody);

      // Check if the response is successful
      if (response.status === 200) {
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
      } else {
        const errorData = response.data;
        Alert.alert("Error", errorData.message || "Failed to create feedback.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while deleting the review.");
      console.error("Error deleting review:", error);
    }
  };

  const handleDeleteReview = async () => {
    //const reviewID = encodeURIComponent(review_id); // Encode the review ID
    const url = `/review/delete`;

    try {
      // Make the DELETE request with the reviewID as a query parameter
      const response = await api.delete(url, {
        params: { reviewID: review_id }, // Pass the query parameter here
      });

      // Check if the response is successful
      if (response.status === 200) {
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
      } else {
        const errorData = response.data;
        Alert.alert("Error", errorData.message || "Failed to delete review.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while deleting the review.");
      console.error("Error deleting review:", error);
    }
  };

  // const handleDeleteReview = async () => {
  //   const url = "http://192.168.1.109:4560/api/review/delete";

  //   const requestBody = {
  //     reviewID: review_id,
  //   };

  //   try {
  //     // Make the POST request with the Authorization header
  //     const response = await fetch(url, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify(requestBody),
  //     });

  //     const responseText = await response.text();
  //     console.log("Raw response: '", responseText, "'", responseText.length);

  //     // Check if the response is successful

  //     if (responseText.length === 2) {
  //       navigation.navigate("City", {
  //         public_id,
  //         clinicName,
  //         pharmaBool,
  //         noReferralBool,
  //         concessionBool,
  //         noConsultFeeBool,
  //         rating,
  //         website,
  //         initialConsultFee,
  //         followUpConsultFee,
  //       });
  //     }

  //     // else if (response.status === 200 || responseText.length == 2) {
  //     //   const data = await response.json();
  //     //   Alert.alert("Success", "review created successfully!");
  //     // }
  //     else {
  //       const errorData = await response.json();
  //       Alert.alert("Error", errorData.message || "Failed to create review.");
  //     }
  //   } catch (error) {
  //     Alert.alert("Error", "An error occurred while creating the review.");
  //     console.error("Error creating clinic:", error);
  //   }
  // };

  // const handleCreateClinic = async () => {
  //   // Endpoint for creating a clinic
  //   const url = "http://192.168.1.109:4560/api/clinic/create"; // Replace with your actual URL

  //   // Request body data
  //   const requestBody = {
  //     clinic_id: clinicId,
  //     text: text,
  //     rating: rating,
  //   };

  //   try {
  //     // Make the POST request with the Authorization header
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
  //       },
  //       body: JSON.stringify(requestBody),
  //     });

  //     // Check if the response is successful
  //     if (response.status === 200) {
  //       const data = await response.json();
  //       Alert.alert("Success", "Clinic created successfully!");
  //     } else {
  //       const errorData = await response.json();
  //       Alert.alert("Error", errorData.message || "Failed to create clinic.");
  //     }
  //   } catch (error) {
  //     Alert.alert("Error", "An error occurred while creating the clinic.");
  //     console.error("Error creating clinic:", error);
  //   }
  // };

  return (
    <View style={style.container}>
      <View style={style.backButton}>
        <EntryBackButton></EntryBackButton>

        <Text style={[style.cityName, style.cityText]}>{clinicName}</Text>
      </View>

      {/* <View style={style.style1}>
        <Text style={style.style3}>Rate</Text>
      </View> */}

      {isFeedback == undefined ? (
        <View style={style.style1}>
          <StarsRating
            setMyRating={setMyRating}
            setMyText={setMyText}
            isUpdate={isUpdate}
            oldRating={oldRating}
            oldText={oldText}
          ></StarsRating>
        </View>
      ) : (
        <View></View>
      )}

      <View>
        <TextEntry myText={myText} setMyText={setMyText}></TextEntry>
      </View>

      {/* <TouchableOpacity
        style={[
          style.style5,
          { opacity: isButtonEnabled ? 1 : 0.2 }, // Apply opacity based on button enabled state
        ]}
        disabled={!isButtonEnabled} // Disable button if no changes
        onPress={() => {
          isUpdate ? handleFeedback() : handleAddReview();
        }}
      >
        <Text style={style.style6}>{isUpdate ? "Update" : "Submit"}</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={isButtonEnabled ? style.style5 : style.style5_2}
        disabled={!isButtonEnabled}
        onPress={() => {
          isFeedback === undefined ? handleAddReview() : handleFeedback();
        }}
      >
        {isUpdate ? (
          <Text style={style.style6}>Update</Text>
        ) : (
          <Text style={style.style6}>Submit</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={style.style5}
        onPress={() => {
          handleDeleteReview();
        }}
      >
        {isUpdate && <Text style={style.style7}>Delete</Text>}
      </TouchableOpacity>
    </View>
  );
};

// const style = StyleSheet.create({

//   backButton: {
//     backgroundColor: "#c7f2ce",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//   },
// });
const style = StyleSheet.create({
  style1: {
    // backgroundColor: "pink",
    alignItems: "center",
    marginTop: 60,
  },

  style2: {
    // backgroundColor: "pink",
    alignItems: "center",
    //marginTop: 60,
  },
  style3: {
    fontSize: 40,
  },
  style4: {
    backgroundColor: "lightblue",
    color: "black",
    height: 40,
    width: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "grey",
  },
  style5: {
    alignItems: "center",
    opacity: 1,
  },
  style5_2: {
    alignItems: "center",
    opacity: 0.2,
  },
  style6: {
    fontSize: 40,
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "grey",
    marginTop: 80,
  },
  style7: {
    fontSize: 40,
    backgroundColor: "lightcoral",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "grey",
    marginTop: 80,
  },

  backButton: {
    //backgroundColor: "lightblue",
    backgroundColor: "#c7f2ce",
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: "#c7f2ce",

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
    fontSize: 25,
    marginRight: 20,
    backgroundColor: "#43a275",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  populationText: {
    fontSize: 25,
    marginLeft: 7.5,
    color: "black",
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
});

export default Entry;
