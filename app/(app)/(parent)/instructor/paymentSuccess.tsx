import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import { Link } from "expo-router";

const paymentSuccess = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#FCFCFC",
        width: "100%",
      }}
    >
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
          source={require("../../../../assets/images/success.png")}
          style={{ width: 150, height: 150, objectFit: "contain" }}
        />
        <Text
          style={{
            fontFamily: "AvenirBold",
            fontSize: 30,
            textAlign: "center",
            lineHeight: 40,
          }}
        >
          Payment Successfull
        </Text>
        <Text
          style={{
            color: "rgba(85, 85, 85, 1)",
            fontFamily: "AvenirDemi",
            fontSize: 16,
          }}
        >
          Class Booked
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
          Your payment was made successfully. You can start classes from the
          selected day and time.
        </Text>
        <Link replace href={"/(app)/(parent)/"} asChild>
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
              Back
            </Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>
    </SafeAreaView>
  );
};

export default paymentSuccess;
