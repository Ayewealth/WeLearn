import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AuthHeader from "@/components/AuthHeader";
import Animated, {
  FadeInLeft,
  FadeOutRight,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instructorRegister = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const animation = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword1(!showPassword1);
  };

  const closeAlert = () => {
    setAlert(false);
    if (success) {
      router.push("/(auth)/(instructor)/otp");
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://welearnapi.fun/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullname,
          email: email,
          password: password,
          user_type: "Instructor",
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setSuccess(true);
        setAlertType("success");
        setMessage(data.message);
        await AsyncStorage.setItem("userEmail", email);
        await AsyncStorage.setItem("isInstructor", JSON.stringify(true));
      } else {
        setSuccess(false);
        setAlertType("error");
        setMessage(data.message);
      }
      setAlert(true);
    } catch (error) {
      setAlertType("error");
      setMessage("An error occurred. Please try again.");
      setAlert(true);
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {alert && (
        <Animated.View
          entering={FadeInDown.duration(200).delay(200)}
          exiting={FadeOutDown.duration(200).delay(200)}
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,

            width: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
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
            }}
          >
            {alertType === "success" ? (
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: 100,
                  height: 100,
                }}
                source={require("../../../assets/images/Animation - 1715980088409.json")}
              />
            ) : (
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: 100,
                  height: 100,
                }}
                source={require("../../../assets/images/Animation - 1715978787640.json")}
              />
            )}
            <Text style={{ fontSize: 16, fontFamily: "AvenirRegular" }}>
              {message}
            </Text>
            <TouchableOpacity
              onPress={closeAlert}
              style={{
                backgroundColor:
                  alertType === "success" ? "#00C0EA" : "#EC1C23",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
              }}
            >
              <Text style={{ fontFamily: "AvenirRegular", color: "#fff" }}>
                Close
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      )}
      <View style={styles.container}>
        <StatusBar style="dark" />

        <AuthHeader />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            flex: 1,
            marginTop: 15,
            position: "relative",
          }}
        >
          <Animated.ScrollView
            entering={FadeInLeft.duration(200).delay(200)}
            exiting={FadeOutRight.duration(200).delay(200)}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flexDirection: "column", gap: 20, width: "100%" }}>
              <View style={{ flexDirection: "column", gap: 10, width: "100%" }}>
                <Text style={{ fontFamily: "AvenirBold", fontSize: 32 }}>
                  Join Welearn Today as a Tutor!
                </Text>
                <Text
                  style={{
                    fontFamily: "AvenirRegular",
                    fontSize: 17,
                    color: "#555555",
                    lineHeight: 30,
                  }}
                >
                  Unlock a world of educational opportunities for your child or
                  to embark on a rewarding journey as a tutor.
                </Text>
              </View>
              <View style={{ flexDirection: "column", gap: 15 }}>
                <TextInput
                  placeholder="Full Name"
                  style={styles.inputStyles}
                  value={fullname}
                  onChangeText={setFullname}
                />
                <TextInput
                  placeholder="Email Address"
                  style={styles.inputStyles}
                  value={email}
                  onChangeText={setEmail}
                />
                <View style={{ position: "relative", width: "100%" }}>
                  <TextInput
                    placeholder="Password"
                    style={styles.inputStyles}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword1}
                  />

                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.iconStyle}
                  >
                    {showPassword1 ? (
                      <Ionicons
                        name="eye-off-outline"
                        size={22}
                        color="#555555"
                      />
                    ) : (
                      <Ionicons name="eye-outline" size={22} color="#555555" />
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={handleSignup}
                  style={{
                    alignItems: "center",
                    backgroundColor: "#00C0EA",
                    padding: 15,
                    borderRadius: 50,
                  }}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text
                      style={{
                        fontFamily: "AvenirRegular",
                        color: "#fff",
                        fontSize: 16,
                      }}
                    >
                      Sign Up
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(85, 85, 85, 0.3)",
                    height: 1,
                  }}
                ></View>
                <Text style={{ color: "#555555", fontFamily: "AvenirRegular" }}>
                  or
                </Text>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(85, 85, 85, 0.3)",
                    height: 1,
                  }}
                ></View>
              </View>

              <View
                style={{
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 20,
                      borderRadius: 10,
                      backgroundColor: "rgba(85, 85, 85, 0.2),",
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/google.png")}
                      style={{ width: 25, height: 25, objectFit: "contain" }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 20,
                      borderRadius: 10,
                      backgroundColor: "rgba(85, 85, 85, 0.2),",
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/facebook.png")}
                      style={{ width: 25, height: 25, objectFit: "contain" }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 20,
                      borderRadius: 10,
                      backgroundColor: "rgba(85, 85, 85, 0.2),",
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/apple-logo.png")}
                      style={{ width: 25, height: 25, objectFit: "contain" }}
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontFamily: "AvenirRegular",
                    color: "#0F0F0F",
                    fontSize: 14,
                  }}
                >
                  Already have an account?{" "}
                  <Link
                    href={"/(auth)/(parent)/parentLogin"}
                    style={{ color: "#00C0EA", fontFamily: "AvenirDemi" }}
                  >
                    Login
                  </Link>
                </Text>
              </View>
            </View>
          </Animated.ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default instructorRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  inputStyles: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderColor: "#DCDCDC",
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: "AvenirRegular",
    fontSize: 14,
    color: "555555",
    width: "100%",
  },
  iconStyle: {
    position: "absolute",
    top: 17,
    right: 30,
  },
});
