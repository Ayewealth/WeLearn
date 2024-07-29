import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AuthContext } from "@/context/AuthContext";
import { Link } from "expo-router";

const account = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { userDetails } = useContext(AuthContext);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    const day = date.getDate();
    let daySuffix: string;

    if (day % 10 === 1 && day !== 11) {
      daySuffix = "st";
    } else if (day % 10 === 2 && day !== 12) {
      daySuffix = "nd";
    } else if (day % 10 === 3 && day !== 13) {
      daySuffix = "rd";
    } else {
      daySuffix = "th";
    }

    return formattedDate.replace(day.toString(), `${day}${daySuffix}`);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20 + top,
        backgroundColor: "#FCFCFC",
      }}
    >
      <Text style={{ fontFamily: "AvenirDemi", fontSize: 20 }}>Account</Text>

      <ScrollView
        contentContainerStyle={{ flex: 1, flexDirection: "column", gap: 25 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "column", gap: 15 }}>
          {userDetails && userDetails.profile_pic ? (
            <Image
              source={{ uri: userDetails.profile_pic }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                marginRight: 20,
              }}
            />
          ) : (
            <Image
              source={require("../../../assets/images/profile.png")}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                backgroundColor: "#00C0EA",
                marginRight: 20,
              }}
            />
          )}
          <Text style={{ fontFamily: "AvenirBold", fontSize: 17 }}>
            {userDetails.user?.name || "John Doe"}
          </Text>
          <Text style={{ fontFamily: "AvenirRegular", fontSize: 14 }}>
            {userDetails.user?.email}
          </Text>

          <Link href="/(app)/(parent)/instructor/edit" asChild>
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
                  fontSize: 16,
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {userDetails && userDetails && (
          <View style={{ flexDirection: "column", gap: 20 }}>
            <Text style={{ fontFamily: "AvenirRegular", fontSize: 17 }}>
              {userDetails.user?.name}
            </Text>
            <Text style={{ fontFamily: "AvenirRegular", fontSize: 17 }}>
              {userDetails.user?.email}
            </Text>
            <Text
              style={{
                fontFamily: "AvenirRegular",
                fontSize: 17,
                lineHeight: 30,
              }}
            >
              {userDetails.location}
            </Text>
            <Text style={{ fontFamily: "AvenirRegular", fontSize: 17 }}>
              {userDetails.user ? formatDate(userDetails.user.date_joined) : ""}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default account;
