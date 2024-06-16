import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const changePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { top, bottom } = useSafeAreaInsets();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 15,
        paddingHorizontal: 20,
        paddingTop: 30 + top,
        backgroundColor: "#FCFCFC",
      }}
    >
      <Text style={{ fontFamily: "AvenirDemi", fontSize: 20 }}>
        Change Password
      </Text>
      <Text
        style={{ fontFamily: "AvenirRegular", fontSize: 17, lineHeight: 28 }}
      >
        Enter a new password for your Welearn account.
      </Text>

      <View style={{ marginTop: 20 }}>
        <View style={{ position: "relative", width: "100%" }}>
          <TextInput
            placeholder="Enter Password"
            style={styles.inputStyles}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconStyle}
          >
            {showPassword ? (
              <Ionicons name="eye-off-outline" size={22} color="#555555" />
            ) : (
              <Ionicons name="eye-outline" size={22} color="#555555" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default changePassword;

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
    fontSize: 15,
    color: "555555",
    width: "100%",
  },
  iconStyle: {
    position: "absolute",
    top: 17,
    right: 30,
  },
});
