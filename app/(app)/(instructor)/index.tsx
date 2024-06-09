import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, marginTop: 30 + top }}
    >
      <StatusBar style="dark" />

      <View style={{ flexDirection: "column", gap: 20 }}>
        <Text style={{ fontFamily: "AvenirDemi", fontSize: 19 }}>
          Welcome Back, Kingsley
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View style={{ flex: 0.99, position: "relative" }}>
            <TextInput
              placeholder="Search for tutor"
              style={{
                padding: 13,
                borderRadius: 10,
                fontFamily: "AvenirRegular",
                fontSize: 15,
                borderColor: "rgba(85, 85, 85, 0.3)",
                borderWidth: 1,
              }}
            />
            <Feather
              name="search"
              size={20}
              color="rgba(85, 85, 85, 1)"
              style={{ position: "absolute", right: 15, top: "30%" }}
            />
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
