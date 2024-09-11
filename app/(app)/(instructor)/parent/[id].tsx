import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AuthContext } from "../../../../context/AuthContext";
import isEqual from "lodash.isequal";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutDown,
  FadeOutRight,
} from "react-native-reanimated";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const Student = () => {
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

  const student = userDetails?.allBookings.find(
    (student: { student: { id: any } }) => student.student.id === parseInt(id)
  );
  const classBookedId = student ? student.id : null;

  const classData =
    DynamicTutor &&
    DynamicTutor.hiredInstructors.find(
      (tutor: { instructor: { id: any } }) =>
        tutor.instructor.id == user?.profile_id
    );

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
        `https://welearnapi.fun/api/student-profiles/update/${id}/`,
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
        "https://welearnapi.fun/api/instructor-remarks/",
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
            remark?.booked_clasd === classBookedId &&
            remark?.instructor === user?.profile_id
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
        "https://welearnapi.fun/api/instructor-remarks/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
          body: JSON.stringify({
            booked_clasd: classBookedId,
            instructor: user?.profile_id,
            student: id,
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
              <View style={{ flexDirection: "row" }}>
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
                    source={require("../../../../assets/images/tick.json")}
                  />
                )}
              </View>
              <Text numberOfLines={1} style={{ fontFamily: "AvenirRegular" }}>
                {(DynamicTutor && DynamicTutor.user?.email) || "Empty"}
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.ScrollView
          entering={FadeInLeft.duration(200).delay(200)}
          style={{ flexDirection: "column", marginTop: 20 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={{ fontFamily: "AvenirRegular", fontSize: 13 }}>
              {classData?.class_booked?.duration} WEEKS
            </Text>
            <Text style={{ fontFamily: "AvenirBold", fontSize: 16 }}>
              {classData?.class_booked?.class_name}
            </Text>
          </View>

          <View style={{ flexDirection: "column", gap: 15, marginTop: 20 }}>
            <Text style={{ fontFamily: "AvenirDemi", fontSize: 17 }}>Days</Text>
            <View style={{ flexDirection: "column", gap: 10 }}>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ fontFamily: "AvenirRegular" }}>
                  {classData?.dayone || "N/A"}
                </Text>
                <Text style={{ fontFamily: "AvenirDemi", fontSize: 15 }}>
                  {classData?.timeone || "N/A"}
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ fontFamily: "AvenirRegular" }}>
                  {classData?.daytwo || "N/A"}
                </Text>
                <Text style={{ fontFamily: "AvenirDemi", fontSize: 15 }}>
                  {classData?.timetwo || "N/A"}
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={{ fontFamily: "AvenirRegular" }}>
                  {classData?.daythree || "N/A"}
                </Text>
                <Text
                  style={{ fontFamily: "AvenirDemi", fontSize: 15, flex: 1 }}
                >
                  {classData?.timethree || "N/A"}
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
                        uri: userDetails && userDetails?.profile_pic,
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

export default Student;
