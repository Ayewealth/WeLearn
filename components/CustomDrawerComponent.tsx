import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";

const CustomDrawerComponent = (props: any) => {
  const navigate = useRouter();

  const { isParent, logoutUser, userDetails } = useContext(AuthContext);
  console.log(isParent);

  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, width: "100%", zIndex: 20 }}>
      {isParent ? (
        <>
          <DrawerContentScrollView {...props} scrollEnabled={false}>
            <View
              style={{
                paddingBottom: 15,
                paddingTop: 20,
                paddingLeft: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => navigate.push("/(app)/(parent)/profile")}
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 15,
                }}
              >
                <View style={{ position: "relative" }}>
                  {userDetails && userDetails.profile_pic ? (
                    <Image
                      source={{ uri: userDetails.profile_pic }}
                      style={{
                        borderRadius: 50,
                        borderColor: "#00C0EA",
                        borderWidth: 2,
                        width: 100,
                        height: 100,
                      }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/images/profile.png")}
                      style={{
                        borderRadius: 50,
                        borderColor: "#00C0EA",
                        borderWidth: 2,
                        backgroundColor: "#FFE7CC",
                        width: 100,
                        height: 100,
                      }}
                    />
                  )}
                  <View
                    style={{
                      position: "absolute",
                      right: 5,
                      bottom: 5,
                      backgroundColor: "#04802E",
                      width: 25,
                      height: 25,
                      borderRadius: 50,
                    }}
                  ></View>
                </View>
                <View style={{ flexDirection: "column", gap: 8 }}>
                  <Text
                    style={{
                      fontFamily: "AvenirBold",
                      fontSize: 18,
                      lineHeight: 25,
                    }}
                    // numberOfLines={1}
                  >
                    {(userDetails && userDetails.user?.name) ||
                      "Sunday Kingsley Uchenna"}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "AvenirRegular",
                      fontWeight: "400",
                      color: "#0F973D",
                      fontSize: 15,
                    }}
                  >
                    Online
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-start",

              paddingLeft: 20,
            }}
          >
            <TouchableOpacity
              onPress={logoutUser}
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
                marginBottom: 50 + bottom,
              }}
            >
              <MaterialIcons name="logout" size={24} color="#00C0EA" />
              <Text style={{ fontFamily: "AvenirDemi", fontSize: 16 }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <DrawerContentScrollView {...props} scrollEnabled={false}>
            <View
              style={{
                paddingBottom: 15,
                paddingTop: 20,
                paddingLeft: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => navigate.push("/(app)/(instructor)/profile")}
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 15,
                }}
              >
                <View style={{ position: "relative" }}>
                  <Image
                    source={require("../assets/images/profile.png")}
                    style={{
                      borderRadius: 50,
                      borderColor: "#00C0EA",
                      borderWidth: 2,
                      backgroundColor: "#FFE7CC",
                      width: 100,
                      height: 100,
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      right: 5,
                      bottom: 5,
                      backgroundColor: "#04802E",
                      width: 25,
                      height: 25,
                      borderRadius: 50,
                    }}
                  ></View>
                </View>
                <View style={{ flexDirection: "column", gap: 8 }}>
                  <Text
                    style={{
                      fontFamily: "AvenirBold",
                      fontSize: 18,
                    }}
                    // numberOfLines={1}
                  >
                    Sunday Kingsley Uchenna Parents
                  </Text>
                  <Text
                    style={{
                      fontFamily: "AvenirRegular",
                      fontWeight: "400",
                      color: "#0F973D",
                      fontSize: 15,
                    }}
                  >
                    Online
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-start",

              paddingLeft: 20,
            }}
          >
            <TouchableOpacity
              onPress={logoutUser}
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
                marginBottom: 50 + bottom,
              }}
            >
              <MaterialIcons name="logout" size={24} color="#00C0EA" />
              <Text style={{ fontFamily: "AvenirDemi", fontSize: 16 }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CustomDrawerComponent;
