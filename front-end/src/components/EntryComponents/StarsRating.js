import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const StarsRating = ({
  setMyText,
  setMyRating,
  isUpdate,
  oldRating,
  oldText,
}) => {
  const [selected, setSelected] = useState([false, false, false, false, false]);

  const isFocused = useIsFocused();

  useEffect(() => {
    // Effect runs when the screen is focused or unfocused
    if (!isFocused) {
      // Modify state when the screen is unfocused

      setSelected([false, false, false, false, false]);

      setMyRating(0);
      setMyText("");
    } else if (isUpdate) {
      selectStars(oldRating - 1);
      setMyText(oldText);
    }
  }, [isFocused]);

  const selectStars = (val) => {
    const newSelected = [...selected];
    for (let i = 0; i < newSelected.length; i++) {
      newSelected[i] = i <= val;
    }
    setSelected(newSelected);
    setMyRating(val + 1);
  };

  return (
    <View>
      {/* <View style={styles.style1}>
        <TouchableOpacity onPress={() => selectStars(0)}>
          <Text style={selected[0] ? styles.style3 : styles.style2}>Bob</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectStars(1)}>
          <Text style={selected[1] ? styles.style3 : styles.style2}>Bob</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectStars(2)}>
          <Text style={selected[2] ? styles.style3 : styles.style2}>Bob</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectStars(3)}>
          <Text style={selected[3] ? styles.style3 : styles.style2}>Bob</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectStars(4)}>
          <Text style={selected[4] ? styles.style3 : styles.style2}>Bob</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.style1}>
        <TouchableOpacity onPress={() => selectStars(0)}>
          <FontAwesome
            name={selected[0] ? "star" : "star-o"}
            style={styles.style2}
            size={50}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectStars(1)}>
          <FontAwesome
            name={selected[1] ? "star" : "star-o"}
            style={styles.style2}
            size={50}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectStars(2)}>
          <FontAwesome
            name={selected[2] ? "star" : "star-o"}
            style={styles.style2}
            size={50}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectStars(3)}>
          <FontAwesome
            name={selected[3] ? "star" : "star-o"}
            style={styles.style2}
            size={50}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectStars(4)}>
          <FontAwesome
            name={selected[4] ? "star" : "star-o"}
            style={styles.style2}
            size={50}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  style1: { flexDirection: "row" },
  style2: {
    padding: 2,
    // backgroundColor: "lightblue",
    margin: 5,
    color: "#72b3c2",
  },
  style3: { padding: 20, backgroundColor: "#72b3c2", margin: 5 },
});

export default StarsRating;
