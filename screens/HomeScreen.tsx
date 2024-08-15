import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchBook from "../functions/SearchBook";


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PlayBook</Text>
      <SearchBook />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#658",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 70,
    fontSize: 36,
    fontFamily: "DancingScript_400Regular",
  },
});
