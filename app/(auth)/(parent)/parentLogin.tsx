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
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import { AuthContext } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const parentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(email, password);

  const router = useRouter();
  const { authTokens, setAuthTokens, user, setUser, setIsParent } =
    useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignin = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://welearnapi.fun/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok || response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        await AsyncStorage.setItem("authTokens", JSON.stringify(data));
        await AsyncStorage.setItem("isAuthenticated", JSON.stringify(true));
        router.replace("/(app)/(parent)/");
      } else {
        alert(response.statusText);
        console.log(data);
      }
    } catch (error) {
      alert(error);
      console.error("Signin error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, marginTop: 80, paddingHorizontal: 20 }}
      >
        <Animated.View
          entering={FadeInLeft.duration(200).delay(200)}
          exiting={FadeOutRight.duration(200).delay(200)}
          style={{ flexDirection: "column", gap: 70 }}
        >
          <View style={{ flexDirection: "column", gap: 20 }}>
            <View>
              <Text
                style={{
                  fontFamily: "AvenirBold",
                  fontSize: 30,
                  lineHeight: 40,
                }}
              >
                Welcome Back to Welearn
              </Text>
              <Text
                style={{
                  fontFamily: "AvenirRegular",
                  fontSize: 18,
                  color: "#555555",
                }}
              >
                Welearn is your go-to platform.
              </Text>
            </View>

            <View
              style={{
                alignItems: "flex-end",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <TextInput
                placeholder="Email Address"
                style={styles.inputStyles}
                value={email}
                onChangeText={setEmail}
              />
              <View style={{ position: "relative", width: "100%" }}>
                <TextInput
                  placeholder="Enter Password"
                  style={styles.inputStyles}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.iconStyle}
                >
                  {showPassword ? (
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
              <Link
                href={"/(auth)/(parent)/(forget)/parentForgetPassword"}
                asChild
              >
                <TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "AvenirRegular",
                      fontSize: 14,
                      color: "#555555",
                    }}
                  >
                    Forgotten Password?
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>

            <TouchableOpacity
              onPress={handleSignin}
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
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{ alignItems: "center", flexDirection: "column", gap: 20 }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
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
              Don’t have an account?{" "}
              <Link
                href={"/(auth)/(parent)/parentRegister"}
                style={{ color: "#00C0EA", fontFamily: "AvenirDemi" }}
              >
                Sign up
              </Link>
            </Text>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default parentLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
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
