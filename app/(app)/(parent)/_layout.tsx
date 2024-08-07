import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useContext, useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { Link, useNavigation, useRouter } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

import CustomDrawerComponent from "@/components/CustomDrawerComponent";
import { Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";

const ParentLayout = () => {
  const navigate = useRouter();
  const navigation = useNavigation();

  const { getLoginStudent, getAllTutors, tutors, userDetails, user } =
    useContext(AuthContext);

  useEffect(() => {
    getLoginStudent();
    getAllTutors();
  }, [user]);
  useEffect(() => {}, [userDetails, tutors]);

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
              <Link href="/(app)/(parent)/account" asChild>
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
              </Link>
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
          name="allHiredTutors"
          options={{
            drawerLabel: "All Hired Tutors",
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
          name="instructor/[id]"
          options={{
            drawerItemStyle: { display: "none" },
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="instructor/edit"
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
        <Drawer.Screen
          name="instructor/hired/[id]"
          options={{
            drawerItemStyle: { display: "none" },
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="instructor/paymentSuccess"
          options={{
            drawerItemStyle: { display: "none" },
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default ParentLayout;
