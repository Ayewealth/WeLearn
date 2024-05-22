import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import { Link } from "expo-router";

const success = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Animated.View
        entering={FadeInLeft.duration(200).delay(200)}
        exiting={FadeOutRight.duration(200).delay(200)}
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 100,
          flexDirection: "column",
          gap: 15,
        }}
      >
        <Image
          source={require("../../../assets/images/success.png")}
          style={{ width: 150, height: 150, objectFit: "contain" }}
        />
        <Text style={{ fontFamily: "AvenirBold", fontSize: 28 }}>
          Welcome to Welearn!
        </Text>
        <Text
          style={{
            color: "rgba(85, 85, 85, 1)",
            fontFamily: "AvenirDemi",
            fontSize: 18,
          }}
        >
          Congratulations Tutor, You're In!
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "#555555",
            fontFamily: "AvenirRegular",
            lineHeight: 30,
          }}
        >
          Welcome to Welearn, where learning meets convenience. Start exploring
          our diverse pool of tutors and empowering your child's educational
          journey today!
        </Text>
        <Link href={"/(auth)/(instructor)/instructorLogin"} asChild>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#00C0EA",
              padding: 15,
              borderRadius: 50,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "AvenirRegular",
                color: "#fff",
                fontSize: 16,
              }}
            >
              Proceed
            </Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>
    </SafeAreaView>
  );
};

export default success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    width: "100%",
  },
});
