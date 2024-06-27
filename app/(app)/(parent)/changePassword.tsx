import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";

const changePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const [loading, setLoading] = useState(false);

  const { top, bottom } = useSafeAreaInsets();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };

  const { authTokens } = useContext(AuthContext);

  const updatePassword = async () => {
    setLoading(true);

    try {
      let response = await fetch(
        "https://welearnapi.fun/api/change-password/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
          body: JSON.stringify({
            old_password: currentPassword,
            new_password: newPassword,
            confirm_new_password: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.detail);
      } else {
        alert(data.old_password);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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

      <View style={{ flexDirection: "column", gap: 15, marginTop: 20 }}>
        <View style={{ position: "relative", width: "100%" }}>
          <TextInput
            placeholder="Current Password"
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

        <View style={{ position: "relative", width: "100%" }}>
          <TextInput
            placeholder="New Password"
            style={styles.inputStyles}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showPassword2}
          />

          <TouchableOpacity
            onPress={togglePasswordVisibility2}
            style={styles.iconStyle}
          >
            {showPassword2 ? (
              <Ionicons name="eye-off-outline" size={22} color="#555555" />
            ) : (
              <Ionicons name="eye-outline" size={22} color="#555555" />
            )}
          </TouchableOpacity>
        </View>

        <View style={{ position: "relative", width: "100%" }}>
          <TextInput
            placeholder="Confirm New Password"
            style={styles.inputStyles}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword3}
          />

          <TouchableOpacity
            onPress={togglePasswordVisibility3}
            style={styles.iconStyle}
          >
            {showPassword3 ? (
              <Ionicons name="eye-off-outline" size={22} color="#555555" />
            ) : (
              <Ionicons name="eye-outline" size={22} color="#555555" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={updatePassword}
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
          {loading ? <ActivityIndicator color="#fff" /> : "Save & Continue"}
        </Text>
      </TouchableOpacity>
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
