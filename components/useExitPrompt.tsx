import { useEffect, useState } from "react";
import { Alert, BackHandler, Platform } from "react-native";

const useExitPrompt = () => {
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      const backAction = () => {
        if (isPromptVisible) {
          return false; // Exit the app
        }

        Alert.alert("Exit App", "Do you want to exit?", [
          {
            text: "Cancel",
            onPress: () => setIsPromptVisible(false),
            style: "cancel",
          },
          { text: "OK", onPress: () => BackHandler.exitApp() },
        ]);
        setIsPromptVisible(true);

        return true; // Prevent the default behavior
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, [isPromptVisible]);

  return {
    setIsPromptVisible,
  };
};

export default useExitPrompt;
