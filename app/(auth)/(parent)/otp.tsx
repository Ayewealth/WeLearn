import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import AuthHeader from "@/components/AuthHeader";
import { useRouter } from "expo-router";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CELL_COUNT = 6;
const otp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getEmail = async () => {
    try {
      const jsonValue: any = await AsyncStorage.getItem("userEmail");
      setEmail(jsonValue);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://welearnapi.fun/api/account-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok || response.status === 200) {
        router.replace("/(auth)/(parent)/success");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  const ref = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);

  return (
    <Animated.View
      entering={FadeInLeft.duration(400).delay(200)}
      exiting={FadeOutRight.duration(200).delay(200)}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <AuthHeader />

      <View
        style={{
          flexDirection: "column",
          gap: 20,
          marginTop: 15,
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "column", gap: 10, width: "100%" }}>
          <Text
            style={{ fontFamily: "AvenirBold", fontSize: 32, lineHeight: 45 }}
          >
            Verify Your Email Address
          </Text>
          <Text
            style={{
              fontFamily: "AvenirRegular",
              fontSize: 17,
              color: "#555555",
              lineHeight: 30,
            }}
          >
            To ensure account security and access to all features, please verify
            your email address by entering the code we've sent to your inbox.
          </Text>
        </View>

        <View style={{ flexDirection: "column", gap: 40 }}>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={otp}
            onChangeText={setOtp}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete={Platform.select({
              android: "sms-otp",
              default: "one-time-code",
            })}
            testID="my-code-input"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

          <TouchableOpacity
            onPress={handleVerify}
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
                Verify
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Text
            style={{ fontFamily: "AvenirDemi", color: "#00C0EA", fontSize: 16 }}
          >
            {formatTime(seconds)}
          </Text>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text style={{ fontFamily: "AvenirRegular", fontSize: 14 }}>
              Didn't receive a code?{" "}
            </Text>
            {seconds === 0 ? (
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "AvenirDemi",
                    fontSize: 14,
                    color: "#00C0EA",
                  }}
                >
                  Resend
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "AvenirDemi",
                    fontSize: 14,
                    color: "rgba(85, 85, 85, 0.3)",
                  }}
                >
                  Resend
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    width: 45,
    height: 45,
    lineHeight: 38,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#00C0EA",
    textAlign: "center",
    borderRadius: 10,
    fontFamily: "AvenirDemi",
    color: "#00C0EA",
  },
  focusCell: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderColor: "#00C0EA",
    fontFamily: "AvenirDemi",
  },
});
