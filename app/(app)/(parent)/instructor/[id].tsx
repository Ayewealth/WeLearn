import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutDown,
  FadeOutRight,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import isEqual from "lodash.isequal";
import { AntDesign } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PayWithFlutterwave } from "flutterwave-react-native";

interface RedirectParams {
  status: "successful" | "cancelled";
  transaction_id?: string;
  tx_ref: string;
}

const UnhiredTutorDetails = () => {
  const [DynamicTutor, setDynamicTutor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggleHire, setToggleHire] = useState(false);

  const [location, setLocation] = useState("");
  const [day1, setDay1] = useState("");
  const [day2, setDay2] = useState("");
  const [day3, setDay3] = useState("");

  const [date, setDate] = useState(new Date());
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [time3, setTime3] = useState("");

  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);

  const { id } = useLocalSearchParams();
  const { top, bottom } = useSafeAreaInsets();

  const router = useRouter();
  const animation = useRef(null);

  const apiKey = process.env.EXPO_PUBLIC_FLUTTER_KEY;

  const { authTokens, user } = useContext(AuthContext);

  const toggleDatePicker1 = () => {
    setShowPicker1(!showPicker1);
  };
  const toggleDatePicker2 = () => {
    setShowPicker2(!showPicker2);
  };
  const toggleDatePicker3 = () => {
    setShowPicker3(!showPicker3);
  };

  const PickerOnChange1 = ({ type }: any, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker1();
        setTime1(currentDate.toDateString());
      }
    } else {
      toggleDatePicker1();
    }
  };

  const PickerOnChange2 = ({ type }: any, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker2();
        setTime2(currentDate.toDateString());
      }
    } else {
      toggleDatePicker2();
    }
  };

  const PickerOnChange3 = ({ type }: any, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker3();
        setTime3(currentDate.toDateString());
      }
    } else {
      toggleDatePicker3();
    }
  };

  const DayDataList = [
    { key: "1", value: "MONDAY" },
    { key: "2", value: "TUESDAY" },
    { key: "3", value: "WEDNESDAY" },
    { key: "4", value: "THURSDAY" },
    { key: "5", value: "FRIDAY" },
    { key: "6", value: "SATURDAY" },
  ];

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

  const handleOnRedirect = async (data: RedirectParams) => {
    console.log(data);

    if (data.status === "successful") {
      setLoading(true);

      try {
        let response = await fetch(
          "https://welearnapi.fun/api/class-bookings/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },
            body: JSON.stringify({
              location: location,
              dayone: day1,
              daytwo: day2,
              daythree: day3,
              timeone: time1,
              timetwo: time2,
              timethree: time3,
              student: user.profile_id,
              class_booked: DynamicTutor && DynamicTutor.classes[0]?.id,
            }),
          }
        );

        const data = await response.json();

        if (response.status === 201) {
          console.log(data);
          router.push("/(app)/(parent)/instructor/paymentSuccess");
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const generateTransactionRef = (length: number) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };

  useEffect(() => {
    getDynamicTutor();
  }, [id]);

  useEffect(() => {}, [DynamicTutor]);

  const handleToggleHire = () => {
    setToggleHire((prev) => !prev);
  };

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
      {toggleHire && (
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={handleToggleHire}
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
                placeholder="Location"
                multiline={true}
                onChangeText={setLocation}
                value={location}
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  width: "100%",
                  borderColor: "rgba(85, 85, 85, 0.3)",
                  fontFamily: "AvenirRegular",
                  padding: 13,
                }}
              />

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 5,
                }}
              >
                <Text style={{ fontFamily: "AvenirRegular" }}>
                  Add Day and Time
                </Text>
                <AntDesign name="pluscircle" size={24} color="#00C0EA" />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                }}
              >
                <SelectList
                  setSelected={(val: any) => setDay1(val)}
                  data={DayDataList}
                  save="value"
                  placeholder="Day 1"
                  search={false}
                  boxStyles={{
                    borderRadius: 10,
                    borderColor: "rgba(85, 85, 85, 0.3)",
                    padding: 13,
                    paddingVertical: 17,
                  }}
                />

                {showPicker1 && (
                  <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={date}
                    onChange={PickerOnChange1}
                    style={{ backgroundColor: "#fff", marginTop: -10 }}
                  />
                )}
                {!showPicker1 && (
                  <Pressable style={{ flex: 1 }} onPress={PickerOnChange1}>
                    <TextInput
                      placeholder="Time 1"
                      style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "rgba(85, 85, 85, 0.3)",
                        fontFamily: "AvenirRegular",
                        padding: 13,
                        color: "#000",
                      }}
                      value={time1}
                      onChangeText={setTime1}
                      editable={false}
                      onPressIn={toggleDatePicker1}
                    />
                  </Pressable>
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                }}
              >
                <SelectList
                  setSelected={(val: any) => setDay2(val)}
                  data={DayDataList}
                  save="value"
                  placeholder="Day 2"
                  search={false}
                  boxStyles={{
                    borderRadius: 10,
                    borderColor: "rgba(85, 85, 85, 0.3)",
                    padding: 13,
                    paddingVertical: 17,
                  }}
                />

                {showPicker2 && (
                  <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={date}
                    onChange={PickerOnChange2}
                    style={{ backgroundColor: "#fff", marginTop: -10 }}
                  />
                )}
                {!showPicker2 && (
                  <Pressable style={{ flex: 1 }} onPress={PickerOnChange2}>
                    <TextInput
                      placeholder="Time 2"
                      style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "rgba(85, 85, 85, 0.3)",
                        fontFamily: "AvenirRegular",
                        padding: 13,
                        color: "#000",
                      }}
                      value={time2}
                      onChangeText={setTime2}
                      editable={false}
                      onPressIn={toggleDatePicker2}
                    />
                  </Pressable>
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                }}
              >
                <SelectList
                  setSelected={(val: any) => setDay3(val)}
                  data={DayDataList}
                  save="value"
                  placeholder="Day 3"
                  search={false}
                  boxStyles={{
                    borderRadius: 10,
                    borderColor: "rgba(85, 85, 85, 0.3)",
                    padding: 13,
                    paddingVertical: 17,
                  }}
                />

                {showPicker3 && (
                  <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={date}
                    onChange={PickerOnChange3}
                    style={{ backgroundColor: "#fff", marginTop: -10 }}
                  />
                )}
                {!showPicker3 && (
                  <Pressable style={{ flex: 1 }} onPress={PickerOnChange3}>
                    <TextInput
                      placeholder="Time 3"
                      style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "rgba(85, 85, 85, 0.3)",
                        fontFamily: "AvenirRegular",
                        padding: 13,
                        color: "#000",
                      }}
                      value={time3}
                      onChangeText={setTime3}
                      editable={false}
                      onPressIn={toggleDatePicker3}
                    />
                  </Pressable>
                )}
              </View>

              <PayWithFlutterwave
                onRedirect={handleOnRedirect}
                options={{
                  tx_ref: generateTransactionRef(10),
                  authorization:
                    "FLWPUBK_TEST-0d9c507643c89eea7ab4b15b9e1cc58d-X",
                  amount: DynamicTutor && DynamicTutor.classes[0]?.price,
                  currency: "NGN",
                  payment_options: "card, banktransfer, ussd",
                  customer: {
                    email: DynamicTutor && DynamicTutor.user?.email,
                    name: DynamicTutor && DynamicTutor.user?.name,
                  },
                  customizations: {
                    title: DynamicTutor && DynamicTutor.classes[0]?.class_name,
                    description: `Payment For ${
                      DynamicTutor && DynamicTutor.classes[0]?.class_name
                    } Class`,
                    logo: DynamicTutor && DynamicTutor.profile_pic,
                  },
                }}
                customButton={(props) => (
                  <TouchableOpacity
                    onPress={props.onPress}
                    isBusy={props.isInitializing}
                    disabled={props.disabled}
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
                      Proceed to Payment
                    </Text>
                  </TouchableOpacity>
                )}
              />
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
                source={{ uri: DynamicTutor && DynamicTutor.profile_pic }}
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
                {(DynamicTutor && DynamicTutor.classes[0]?.class_name) ||
                  "Empty"}
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
                &#x20A6;{DynamicTutor && DynamicTutor.classes[0]?.price}
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

          {DynamicTutor && DynamicTutor.is_verified && (
            <View style={{ marginTop: 40 }}>
              <TouchableOpacity
                onPress={handleToggleHire}
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
    </>
  );
};

export default UnhiredTutorDetails;
