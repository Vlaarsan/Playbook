import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SearchBook from "../functions/SearchBook";
import ModalBookInfos from "../modals/ModalBookInfos";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBook />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#658",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
