import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome6 } from "@expo/vector-icons";

import AuthHeader from "@/components/AuthHeader";
import { AuthContext } from "@/context/AuthContext";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";

const edit = () => {
  const { userDetails, user, authTokens, getLoginStudent } =
    useContext(AuthContext);

  const [profilePic, setProfilePic] = useState(
    userDetails && userDetails ? userDetails.profile_pic : null
  );
  const [name, setName] = useState(
    userDetails && userDetails ? userDetails.user?.name : ""
  );
  const [email, setEmail] = useState(
    userDetails && userDetails ? userDetails.user?.email : ""
  );
  const [location, setLocation] = useState(
    userDetails && userDetails ? userDetails.location : ""
  );
  const [date, setDate] = useState(
    userDetails && userDetails ? userDetails.user?.date_joined : ""
  );
  const [loading, setLoading] = useState(false);

  const updateName = async () => {
    setLoading(true);

    try {
      let response = await fetch(
        `https://welearnapi.fun/api/user/update/${user.user_id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        getLoginStudent();
        alert("User Name Updated");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateLocation = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("location", location);
    if (profilePic) {
      const profileFile: any = {
        name: profilePic.fileName,
        uri: profilePic.uri,
        type: profilePic.mimeType,
        size: profilePic.fileSize,
      };
      formData.append("profile_pic", profileFile);
    }

    try {
      let response = await fetch(
        `https://welearnapi.fun/api/student-profiles/update/${user.profile_id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        getLoginStudent();
        alert("User Name Updated");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    updateName();
    updateLocation();
  };

  const { top, bottom } = useSafeAreaInsets();

  const handleDeleteLicense = () => {
    setProfilePic(undefined);
  };

  const uploadProfile = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        saveProfile(result.assets[0]);
      } else {
        alert("You did not select any image.");
      }
    } catch (error) {}
  };

  const saveProfile = async (image: any) => {
    try {
      setProfilePic(image);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Animated.View
      entering={FadeInLeft.duration(400).delay(200)}
      exiting={FadeOutRight.duration(200).delay(200)}
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 20,
        paddingHorizontal: 20,
        paddingTop: top - 17,
        backgroundColor: "#FCFCFC",
      }}
    >
      <AuthHeader />
      <Text style={{ fontFamily: "AvenirDemi", fontSize: 20 }}>
        Edit Account
      </Text>

      <View style={{ flexDirection: "column", gap: 30 }}>
        <View style={{ flexDirection: "column", gap: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <Image
              source={{
                uri:
                  typeof profilePic === "string" ? profilePic : profilePic?.uri,
              }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                marginRight: 20,
              }}
            />
            <TouchableOpacity
              onPress={uploadProfile}
              style={{
                backgroundColor: "#CCF2FB",
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 50,
              }}
            >
              <Text
                style={{
                  fontFamily: "AvenirDemi",
                  color: "#00C0EA",
                  fontSize: 13,
                }}
              >
                Upload
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontFamily: "AvenirBold", fontSize: 17 }}>
            {userDetails.user?.name || "John Doe"}
          </Text>
          <Text style={{ fontFamily: "AvenirRegular", fontSize: 14 }}>
            {userDetails.user?.email}
          </Text>
        </View>

        <View style={{ flexDirection: "column", gap: 15 }}>
          <Text style={{ fontFamily: "AvenirDemi", fontSize: 17 }}>
            Personal Information
          </Text>

          <View style={{ flexDirection: "column", gap: 15 }}>
            <View style={{ position: "relative" }}>
              <TextInput
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  fontFamily: "AvenirRegular",
                  fontSize: 15,
                  borderColor: "rgba(85, 85, 85, 0.3)",
                  borderWidth: 1,
                }}
              />
              <FontAwesome6
                name="edit"
                size={20}
                color="#555555"
                style={{ position: "absolute", right: 15, top: "32%" }}
              />
            </View>
            <TextInput
              placeholder="John Doe"
              value={email}
              onChangeText={setEmail}
              editable={false}
              placeholderTextColor={"#000"}
              style={{
                padding: 12,
                borderRadius: 10,
                fontFamily: "AvenirRegular",
                fontSize: 15,
                borderColor: "rgba(85, 85, 85, 0.3)",
                borderWidth: 1,
                backgroundColor: "#CBCBCBB2",
                color: "#000",
              }}
            />
            <View style={{ position: "relative" }}>
              <TextInput
                placeholder="Port Harcourt"
                value={location}
                onChangeText={setLocation}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  fontFamily: "AvenirRegular",
                  fontSize: 15,
                  borderColor: "rgba(85, 85, 85, 0.3)",
                  borderWidth: 1,
                  paddingRight: 45,
                }}
              />
              <FontAwesome6
                name="edit"
                size={20}
                color="#555555"
                style={{ position: "absolute", right: 15, top: "32%" }}
              />
            </View>
            <TextInput
              placeholder="John Doe"
              value={date}
              onChangeText={setDate}
              editable={false}
              placeholderTextColor={"#000"}
              style={{
                padding: 12,
                borderRadius: 10,
                fontFamily: "AvenirRegular",
                fontSize: 15,
                borderColor: "rgba(85, 85, 85, 0.3)",
                borderWidth: 1,
                backgroundColor: "#CBCBCBB2",
                color: "#000",
              }}
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
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
        </View>
      </View>
    </Animated.View>
  );
};

export default edit;
