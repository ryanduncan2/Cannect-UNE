import React, { useCallback } from "react";

import { View, Text, FlatList, StyleSheet } from "react-native";
import SearchBarItem from "./SearchBarItem";
import { useFocusEffect } from "@react-navigation/native";

const SearchBar = ({ mySearch }) => {
  // const SearchBarData = [
  //   { name: mySearch[0].name, state: mySearch[0], search: mySearch },
  //   { name: mySearch[1].name, state: mySearch[1], search: mySearch },
  //   { name: mySearch[2].name, state: mySearch[2], search: mySearch },
  //   { name: mySearch[3].name, state: mySearch[3], search: mySearch },
  //   { name: mySearch[4].name, state: mySearch[4], search: mySearch },
  //   { name: mySearch[5].name, state: mySearch[5], search: mySearch },
  // ];

  //useCallback
  useFocusEffect(
    useCallback(() => {
      // Code here runs when the screen is focused
      //console.log("Screen is focused");

      return () => {
        // Code here runs when the screen is unfocused
        //alert("search bar collapse");
        //alert("fuck this");
      };
    }, []),
  );

  const SearchBarData = mySearch.map((item) => ({
    name: item.name,
    state: item,
    search: mySearch,
  }));

  const renderItem2 = ({ item }) => {
    return (
      <SearchBarItem name={item.name} state={item.state} search={item.search} />
    );
  };

  return (
    <View>
      {/* <SearchBarItem name="All" />
      <SearchBarItem name="Referral" />
      <SearchBarItem name="Pharmacist" />
      <SearchBarItem name="Consult Fee" />
      <SearchBarItem name="Initial Fee" /> */}
      <FlatList
        data={SearchBarData}
        //data={mySearch}
        renderItem={renderItem2}
        style={styles.searchBarStyle}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        contentContainerStyle={{ paddingRight: 50 }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarStyle: {
    backgroundColor: "#c7f2ce",
    //backgroundColor: "#pink",
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
  },
});

export default SearchBar;
