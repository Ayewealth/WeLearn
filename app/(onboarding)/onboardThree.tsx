import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

const onboardThree = () => {
  const router = useRouter();

  const skip = async () => {
    await AsyncStorage.setItem("seenScreen", JSON.stringify(true));
    router.replace("/(onboarding)/choose");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView style={{ flex: 1 }}>
        <Animated.View
          entering={FadeInLeft.duration(200).delay(200)}
          exiting={FadeOutRight.duration(400).delay(200)}
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
            source={require("../../assets/images/onboard_img3.jpeg")}
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
            <Image source={require("../../assets/images/Indicator 3.png")} />
            <Text
              style={{
                fontFamily: "AvenirBold",
                fontSize: 43,
                lineHeight: 55,
                marginBottom: 0,
                color: "#0F0F0F",
              }}
            >
              Empower Your Child's Future
            </Text>
            <Text
              style={{
                fontFamily: "AvenirRegular",
                fontSize: 16,
                lineHeight: 30,
                color: "#555555",
              }}
            >
              With Welearn, you're not just hiring a tutor – you're investing in
              your child's future. Empower them with the tools and resources
              they need to succeed academically.
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          style={{ marginTop: 30 }}
          entering={FadeInLeft.duration(200).delay(300)}
          exiting={FadeOutRight.duration(200).delay(300)}
        >
          <Link replace href={"/(onboarding)/choose"} asChild>
            <TouchableOpacity
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
                Finish
              </Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default onboardThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
