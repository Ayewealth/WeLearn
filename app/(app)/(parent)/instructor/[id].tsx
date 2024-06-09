import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import DynamicHeader from "@/components/DynamicHeader";
import { AuthContext } from "@/context/AuthContext";
import Animated, { FadeInLeft } from "react-native-reanimated";

const UnhiredTutorDetails = () => {
  const [DynamicTutor, setDynamicTutor] = useState(null);
  const { id } = useLocalSearchParams();
  const { top, bottom } = useSafeAreaInsets();

  const { authTokens, loading } = useContext(AuthContext);

  const getDynamicTutor = async () => {
    try {
      let response = await fetch(
        `https://welearnapi.fun/api/instructor-profiles/update/${id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDynamicTutor(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDynamicTutor();
  }, [DynamicTutor]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00C0EA" />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: top - 20,
        paddingHorizontal: 20,
        paddingBottom: bottom + 20,
      }}
    >
      <DynamicHeader data={DynamicTutor} />
      <Animated.ScrollView
        entering={FadeInLeft.duration(200).delay(200)}
        style={{ flexDirection: "column", marginTop: 20 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "column", gap: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={{ fontFamily: "AvenirDemi", fontSize: 17 }}>
              Bio Data
            </Text>
            <Text
              style={{
                fontFamily: "AvenirDemi",
                color: "#239047",
                fontSize: 17,
              }}
            >
              &#x20A6;50,000
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "AvenirRegular",
              lineHeight: 30,
              textAlign: "left",
              fontSize: 15,
            }}
          >
            {(DynamicTutor && DynamicTutor.bio_data) ||
              "Meet Emily, Your Dedicated Tutor! With a passion for igniting young minds and a knack for making learning fun, Emily brings years of experience and expertise to Welearn. Holding a Bachelor's degree in Education and specialized certifications in Mathematics and Science, she is committed to nurturing a love for learning in every student she teaches.Emily believes in creating personalized learning experiences tailored to each student's unique strengths and challenges. Whether it's breaking down complex concepts, providing engaging activities, or offering encouragement every step of the way, Emily is dedicated to helping her students thrive academically.Outside the classroom, Emily enjoys hiking, painting, and exploring new cuisines. She looks forward to embarking on a rewarding learning journey with you!"}
          </Text>
        </View>

        <View style={{ flexDirection: "column", gap: 15, marginTop: 20 }}>
          <Text style={{ fontFamily: "AvenirDemi", fontSize: 17 }}>
            Work Data
          </Text>
          <View style={{ flexDirection: "column", gap: 10 }}>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontFamily: "AvenirRegular" }}>Trained</Text>
              <Text style={{ fontFamily: "AvenirDemi", fontSize: 15 }}>
                {(DynamicTutor && DynamicTutor.number_of_trained_students) ||
                  "20"}{" "}
                Users
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontFamily: "AvenirRegular" }}>Experience</Text>
              <Text style={{ fontFamily: "AvenirDemi", fontSize: 15 }}>
                {(DynamicTutor && DynamicTutor.years_of_experience) || "3"}{" "}
                Years
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontFamily: "AvenirRegular" }}>Location</Text>
              <Text style={{ fontFamily: "AvenirDemi", fontSize: 15 }}>
                {(DynamicTutor && DynamicTutor.location) || "Port Harcourt"}{" "}
              </Text>
            </View>
          </View>
        </View>

        {DynamicTutor && DynamicTutor.is_verified && (
          <View style={{ marginTop: 40 }}>
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
                Hire Me
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default UnhiredTutorDetails;
