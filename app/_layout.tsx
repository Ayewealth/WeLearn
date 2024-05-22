import { useFonts } from "expo-font";
import { Slot, useFocusEffect, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import "react-native-reanimated";

import { StatusBar } from "expo-status-bar";

import { AuthContext, AuthContextProvider } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const segments = useSegments();
  const router = useRouter();

  const [seenScreen, setSeenScreen] = useState<boolean | any>(false);
  const {
    isAuthenticated,
    isParent,
    isInstructor,
    setIsInstructor,
    setIsAuthenticated,
    setIsParent,
  } = useContext(AuthContext);

  const getScreen = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("seenScreen");
      const instructor = await AsyncStorage.getItem("isInstructor");
      const parent = await AsyncStorage.getItem("isParent");
      const auth = await AsyncStorage.getItem("isAuthenticated");
      setSeenScreen(jsonValue);
      setIsInstructor(instructor);
      setIsParent(parent);
      setIsAuthenticated(auth);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const removeItem = async () => {
    await AsyncStorage.clear();
  };

  useEffect(() => {
    getScreen();
    // removeItem();
  }, []);

  useEffect(() => {
    const inTabsGroup = segments[0] === "(app)";

    if (isAuthenticated && !inTabsGroup && isParent) {
      router.replace("/(app)/(parent)/");
    } else if (isAuthenticated && !inTabsGroup && isInstructor) {
      router.replace("/(app)/(instructor)/");
    } else if (!isAuthenticated && !seenScreen) {
      router.replace("/(onboarding)/onboardOne");
    } else if (!isAuthenticated && seenScreen && isParent) {
      router.replace("/(auth)/(parent)/parentLogin");
    } else if (!isAuthenticated && seenScreen && isInstructor) {
      router.replace("/(auth)/(instructor)/instructorLogin");
    } else if (!isAuthenticated && seenScreen) {
      router.replace("/(onboarding)/choose");
    }
  }, [seenScreen, isAuthenticated, isInstructor, isParent]);

  return <Slot />;
};
const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    AvenirBold: require("../assets/fonts/AvenirNextLTPro-Bold.otf"),
    AvenirCn: require("../assets/fonts/AvenirNextLTPro-Cn.otf"),
    AvenirDemi: require("../assets/fonts/AvenirNextLTPro-Demi.otf"),
    AvenirHeavy: require("../assets/fonts/AvenirNextLTPro-Heavy.otf"),
    AvenirIt: require("../assets/fonts/AvenirNextLTPro-It.otf"),
    AvenirMedium: require("../assets/fonts/AvenirNextLTPro-MediumCn.otf"),
    AvenirRegular: require("../assets/fonts/AvenirNextLTPro-Regular.otf"),
    AvenirUltLt: require("../assets/fonts/AvenirNextLTPro-UltLt.otf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded) {
      <StatusBar style="light" />;
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <InitialLayout />
    </AuthContextProvider>
  );
};

export default RootLayout;
