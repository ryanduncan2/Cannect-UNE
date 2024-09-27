import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  Alert,
} from "react-native";
import StarsItem from "../../StarsItem";
import MyIcons from "../../MyIcons";
import CircleImage from "../CircleImage";
import ReviewsSummary from "./ReviewsSummary";
//import { useAuth } from "../../AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUserId } from "../../../Auth/app";

const ReadReview = ({ relevantReviews, myrating, ratingsLength }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [text1, setText1] = useState("");

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

  // State to handle the expansion of individual reviews
  const [expandedReviews, setExpandedReviews] = useState({});
  const [reviewOrder, setReviewOrder] = useState("Newest");
  const [userID, setUserID] = useState(null);

  const options = {
    timeZone: "Australia/Sydney",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserID(id);
    };

    fetchUserId();
  }, []);

  const sortReviews = (reviews, order) => {
    return [...reviews].sort((a, b) => {
      switch (order) {
        case "Newest":
          return new Date(b.date) - new Date(a.date); // Newest first
        case "Oldest":
          return new Date(a.date) - new Date(b.date); // Oldest first
        case "Highest":
          return b.rating - a.rating; // Highest rating first
        case "Lowest":
          return a.rating - b.rating; // Lowest rating first
        default:
          return 0;
      }
    });
  };

  // Sorted reviews based on reviewOrder
  const relevantReviews2 = sortReviews(relevantReviews, reviewOrder);

  // Function to toggle review expansion
  const toggleReview = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handlePress = (oldText, oldRating, review_id) => {
    //Alert.alert(myText);
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
      isUpdate: true,
      oldText,
      oldRating,
      review_id,
    });
  };

  // Function to render each review item
  const renderItem = ({ item, index }) => {
    const over = item.review.length >= 150;
    const isTruncated = !expandedReviews[index];
    //
    // console.log(
    //   "in ReadReview, item.reviewer and userID: ",
    //   item.reviewer,
    //   userID,
    // );
    if (item.reviewer == userID) {
      //setText1(item.review);
    }
    return (
      <Pressable
        //onPress={item.reviewer == userID ? null : null}
        onPress={() => {
          const oldText = item.review;
          const oldRating = item.rating;
          const review_id = item.review_id;
          // console.log(oldText, oldRating);
          item.reviewer == userID
            ? handlePress(oldText, oldRating, review_id)
            : null;
        }}
        style={({ pressed }) => [
          item.reviewer == userID ? styles.style1_2 : styles.style1,
          // Change opacity when pressed, similar to TouchableOpacity
          { opacity: pressed && item.reviewer == userID ? 0.5 : 1 },
        ]}
        //style={item.reviewer == userID ? styles.style1_2 : styles.style1}
      >
        <View style={styles.style3}>
          <StarsItem rating={item.rating} />
          {/* <Text style={styles.style2}> ({item.date.toLocaleDateString()})</Text> */}
          {/* <Text style={styles.style2}>
            {" "}
            ({item.date.toLocaleDateString("en-AU", options)})
          </Text> */}
          <Text style={styles.style2}>
            {item.date
              ? new Date(item.date).toLocaleDateString("en-AU", options)
              : "Invalid Date"}
          </Text>
        </View>

        <Text style={styles.style2}>
          {isTruncated && over
            ? item.review.substring(0, 150) + "..."
            : item.review}
        </Text>

        {over && (
          <TouchableWithoutFeedback onPress={() => toggleReview(index)}>
            <View style={styles.style8}>
              {/* <Text style={styles.style2}>
              {isTruncated ? "Show more" : "Show less"}
            </Text> */}
              {isTruncated && (
                <MyIcons
                  name="ToOpen"
                  size={24}
                  customStyle={styles.customStyle}
                ></MyIcons>
              )}
              {!isTruncated && (
                <MyIcons
                  name="ToClose"
                  size={24}
                  customStyle={styles.customStyle}
                ></MyIcons>
              )}
            </View>
          </TouchableWithoutFeedback>
        )}
        {item.reviewer == userID && (
          <Text style={styles.style2_2}>(Your Review)</Text>
        )}
      </Pressable>
    );
  };

  // Header component with sorting buttons
  const renderHeader = () => (
    <View>
      <ReviewsSummary
        myrating={myrating}
        ratingsLength={ratingsLength}
        relevantReviews={relevantReviews}
      />
      {relevantReviews.length > 1 && (
        <Text style={styles.reviewStyle2}>
          There are {relevantReviews.length} reviews
        </Text>
      )}
      {relevantReviews.length == 1 && (
        <Text style={styles.reviewStyle2}>there is 1 review</Text>
      )}

      <View style={styles.style6}>
        <TouchableOpacity
          style={styles.style7}
          onPress={() => {
            setReviewOrder("Newest");
          }}
        >
          <Text
            style={reviewOrder == "Newest" ? styles.style5_2 : styles.style5}
          >
            Newest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.style7}
          onPress={() => {
            setReviewOrder("Oldest");
          }}
        >
          <Text
            style={reviewOrder == "Oldest" ? styles.style5_2 : styles.style5}
          >
            Oldest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.style7}
          onPress={() => {
            setReviewOrder("Highest");
          }}
        >
          <Text
            style={reviewOrder == "Highest" ? styles.style5_2 : styles.style5}
          >
            Highest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.style7}
          onPress={() => {
            setReviewOrder("Lowest");
          }}
        >
          <Text
            style={reviewOrder == "Lowest" ? styles.style5_2 : styles.style5}
          >
            Lowest
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={relevantReviews2}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={renderHeader} // Header with sorting buttons
      ListFooterComponent={<View style={{ height: 400 }} />}
      contentContainerStyle={styles.style4}
    />
  );
};

const styles = StyleSheet.create({
  style1: {
    backgroundColor: "black",
    borderColor: "grey",
    borderWidth: 5,
    padding: 15,
    borderRadius: 20,
    marginBottom: 25,
  },
  style1_2: {
    backgroundColor: "black",
    borderColor: "lightblue",
    borderWidth: 5,
    padding: 15,
    borderRadius: 20,
    marginBottom: 25,
  },

  reviewStyle2: {
    //backgroundColor: "lightgreen",
    // flex: 1,
    paddingTop: 40,
    alignSelf: "center",
    color: "white",
    fontSize: 20,
  },
  style2: {
    color: "white",
    padding: 5,
  },
  style2_2: {
    color: "lightblue",
    padding: 5,
  },
  style3: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  style4: {
    flexGrow: 1,
  },
  style5: {
    color: "black",
    borderRadius: 12,
    borderColor: "grey",
    backgroundColor: "lightblue",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  style5_2: {
    color: "white",
    borderRadius: 12,
    borderColor: "white",
    backgroundColor: "#72b3c2",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  style6: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    margin: 2,
    justifyContent: "space-around",
  },
  style7: {
    //padding: 19,
    paddingBottom: 10,
  },
  customStyle: {
    color: "white",
    paddingHorizontal: 60,
    paddingVertical: 5,
    // backgroundColor: "lightblue",
    borderRadius: 2,
    // marginTop: 7,
  },
  style8: {
    alignSelf: "center",
  },
});

export default ReadReview;

// import React, { useState } from "react";
// import {
//   FlatList,
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import CircleImage from "../CircleImage";
// import StarsItem from "../../StarsItem";

// const ReadReview = ({ relevantReviews }) => {
//   // Function to render each review item
//   const renderItem = ({ item }) => {
//     //use state 'limited' , default true. ... if limited, show down arrow,
//     const over = item.review.length >= 150;

//     const [isTruncated, setIsTruncated] = useState(true);

//     return (
//       <View style={styles.style1}>
//         <View style={styles.style3}>
//           <StarsItem rating={item.rating} />
//           <Text style={styles.style2}> ({item.date.toLocaleDateString()})</Text>
//         </View>
//         {/* <Text style={styles.style2}>{item.review}</Text> */}

//         {!over && <Text style={styles.style2}>{item.review}</Text>}
//         {over && isTruncated && (
//           <Text style={styles.style2}>
//             {item.review.substring(0, 150) + "..."}
//           </Text>
//         )}

//         {over && <Text style={styles.style2}>arrow needed</Text>}
//       </View>
//     );
//   };

//   // Header component with sorting buttons
//   const renderHeader = () => (
//     <View style={styles.style6}>
//       <TouchableOpacity style={styles.style7}>
//         <Text style={styles.style5}>Newest</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.style7}>
//         <Text style={styles.style5}>Oldest</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.style7}>
//         <Text style={styles.style5}>Highest</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.style7}>
//         <Text style={styles.style5}>Lowest</Text>
//       </TouchableOpacity>
//     </View>
//   );
//   //   {
//   //     if (relevantReviews.length > 0) {
//   return (
//     <FlatList
//       data={relevantReviews}
//       renderItem={renderItem}
//       keyExtractor={(item, index) => index.toString()}
//       ListHeaderComponent={renderHeader} // Header with sorting buttons
//       ListFooterComponent={<View style={{ height: 400 }} />}
//       contentContainerStyle={styles.style4}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   style1: {
//     backgroundColor: "black",
//     borderColor: "grey",
//     borderWidth: 5,
//     padding: 15,
//     borderRadius: 20,
//     marginBottom: 25,
//   },
//   style2: {
//     color: "white",
//     padding: 5,
//   },
//   style3: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 5,
//   },
//   style4: {
//     flexGrow: 1,
//   },
//   style5: {
//     color: "black",
//     borderRadius: 7,
//     borderColor: "grey",
//     backgroundColor: "lightblue",
//     borderWidth: 2,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 5,
//   },
//   style6: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 5,
//     margin: 2,
//   },
//   style7: {
//     padding: 5,
//   },
// });

// export default ReadReview;
