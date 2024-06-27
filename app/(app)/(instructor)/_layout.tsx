import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useContext, useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { useNavigation, useRouter } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

import CustomDrawerComponent from "@/components/CustomDrawerComponent";
import { Image, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";

const InstructorLayout = () => {
  const navigate = useRouter();
  const navigation = useNavigation();

  const { getLoginTutor, getAllTutorClass, tutorClass, userDetails, user } =
    useContext(AuthContext);

  useEffect(() => {
    getLoginTutor();
    getAllTutorClass();
  }, [user]);
  useEffect(() => {}, [userDetails, tutorClass]);

  const ToggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerComponent}
        screenOptions={{
          drawerActiveBackgroundColor: "#fff",
          drawerActiveTintColor: "#000",
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            headerTitle: "Welearn",
            headerTitleStyle: {
              color: "#00C0EA",
              fontFamily: "AvenirBold",
              fontSize: 16,
            },
            headerTransparent: true,
            drawerItemStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                onPress={ToggleDrawer}
                style={{ marginLeft: 20 }}
              >
                <MaterialIcons name="menu" size={32} color="black" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity>
                {userDetails && userDetails.profile_pic ? (
                  <Image
                    source={{ uri: userDetails.profile_pic }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      marginRight: 20,
                    }}
                  />
                ) : (
                  <Image
                    source={require("../../../assets/images/profile.png")}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      backgroundColor: "#00C0EA",
                      marginRight: 20,
                    }}
                  />
                )}
              </TouchableOpacity>
            ),
          }}
        />

        <Drawer.Screen
          name="account"
          options={{
            drawerLabel: "Account",
            drawerLabelStyle: {
              marginLeft: -20,
              fontFamily: "AvenirDemi",
              fontSize: 16,
              color: "#0F0F0F",
            },
            headerTitle: "",
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigate.back()}
                style={{ marginLeft: 20 }}
              >
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
              </TouchableOpacity>
            ),
            drawerIcon: () => <Feather name="user" size={22} color="#00C0EA" />,
          }}
        />

        <Drawer.Screen
          name="allStudents"
          options={{
            drawerLabel: "All Students",
            drawerLabelStyle: {
              marginLeft: -20,
              fontFamily: "AvenirDemi",
              fontSize: 16,
              color: "#0F0F0F",
            },
            headerTitle: "",
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigate.back()}
                style={{ marginLeft: 20 }}
              >
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
              </TouchableOpacity>
            ),
            drawerIcon: () => (
              <Feather name="users" size={22} color="#00C0EA" />
            ),
          }}
        />

        <Drawer.Screen
          name="changePassword"
          options={{
            drawerLabel: "Change Password",
            drawerLabelStyle: {
              marginLeft: -20,
              fontFamily: "AvenirDemi",
              fontSize: 16,
              color: "#0F0F0F",
            },
            headerTitle: "",
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigate.back()}
                style={{ marginLeft: 20 }}
              >
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
              </TouchableOpacity>
            ),
            drawerIcon: () => (
              <SimpleLineIcons name="lock" size={22} color="#00C0EA" />
            ),
          }}
        />

        <Drawer.Screen
          name="parent/[id]"
          options={{
            drawerItemStyle: { display: "none" },
            headerShown: false,
          }}
        />

        <Drawer.Screen
          name="parent/edit"
          options={{
            drawerItemStyle: { display: "none" },
            headerShown: false,
            headerTitle: "",
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigate.back()}
                style={{ marginLeft: 20 }}
              >
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default InstructorLayout;
