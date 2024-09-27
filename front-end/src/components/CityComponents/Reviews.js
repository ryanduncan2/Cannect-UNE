import React, { useCallback, useEffect, useState } from "react";
import { REVIEWS } from "../utilities/myReviews";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ReadReview from "./Reviews/ReadReview";
import CircleImage from "./CircleImage";
import ReviewsSummary from "./Reviews/ReviewsSummary";
//import { useAuth } from "../AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import api, { getUserId } from "../../Auth/app";
import { ActivityIndicator } from "react-native";

const Reviews = ({ name, rating, public_id }) => {
  //const clinicID = "clinic01"; // Replace with actual value
  // console.log("in Reviews public_id", public_id);
  const clinicID = public_id;
  const count = 40; // Replace with actual value
  const offset = 0;

  const [DATA, setDATA] = useState([]);
  const [loading, setLoading] = useState(true);

  //const { accessToken, refreshAuthToken, isLoggedIn, userID } = useAuth();

  // useEffect(() => {
  //   fetchClinics();
  // }, []);

  useEffect(() => {}, [DATA]);

  // refreshAuthToken();

  // useEffect(() => {
  //   const initialize = async () => {
  //     if (isLoggedIn) {
  //       await refreshAuthToken();
  //     } else {
  //       console.log("Reviews.js: Problem is you're not logged in");
  //       debugger;
  //     }
  //   };
  //   initialize();
  // }, [isLoggedIn]);

  useFocusEffect(
    useCallback(() => {
      // Code here runs when the screen is focused
      //console.log("about to call fetchClinics in Reviews.js");
      fetchClinics();

      return () => {
        // Code here runs when the screen is unfocused
        //alert("fuck this");
      };
    }, []),
  );

  // const fetchClinics = async () => {
  //   try {
  //     // const url =
  //     //   "http://192.168.1.109:4560/api/clinic/reviews?clinicID=${clinicID}&count=${count}&offset=${offset}";
  //     const url = `http://192.168.1.109:4560/api/clinic/reviews?clinicID=${encodeURIComponent(
  //       clinicID,
  //     )}&count=${count}&offset=${offset}`;

  //     const response = await fetch(
  //       url,

  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`, // Include the access token in the header
  //         },
  //         // body: JSON.stringify(requestBody),
  //       },
  //     );

  //     const data = await response.json();
  //     // console.log("in Reviews.js : ", data);
  //     // console.log("in Reviews.js : ", data[0].account_id);
  //     // console.log("in Reviews.js : ", data[0].public_id);
  //     setDATA(data);
  //     //console.log("REviews: ", data);
  //   } catch (error) {
  //     console.error("Error fetching clinics:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchClinics = async () => {
    console.log("in ReadReview, in fethcClinics");
    try {
      setLoading(true);
      // Create an object for query parameters
      const params = {
        clinic_id: encodeURIComponent(clinicID),
        count: count,
        offset: offset,
      };

      // Make the GET request using the custom axios instance with query parameters
      let response = await api.get("/clinic/reviews", { params });

      // If the response is not OK after retry
      if (!response || response.status !== 200) {
        throw new Error(`Failed to fetch clinics: ${response.statusText}`);
      }

      // Parse the response data
      //const data = response.data;
      if (JSON.stringify(response.data) !== JSON.stringify(DATA)) {
        console.log("in Reviews.js different data");
        setDATA(response.data);
      }
      //setDATA(data); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching clinics in Reviews.js:", error);
    } finally {
      setLoading(false); // Stop loading spinner or indicator
    }
  };

  // const fetchClinics = async () => {
  //   try {
  //     // URL with encoded parameters
  //     const url = `http://192.168.1.109:4560/api/clinic/reviews?clinicID=${encodeURIComponent(
  //       clinicID,
  //     )}&count=${count}&offset=${offset}`;

  //     // Make the initial GET request
  //     let response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`, // Use the current access token
  //       },
  //     });

  //     // If the response status is 401, refresh the token and retry the request
  //     if (response.status === 401) {
  //       console.log("Access token expired, refreshing token...");
  //       const newAccessToken = await refreshAuthToken(); // Call the function to refresh the access token

  //       // Retry the fetch with the new access token
  //       response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${newAccessToken}`, // Access token should be updated inside refreshAuthToken
  //         },
  //       });
  //     }

  //     // Check if the response is still not OK after retry
  //     if (!response.ok) {
  //       console.log(response);
  //       throw new Error(`Failed to fetch clinics: ${response.statusText}`);
  //     }

  //     // Parse the response data
  //     const data = await response.json();
  //     setDATA(data); // Update state with the fetched data
  //   } catch (error) {
  //     console.error("Error fetching clinics:", error);
  //   } finally {
  //     setLoading(false); // Stop loading spinner or indicator
  //   }
  // };

  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }

  const relevantReviews = REVIEWS.filter((item) => {
    if (item.name == name) return true;
  });

  const relevantReviews2 = DATA.map(
    ({ rating, text, account_id, public_id, date_submitted }) => ({
      rating,
      review: text, // Rename 'text' to 'review'
      date: date_submitted,
      name: name,
      reviewer: account_id,
      review_id: public_id,
    }),
  );

  // console.log(" data in REVIEWS is :", DATA);
  // console.log(" MOD data in REVIEWS is :", relevantReviews2);
  //console.log(" old Data in REVIEWS IS ", relevantReviews);

  // {
  //   loading ? <View></View> : ();
  // }

  // if (relevantReviews2.length > 0) {
  //   return (
  //     <View>
  //       <ReadReview
  //         relevantReviews={relevantReviews2}
  //         myrating={rating}
  //         ratingsLength={relevantReviews2.length}
  //       ></ReadReview>
  //     </View>
  //   );
  // } else {
  //   console.log("in Reviews, no reveiews");
  //   return (
  //     <View style={styles.reviewStyle1}>
  //       <ReviewsSummary
  //         myrating={rating}
  //         ratingsLength={relevantReviews2.length}
  //         relevantReviews={relevantReviews2}
  //       ></ReviewsSummary>
  //       <Text style={styles.reviewStyle2}>There are no reviews yet</Text>
  //     </View>
  //   );
  // }

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" /> // You can replace this with <ActivityIndicator /> for a loading spinner
  ) : relevantReviews2.length > 0 ? (
    <View>
      <ReadReview
        relevantReviews={relevantReviews2}
        myrating={rating}
        ratingsLength={relevantReviews2.length}
      />
    </View>
  ) : (
    <View style={styles.reviewStyle1}>
      <ReviewsSummary
        myrating={rating}
        ratingsLength={relevantReviews2.length}
        relevantReviews={relevantReviews2}
      />
      <Text style={styles.reviewStyle2}>There are no reviews yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewStyle1: {
    //backgroundColor: "lightgreen",
    // flex: 1,
  },
  reviewStyle2: {
    //backgroundColor: "lightgreen",
    // flex: 1,
    paddingVertical: 40,
    alignSelf: "center",
    color: "white",
    fontSize: 20,
  },
  container: {
    flex: 1, // This makes the container take up the full screen
  },
  expandingView: {
    flex: 1, // This makes the view expand to take up all available space
    backgroundColor: "pink", // Background color of the view
  },
});

export default Reviews;
