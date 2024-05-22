import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const StartPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar style="dark" />
      <ActivityIndicator size={"large"} />
      <Text style={{ fontSize: 15, paddingTop: 20 }}>Getting there . . . </Text>
    </View>
  );
};

export default StartPage;

const styles = StyleSheet.create({});
