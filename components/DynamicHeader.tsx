import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";

const DynamicHeader = ({ data }: any) => {
  const router = useRouter();
  const animation = useRef(null);

  if (!data) {
    return <ActivityIndicator size="large" color="#00C0EA" />;
  }

  return (
    <Animated.View
      entering={FadeInLeft.duration(200).delay(200)}
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        width: "100%",
        borderBottomColor: "rgba(85, 85, 85, 0.3)",
        borderBottomWidth: 1,
        paddingBottom: 10,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          width: "100%",
        }}
      >
        {data.profile_pic ? (
          <Image
            source={{ uri: data.profile_pic }}
            style={{
              height: 45,
              width: 45,
              borderRadius: 50,
            }}
          />
        ) : (
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 50,
              backgroundColor: "#ccc",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff" }}>N/A</Text>
          </View>
        )}
        <View style={{ flexDirection: "column", gap: 3 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontFamily: "AvenirBold", fontSize: 16 }}>
              {data.user?.name || "Unknown"}
            </Text>
            {data.is_verified && (
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: 25,
                  height: 25,
                }}
                source={require("../assets/images/tick.json")}
              />
            )}
          </View>
          <Text numberOfLines={1} style={{ fontFamily: "AvenirRegular" }}>
            {data.occupation || "Empty"}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default DynamicHeader;
