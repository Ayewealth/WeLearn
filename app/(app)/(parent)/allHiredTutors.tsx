import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutDown,
  FadeOutRight,
} from "react-native-reanimated";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StatusBar } from "expo-status-bar";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Entypo } from "@expo/vector-icons";

import { AuthContext } from "@/context/AuthContext";

const allHiredTutors = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [nameFilter, setNameFilter] = useState(false);
  const [courseFilter, setCourseFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState(false);
  const [filteredTutors, setFilteredTutors] = useState([]);

  const { top, bottom } = useSafeAreaInsets();
  const animation = useRef(null);

  const { loading, userDetails, getLoginStudent } = useContext(AuthContext);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [nameFilter, courseFilter, locationFilter, searchTerm, userDetails]);

  const applyFiltersAndSearch = () => {
    let result = userDetails.hiredInstructors;

    // Apply name filter
    if (nameFilter) {
      result = result.filter(
        (tutor: { class_booked: { instructor: { user: { name: string } } } }) =>
          tutor.class_booked.instructor.user.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Apply course filter
    if (courseFilter) {
      result = result.filter(
        (tutor: { class_booked: { class_name: string } }) =>
          tutor.class_booked.class_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Apply location filter
    if (locationFilter) {
      result = result.filter((tutor: { location: string }) =>
        tutor.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTutors(result);
  };

  const handleToggleFilter = () => {
    setToggleFilter((prev) => !prev);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getLoginStudent();
      setRefreshing(false);
    }, 1000);
  }, []);
  return (
    <>
      {toggleFilter && (
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
                gap: 20,

                paddingVertical: 20,
                paddingHorizontal: 40,
                backgroundColor: "#fff",
                borderRadius: 10,
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "#0F0F0F",
                    fontFamily: "AvenirDemi",
                    fontSize: 16,
                  }}
                >
                  Name
                </Text>

                <BouncyCheckbox
                  style={{ flex: 0.1 }}
                  size={25}
                  fillColor="#000"
                  iconStyle={{ borderColor: "red", borderRadius: 5 }}
                  innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                  isChecked={nameFilter}
                  onPress={() => setNameFilter(!nameFilter)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "#0F0F0F",
                    fontFamily: "AvenirDemi",
                    fontSize: 16,
                  }}
                >
                  Course
                </Text>

                <BouncyCheckbox
                  style={{ flex: 0.1 }}
                  size={25}
                  fillColor="#000"
                  iconStyle={{ borderColor: "red", borderRadius: 5 }}
                  innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                  isChecked={courseFilter}
                  onPress={() => setCourseFilter(!courseFilter)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "#0F0F0F",
                    fontFamily: "AvenirDemi",
                    fontSize: 16,
                  }}
                >
                  Location
                </Text>

                <BouncyCheckbox
                  style={{ flex: 0.1 }}
                  size={25}
                  fillColor="#000"
                  iconStyle={{ borderColor: "red", borderRadius: 5 }}
                  innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                  isChecked={locationFilter}
                  onPress={() => setLocationFilter(!locationFilter)}
                />
              </View>
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 20,
          paddingHorizontal: 20,
          paddingTop: 30 + top,
          backgroundColor: "#FCFCFC",
        }}
      >
        <StatusBar style="dark" />

        <Animated.View
          entering={FadeInLeft.duration(400).delay(200)}
          exiting={FadeOutRight.duration(200).delay(200)}
          style={{ flexDirection: "column", gap: 20 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ flex: 0.98, position: "relative" }}>
              <TextInput
                placeholder="Search For Hired Tutors"
                value={searchTerm}
                onChangeText={setSearchTerm}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  fontFamily: "AvenirRegular",
                  fontSize: 14,
                  borderColor: "rgba(85, 85, 85, 0.3)",
                  borderWidth: 1,
                }}
              />
              <Feather
                name="search"
                size={19}
                color="rgba(85, 85, 85, 1)"
                style={{ position: "absolute", right: 15, top: "32%" }}
              />
            </View>
            <TouchableOpacity onPress={handleToggleFilter}>
              <MaterialCommunityIcons
                name="filter-variant"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {filteredTutors && filteredTutors.length > 0 ? (
          <>
            {loading ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "60%",
                }}
              >
                <ActivityIndicator size="large" color="#00C0EA" />
              </View>
            ) : (
              <Animated.ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                entering={FadeInLeft.duration(400).delay(200)}
                exiting={FadeOutRight.duration(200).delay(200)}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                {filteredTutors.map((tutor: any, index) => (
                  <View
                    key={index}
                    style={[
                      styles.shadowBox,
                      {
                        width: "100%",
                        backgroundColor: "#FCFCFC",
                        flexDirection: "column",
                        gap: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        marginVertical: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "rgba(85, 85, 85, 0.05)",
                      },
                    ]}
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
                          uri: tutor.class_booked?.instructor?.profile_pic,
                        }}
                        style={{
                          height: 45,
                          width: 45,
                          borderRadius: 50,
                        }}
                      />
                      <View style={{ flexDirection: "column", gap: 5 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{ fontFamily: "AvenirBold", fontSize: 16 }}
                          >
                            {tutor.class_booked?.instructor?.user.name}
                          </Text>
                          {tutor.class_booked?.instructor?.is_verified && (
                            <LottieView
                              autoPlay
                              ref={animation}
                              style={{
                                width: 25,
                                height: 25,
                              }}
                              source={require("../../../assets/images/tick.json")}
                            />
                          )}
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
                            style={{ fontFamily: "AvenirRegular" }}
                          >
                            {tutor.class_booked?.class_name || "Empty"}
                          </Text>
                          <Entypo name="dot-single" size={18} color="#555555" />
                          {tutor.isPayed !== null ? (
                            <Text
                              style={{
                                fontFamily: "AvenirDemi",
                                color: "#00C0EA",
                              }}
                            >
                              Hired
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontFamily: "AvenirDemi",
                                color: "#00C0EA",
                              }}
                            >
                              Pending
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                    <Text
                      style={{
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                      numberOfLines={2}
                    >
                      {tutor.class_booked?.instructor?.bio_data || "N/A"}
                    </Text>
                    <Link
                      href={`/(app)/(parent)/instructor/hired/${tutor?.class_booked?.instructor?.id}`}
                      asChild
                    >
                      <TouchableOpacity
                        disabled={tutor.isPayed === null}
                        style={{
                          alignItems: "center",
                          borderColor: "#00C0EA",
                          borderWidth: 1,
                          padding: 13,
                          borderRadius: 50,
                        }}
                      >
                        <Text
                          style={{ fontFamily: "AvenirDemi", color: "#00C0EA" }}
                        >
                          View Details
                        </Text>
                      </TouchableOpacity>
                    </Link>
                  </View>
                ))}
              </Animated.ScrollView>
            )}
          </>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "60%",
            }}
          >
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 250,
                height: 250,
              }}
              source={require("../../../assets/images/empty.json")}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default allHiredTutors;

const styles = StyleSheet.create({
  shadowBox: {
    // iOS
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Android
    elevation: 5,
  },
});
