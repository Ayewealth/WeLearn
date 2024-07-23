import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

const onboardTwo = () => {
  const router = useRouter();

  const skip = async () => {
    await AsyncStorage.setItem("seenScreen", JSON.stringify(true));
    router.replace("/(onboarding)/choose");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInLeft.duration(200).delay(200)}
          exiting={FadeOutRight.duration(200).delay(200)}
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
            source={require("../../assets/images/onboard_img2.jpeg")}
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
            <Image source={require("../../assets/images/Indicator 2.png")} />
            <Text
              style={{
                fontFamily: "AvenirBold",
                fontSize: 45,
                marginBottom: 0,
                color: "#0F0F0F",
              }}
            >
              Find Your Perfect Tutor
            </Text>
            <Text
              style={{
                fontFamily: "AvenirRegular",
                fontSize: 15,
                lineHeight: 30,
                color: "#555555",
              }}
            >
              Browse through a diverse pool of experienced tutors tailored to
              your child's needs. Welearn offers a variety of subjects and
              expertise levels to match and elevate your child's learning
              journey.
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          style={{ marginTop: 20 }}
          entering={FadeInLeft.duration(200).delay(100)}
          exiting={FadeOutRight.duration(200).delay(100)}
        >
          <Link replace href={"/(onboarding)/onboardThree"} asChild>
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
                Next
              </Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default onboardTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
