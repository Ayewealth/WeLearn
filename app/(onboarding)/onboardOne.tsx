import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";

const onboardOne = () => {
  const router = useRouter();

  const hasSeenScreen = async () => {
    await AsyncStorage.setItem("seenScreen", JSON.stringify(true));
    router.replace("/(onboarding)/onboardTwo");
  };

  const skip = async () => {
    await AsyncStorage.setItem("seenScreen", JSON.stringify(true));
    router.replace("/(onboarding)/choose");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Animated.View
        entering={FadeInLeft.duration(200).delay(100)}
        exiting={FadeOutRight.duration(200).delay(100)}
        style={{
          flex: 1,
          width: "100%",
          gap: 15,

          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={skip}>
          <Text
            style={{
              fontFamily: "AvenirRegular",
              alignSelf: "flex-end",
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>

        <Image
          source={require("../../assets/images/onboard_img1.png")}
          style={{
            width: "100%",
            objectFit: "cover",
            height: 330,
            borderRadius: 20,
          }}
        />

        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <Image source={require("../../assets/images/Indicator.png")} />
          <Text
            style={{
              fontFamily: "AvenirBold",
              fontSize: 45,
              marginBottom: 0,
              color: "#0F0F0F",
            }}
          >
            Welcome to Welearn!
          </Text>
          <Text
            style={{
              fontFamily: "AvenirRegular",
              fontSize: 16,
              lineHeight: 35,
              color: "#555555",
            }}
          >
            Connect with ease. Whether you're a parent seeking academic support
            for your child or a tutor ready to empower students, Welearn is your
            go-to platform. Let's get started!
          </Text>
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInLeft.duration(200).delay(100)}
        exiting={FadeOutRight.duration(200).delay(100)}
      >
        <TouchableOpacity
          onPress={hasSeenScreen}
          style={{
            alignItems: "center",
            backgroundColor: "#00C0EA",
            padding: 15,
            borderRadius: 50,
          }}
        >
          <Text
            style={{
              fontFamily: "AvenirRegular",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default onboardOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
