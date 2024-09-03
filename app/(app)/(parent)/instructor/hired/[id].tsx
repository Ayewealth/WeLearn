import {
  View,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AuthContext } from "@/context/AuthContext";
import isEqual from "lodash.isequal";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutDown,
  FadeOutRight,
} from "react-native-reanimated";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const HiredTutors = () => {
  const [DynamicTutor, setDynamicTutor] = useState(null);
  const [toggleReview, setToggleReview] = useState(false);
  const [remark, setRemark] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useLocalSearchParams();
  const { top, bottom } = useSafeAreaInsets();

  const router = useRouter();
  const animation = useRef(null);

  const { authTokens, user, userDetails } = useContext(AuthContext);

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

  const getDynamicTutor = async () => {
    setLoading(true);
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
      console.log(data.allBookings[0].isPayed);

      if (response.ok) {
        if (!isEqual(DynamicTutor, data)) {
          setDynamicTutor(data);
        }
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getRemark = async () => {
    try {
      let response = await fetch(
        "https://welearnapi.fun/api/student-remarks/",
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
        const filteredRemarks = data.filter(
          (remark: any) =>
            remark.instructor == id && remark.student === user.profile_id
        );

        if (!isEqual(remarks, filteredRemarks)) {
          setRemarks(filteredRemarks);
        }
      } else {
        console.log("Error fetching remarks:", data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleToggleFilter = () => {
    setToggleReview((prev) => !prev);
  };

  const sumbitRemark = async () => {
    setIsLoading(true);

    try {
      let response = await fetch(
        "https://welearnapi.fun/api/student-remarks/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
          body: JSON.stringify({
            instructor: id,
            student: user.profile_id,
            content: remark,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        alert(data.message);
        getRemark();
        handleToggleFilter();
        setRemark("");
      } else {
        console.log("Submit Remark Failed", data);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDynamicTutor();
    getRemark();
  }, [id]);

  useEffect(() => {}, [DynamicTutor, remarks]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#00C0EA" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      {toggleReview && (
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={handleToggleFilter}
        >
          <Animated.View
            entering={FadeInDown.duration(200).delay(200)}
            exiting={FadeOutDown.duration(400).delay(400)}
            style={{
              flex: 1,
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              width: "100%",
              paddingHorizontal: 20,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <Animated.View
              entering={FadeInLeft.duration(400).delay(400)}
              exiting={FadeOutRight.duration(200).delay(200)}
              style={{
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                paddingVertical: 20,
                paddingHorizontal: 20,
                backgroundColor: "#fff",
                borderRadius: 10,
                width: "100%",
              }}
            >
              <TextInput
                placeholder="Daily Remark"
                multiline={true}
                onChangeText={setRemark}
                value={remark}
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  width: "100%",
                  borderColor: "rgba(85, 85, 85, 0.3)",
                  fontFamily: "AvenirRegular",
                  padding: 13,
                }}
              />

              <TouchableOpacity
                onPress={sumbitRemark}
                style={{
                  alignItems: "center",
                  backgroundColor: "#00C0EA",
                  padding: 15,
                  borderRadius: 50,
                  width: "100%",
                }}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text
                    style={{
                      fontFamily: "AvenirRegular",
                      color: "#fff",
                      fontSize: 16,
                    }}
                  >
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: top - 20,
          paddingHorizontal: 20,
          paddingBottom: bottom + 20,
        }}
      >
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
            {DynamicTutor && DynamicTutor.profile_pic ? (
              <Image
                source={{ uri: DynamicTutor.profile_pic }}
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "AvenirBold", fontSize: 16 }}>
                  {(DynamicTutor && DynamicTutor.user?.name) || "Unknown"}
                </Text>
                {DynamicTutor && DynamicTutor.is_verified && (
                  <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                    source={require("../../../../../assets/images/tick.json")}
                  />
                )}
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text numberOfLines={1} style={{ fontFamily: "AvenirRegular" }}>
                  {(DynamicTutor && DynamicTutor.classes[0]?.class_name) ||
                    "Empty"}
                </Text>
                <Entypo name="dot-single" size={18} color="#555555" />

                <Text style={{ fontFamily: "AvenirDemi", color: "#00C0EA" }}>
                  Hired
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

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
                  fontSize: 14,
                }}
              >
                {DynamicTutor && DynamicTutor.classes[0]?.duration}
              </Text>
            </View>
            <Text
              numberOfLines={3}
              style={{
                fontFamily: "AvenirRegular",
                lineHeight: 30,
                textAlign: "left",
                fontSize: 15,
              }}
            >
              {(DynamicTutor && DynamicTutor.bio_data) || "N/A"}
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
                    "N/A"}{" "}
                  Users
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ fontFamily: "AvenirRegular" }}>Experience</Text>
                <Text style={{ fontFamily: "AvenirDemi", fontSize: 15 }}>
                  {(DynamicTutor && DynamicTutor.years_of_experience) || "N/A"}{" "}
                  Years
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ fontFamily: "AvenirRegular" }}>Location</Text>
                <Text style={{ fontFamily: "AvenirDemi", fontSize: 15 }}>
                  {(DynamicTutor && DynamicTutor.location) || "N/A"}{" "}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 25, width: "100%" }}>
            <TouchableOpacity
              onPress={handleToggleFilter}
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
                Check in/Review
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "column", gap: 25, marginTop: 20 }}>
            <Text style={{ fontFamily: "AvenirDemi", fontSize: 17 }}>
              Reviews
            </Text>

            {remarks &&
              remarks.map((remark: any) => (
                <View
                  key={remark.id}
                  style={{
                    flexDirection: "column",
                    gap: 8,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      width: "100%",
                    }}
                  >
                    <Image
                      source={{
                        uri: userDetails && userDetails.profile_pic,
                      }}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 50,
                      }}
                    />
                    <View style={{ flexDirection: "column", gap: 5 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{ fontFamily: "AvenirBold", fontSize: 14 }}
                        >
                          {userDetails && userDetails.user?.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <Text
                          numberOfLines={1}
                          style={{
                            fontFamily: "AvenirRegular",
                            fontSize: 14,
                            lineHeight: 20,
                          }}
                        >
                          {remark.content || "N/A"}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontFamily: "AvenirRegular", fontSize: 12 }}>
                      {formatDate(remark.created_at)}
                    </Text>
                    <Feather name="check" size={15} color="#00C0EA" />
                  </View>
                </View>
              ))}
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HiredTutors;
