import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const animation = useRef(null);

  const [refreshing, setRefreshing] = useState(false);
  const [filteredTutorClass, setFilteredTutorClass] = useState([]);

  const { loading, getLoginTutor, userDetails, tutorClass, getAllTutorClass } =
    useContext(AuthContext);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getAllTutorClass();
      getLoginTutor();
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [userDetails, tutorClass]);

  const applyFiltersAndSearch = () => {
    if (!userDetails || !tutorClass) {
      return;
    }
    const result = tutorClass.filter(
      (tutor: { class_booked: { instructor: { id: any } } }) =>
        tutor.class_booked.instructor.id === userDetails.id
    );
    setFilteredTutorClass(result);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 30 + top,
        backgroundColor: "#FCFCFC",
      }}
    >
      <StatusBar style="dark" />

      <Animated.View
        entering={FadeInLeft.duration(400).delay(200)}
        exiting={FadeOutRight.duration(200).delay(200)}
        style={{ flexDirection: "column", gap: 20 }}
      >
        <Text
          style={{ fontFamily: "AvenirDemi", fontSize: 19, lineHeight: 25 }}
        >
          Welcome Back, {userDetails.user?.name || "John Doe"}
        </Text>

        {!userDetails.is_verified && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#F6B712",
              width: "100%",
              borderRadius: 15,
              paddingVertical: 20,
              paddingHorizontal: 15,
            }}
          >
            <View style={{ flex: 1, flexDirection: "column", gap: 5 }}>
              <Text style={{ fontFamily: "AvenirDemi", color: "#fff" }}>
                Acount Verification Pending
              </Text>
              <Text
                style={{
                  fontFamily: "AvenirRegular",
                  color: "#fff",
                  fontSize: 12,
                  lineHeight: 15,
                }}
              >
                Proceed to our office at No 1 Ikwerre Road, by Agip Junction by
                Ada George for final verification
              </Text>
            </View>
            <View>
              <Feather name="alert-octagon" size={24} color="#fff" />
            </View>
          </View>
        )}

        {filteredTutorClass && filteredTutorClass.length > 0 ? (
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
                {filteredTutorClass.map((tutor: any) => (
                  <View
                    key={tutor.id}
                    style={[
                      styles.shadowBox,
                      {
                        width: "100%",
                        backgroundColor: "#FCFCFC",
                        flexDirection: "column",
                        gap: 20,
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
                        source={{ uri: tutor.student?.profile_pic }}
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
                            {tutor.student?.user?.name}
                          </Text>
                          {tutor.is_verified && (
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
                        <Text
                          numberOfLines={1}
                          style={{ fontFamily: "AvenirRegular" }}
                        >
                          {tutor.student?.user?.email || "Empty"}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "column", gap: 5 }}>
                      <Text
                        style={{ fontFamily: "AvenirRegular", fontSize: 13 }}
                      >
                        {tutor.class_booked?.durtion} WEEKS
                      </Text>
                      <Text style={{ fontFamily: "AvenirBold", fontSize: 16 }}>
                        {tutor.class_booked?.class_name}
                      </Text>
                    </View>

                    <Link
                      href={`/(app)/(instructor)/parent/${tutor.student?.id}`}
                      asChild
                    >
                      <TouchableOpacity
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
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadowBox: {
    // iOS
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Android
    elevation: 3,
  },
});
