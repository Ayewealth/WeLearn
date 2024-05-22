import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  SlideInDown,
  SlideOutDown,
  FadeInLeft,
  FadeOutLeft,
} from "react-native-reanimated";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

const choose = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Animated.Image
          entering={FadeInLeft.duration(200).delay(100)}
          exiting={FadeOutLeft.duration(200).delay(100)}
          source={require("../../assets/images/welearn.png")}
          style={{
            width: "100%",
            height: 150,
            objectFit: "contain",
          }}
        />
      </View>
      <Animated.View
        entering={SlideInDown.duration(400).delay(100)}
        exiting={SlideOutDown.duration(200).delay(100)}
        style={{
          flex: 0.7,
          alignItems: "center",
          justifyContent: "center",
          gap: 15,

          backgroundColor: "#00C0EA",
          paddingHorizontal: 20,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
        }}
      >
        <Text style={{ fontFamily: "AvenirBold", color: "#fff", fontSize: 25 }}>
          Login
        </Text>
        <Text
          style={{
            fontFamily: "AvenirRegular",
            color: "#CCF2FB",
            fontSize: 18,
          }}
        >
          Welearn is your go-to platform.
        </Text>

        <View style={{ flexDirection: "column", width: "100%", gap: 10 }}>
          <Link replace href={"/(auth)/(parent)/parentLogin"} asChild>
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 50,
              }}
            >
              <Text
                style={{
                  fontFamily: "AvenirRegular",
                  color: "#00C0EA",
                  fontSize: 16,
                }}
              >
                Parent
              </Text>
            </TouchableOpacity>
          </Link>

          <Link replace href={"/(auth)/(instructor)/instructorLogin"} asChild>
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 50,
              }}
            >
              <Text
                style={{
                  fontFamily: "AvenirRegular",
                  color: "#00C0EA",
                  fontSize: 16,
                }}
              >
                Tutor
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default choose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
