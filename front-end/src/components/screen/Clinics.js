import React, { useCallback, useState, useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  StatusBar,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DATA, DATA2 } from "../utilities/myData";
import {
  createNativeStackNavigation,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import AntDesign from "@expo/vector-icons/AntDesign";

import ListItem from "../ListItem";
import SearchBar from "../SearchBar";
import { useFocusEffect } from "@react-navigation/native";
//import { useAuth } from "../AuthContext";
import api from "../../Auth/app";

const Stack = createNativeStackNavigator();
//const [DATA3, setDATA3] = useState([]);
//const [loading, setLoading] = useState(true);

const Clinics = () => {
  //const { getUserID } = useAuth();
  const [DATA3, setDATA3] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getUserID();
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     // Code here runs when the screen is focused

  //     getUserID();
  //     return () => {
  //       // Code here runs when the screen is unfocused
  //       //alert("fuck this");
  //     };
  //   }, []),
  // );

  useEffect(() => {
    fetchClinics();
  }, [DATA3]);

  // const [refresh, setRefresh] = useState(false);

  // // Trigger re-render by toggling state on focus
  // useFocusEffect(
  //   useCallback(() => {
  //     // Toggle the state to trigger a re-render
  //     setRefresh((prev) => !prev);

  //     // Optional cleanup (not needed in this case)
  //     return () => {};
  //   }, []), // Empty dependency array means it runs every time the screen is focused
  // );

  // useEffect(() => {}, [DATA3]);

  const fetchClinics = async () => {
    try {
      // const response = await fetch(
      //   "http://192.168.1.109:4560/api/clinic/search",
      // ); // Update this URL to your backend URL
      // const data = await response.json();
      const response = await api.get("/clinic/search");
      //console.log(response.data);
      setDATA3(response.data);
    } catch (error) {
      console.error("Error fetching clinics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  //console.log("in Clinics, data is ", DATA3);

  return (
    <Stack.Navigator screenOptions={styles.headerStyle}>
      <Stack.Screen
        name="Filter..."
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ DATA3: DATA3 }}
      />
      {/* <Stack.Screen name="Profile2" component={ProfileScreen2} /> */}
    </Stack.Navigator>
  );
};

////////////
///////////////
/**
 *
 * HOMESCREEN!!!!!!
 */
const HomeScreen = ({ navigation, route }) => {
  const { DATA3 } = route.params;

  const [wantSearch, setWantSearch] = useState(false);
  const [myAll, setMyAll] = useState(false);
  const [myReferral, setMyReferral] = useState(false);
  const [myPharmacist, setMyPharmacist] = useState(false);
  const [myNoConsultFee, setMyNoConsultFee] = useState(false);
  const [myConcession, setMyConcession] = useState(false);
  const [myReOrder, setMyReorder] = useState(false);
  const [myOrderByRating, setMyOrderByRating] = useState(0);
  const [myOrderByAlphaBet, setMyOrderByAlphaBet] = useState(1);
  const [myOrderByPrice, setMyOrderByPrice] = useState(0);
  const [myText, setMyText] = useState("");

  const renderItem3 = ({ item }) => {
    //const [isPrice, setIsPrice] = useState(false);

    return (
      <ListItem
        isOrderedbyPrice={myOrderByPrice}
        public_id={item.public_id}
        name={item.name}
        pharmacyChoice={item.pharmacy_choice}
        noReferral={!item.referral_required}
        concession={item.concession_pricing}
        noConsultFee={item.initial_consultation_fee === 0}
        myNavigation={navigation}
        //rating={Math.min(5, Math.max(0, item.name.length % 5))}
        rating={item.average_rating == null ? 0 : item.average_rating}
        website={item.website}
        // website={"https://google.com"}
        initialConsultFee={item.initial_consultation_fee}
        followUpConsultFee={item.consultation_fee}
      ></ListItem>
    );
  };

  useEffect(() => {
    if (!myReOrder) {
      setMyOrderByRating(0);
      setMyOrderByPrice(0);
      setMyOrderByAlphaBet(1);
    }
  }, [myReOrder]);

  useEffect(() => {
    if (myAll) {
      // alert("we are here!");
      setMyText("");
      setMyAll(false);
    }
  }, [myAll]);

  const mySearch = [
    { mystate: myAll, myfunc: setMyAll, name: "Clear" },
    { mystate: myReOrder, myfunc: setMyReorder, name: "ReOrder" },
    { mystate: myReferral, myfunc: setMyReferral, name: "No Referral" },
    { mystate: myPharmacist, myfunc: setMyPharmacist, name: "Pharmacist" },
    {
      mystate: myNoConsultFee,
      myfunc: setMyNoConsultFee,
      name: "No Consult Fee",
    },
    { mystate: myConcession, myfunc: setMyConcession, name: "Concession" },
  ];

  const mySearch2 = [
    { mystate: myOrderByAlphaBet, myfunc: setMyOrderByAlphaBet, name: "Name" },
    { mystate: myOrderByRating, myfunc: setMyOrderByRating, name: "Rating" },
    { mystate: myOrderByPrice, myfunc: setMyOrderByPrice, name: "Price" },
  ];

  const filteredDATA3 = DATA3.filter((item) => {
    if (myReferral && item.referral_required) return false;
    if (!item.pharmacy_choice && myPharmacist) return false;
    if (item.initial_consultation_fee != 0 && myNoConsultFee) return false;
    if (
      myText.length > 0 &&
      !item.name.toLowerCase().startsWith(myText.toLowerCase())
    ) {
      return false;
    }
    if (!item.concession_pricing && myConcession) return false;
    if (
      myText.length > 0 &&
      !item.name.toLowerCase().startsWith(myText.toLowerCase())
    )
      return false;

    return true;
  }).sort((a, b) => {
    if (myOrderByRating == 1) {
      //console.log("ordering by rating1", b.average_rating, a.average_rating);
      return b.average_rating - a.average_rating; // Sort by rating (descending)
    } else if (myOrderByRating == 2) {
      //console.log("ordering by rating2", b.average_rating, a.average_rating);
      return a.average_rating - b.average_rating;
    }
    // return (
    //   Math.min(5, Math.max(0, b.name.length % 5)) -
    //   Math.min(5, Math.max(0, a.name.length % 5))
    // ); // Sort by rating (descending)
    // } else if (myOrderByRating == 2) {
    //   return (
    //     Math.min(5, Math.max(0, a.name.length % 5)) -
    //     Math.min(5, Math.max(0, b.name.length % 5))
    //   );
    //}
    else if (myOrderByPrice == 1) {
      return (
        a.initial_consultation_fee +
        a.consultation_fee -
        (b.initial_consultation_fee + b.consultation_fee)
      );
    } else if (myOrderByPrice == 2) {
      return (
        b.initial_consultation_fee +
        b.consultation_fee -
        (a.initial_consultation_fee + a.consultation_fee)
      );
    } else if (myOrderByAlphaBet == 1) {
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    } else if (myOrderByAlphaBet == 2) {
      return b.name.localeCompare(a.name, undefined, { sensitivity: "base" });
    }
  });

  const filteredDATA = DATA2.filter((item) => {
    if (myReferral && item.referral) return false;
    if (!item.pharmacyChoice && myPharmacist) return false;
    if (item.initialConsultFee != 0 && myNoConsultFee) return false;
    if (
      myText.length > 0 &&
      !item.name.toLowerCase().startsWith(myText.toLowerCase())
    ) {
      return false;
    }
    if (!item.concession && myConcession) return false;
    if (
      myText.length > 0 &&
      !item.name.toLowerCase().startsWith(myText.toLowerCase())
    )
      return false;

    return true;
  }).sort((a, b) => {
    if (myOrderByRating == 1) {
      return b.rating - a.rating; // Sort by rating (descending)
    } else if (myOrderByRating == 2) {
      return a.rating - b.rating;
    } else if (myOrderByPrice == 1) {
      return (
        a.initialConsultFee +
        a.followUpConsultFee -
        (b.initialConsultFee + b.followUpConsultFee)
      );
    } else if (myOrderByPrice == 2) {
      return (
        b.initialConsultFee +
        b.followUpConsultFee -
        (a.initialConsultFee + a.followUpConsultFee)
      );
    } else if (myOrderByAlphaBet == 1) {
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    } else if (myOrderByAlphaBet == 2) {
      return b.name.localeCompare(a.name, undefined, { sensitivity: "base" });
    }
  });

  const handlePress = () => {
    setWantSearch((prevState) => !prevState); // Toggle the boolean state
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handlePress}>
        {wantSearch ? (
          <View style={styles.searchBarStyleSquare}>
            {/* <Text style={styles.searchBarText}>Close</Text> */}
            <AntDesign name="closecircleo" size={34} color="black" />
            <Text style={styles.searchBarText2}>
              {filteredDATA3.length} clinics
            </Text>
          </View>
        ) : (
          <View style={styles.searchBarStyleCurved}>
            {/* <Text style={styles.searchBarText}>Search...</Text> */}
            <AntDesign name="search1" size={34} color="black" />
            <Text style={styles.searchBarText2}>
              {filteredDATA3.length} clinics
            </Text>
          </View>
        )}
      </Pressable>
      {wantSearch && (
        <View style={{ backgroundColor: "#c7f2ce", paddingLeft: 20 }}>
          <TextInput
            style={styles.textinputstyle}
            value={myText}
            onChangeText={setMyText}
            placeholder="   search here"
            placeholderTextColor="#888"
          ></TextInput>
        </View>
      )}
      {wantSearch && (
        <View
          style={
            myReOrder
              ? styles.CollapsableSearchBarStyle2
              : styles.CollapsableSearchBarStyle
          }
        >
          <SearchBar mySearch={mySearch}></SearchBar>
        </View>
      )}
      {myReOrder && wantSearch && (
        <View style={styles.CollapsableSearchBarStyle}>
          <SearchBar mySearch={mySearch2}></SearchBar>
        </View>
      )}

      <FlatList
        // data={filteredDATA}
        // renderItem={renderItem}
        data={filteredDATA3}
        renderItem={renderItem3}
      ></FlatList>
    </SafeAreaView>
  );
};

////////////
/**
 *
 * Profile Screen
 */
///////////////

// const ProfileScreen2 = ({ route }) => {
//   const { clinicName } = route.params;
//   return (
//     <View style={styles.profileSettings}>
//       <Text>This is {clinicName} profile</Text>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  searchBarStyleCurved: {
    backgroundColor: "#c7f2ce",
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  searchBarStyleSquare: {
    backgroundColor: "#c7f2ce",
    padding: 20,
    paddingTop: 40,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  searchBarText: {
    fontSize: 20,
  },
  searchBarText2: {
    fontSize: 12,
    fontWeight: "bold",
    paddingTop: 10,
    color: "darkgreen",
  },
  CollapsableSearchBarStyle: {
    backgroundColor: "#c7f2ce",
    //backgroundColor: "#pink",
    paddingHorizontal: 10,
    //paddingVertical: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  CollapsableSearchBarStyle2: {
    backgroundColor: "#c7f2ce",
    //backgroundColor: "#pink",
    paddingHorizontal: 10,
    //paddingVertical: 10,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },

  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "black",
  },
  profileSettings: {
    backgroundColor: "#c7f2ce",
  },
  headerStyle: {
    headerStyle: {
      backgroundColor: "#c7f2ce",
    },
    headerTintColor: "black",
  },
  textinputstyle: {
    backgroundColor: "lightblue",
    color: "black",
    height: 40,
    width: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "grey",
    //padding: 20,
  },
});

export default Clinics;
