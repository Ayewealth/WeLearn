import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import AuthHeader from "@/components/AuthHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutDown,
  FadeOutRight,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const parentRegister = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [terms, setTerms] = useState(false);
  const [seeTerms, setSeeTerms] = useState(false);

  const router = useRouter();
  const animation = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword1(!showPassword1);
  };

  const closeSeeTerms = () => {
    setSeeTerms(!seeTerms);
  };

  const closeAlert = () => {
    setAlert(false);
    if (success) {
      router.push("/(auth)/(parent)/parentLogin");
    }
  };

  const handleSignup = async () => {
    if (!terms) return;

    setLoading(true);
    try {
      const response = await fetch("https://welearnapi.fun/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullname,
          email: email,
          password: password,
          user_type: "Student",
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setSuccess(true);
        setAlertType("success");
        setMessage(data.message);
        await AsyncStorage.setItem("userEmail", email);
        await AsyncStorage.setItem("isParent", JSON.stringify(true));
      } else {
        setSuccess(false);
        setAlertType("error");
        setMessage(data.message);
      }
      setAlert(true);
    } catch (error) {
      setAlertType("error");
      setMessage("An error occurred. Please try again.");
      setAlert(true);
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {alert && (
        <Animated.View
          entering={FadeInDown.duration(200).delay(200)}
          exiting={FadeOutDown.duration(200).delay(200)}
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,

            width: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <Animated.View
            entering={FadeInLeft.duration(400).delay(400)}
            exiting={FadeOutRight.duration(200).delay(200)}
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: 10,

              paddingVertical: 20,
              paddingHorizontal: 20,
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            {alertType === "success" ? (
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: 100,
                  height: 100,
                }}
                source={require("../../../assets/images/Animation - 1715980088409.json")}
              />
            ) : (
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: 100,
                  height: 100,
                }}
                source={require("../../../assets/images/Animation - 1715978787640.json")}
              />
            )}
            <Text style={{ fontSize: 16, fontFamily: "AvenirRegular" }}>
              {message}
            </Text>
            <TouchableOpacity
              onPress={closeAlert}
              style={{
                backgroundColor:
                  alertType === "success" ? "#00C0EA" : "#EC1C23",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
              }}
            >
              <Text style={{ fontFamily: "AvenirRegular", color: "#fff" }}>
                Close
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      )}

      {seeTerms && (
        <Animated.View
          entering={FadeInDown.duration(200).delay(200)}
          exiting={FadeOutDown.duration(200).delay(200)}
          style={styles.seeTerm}
        >
          <ScrollView style={{ flex: 1 }}>
            <Animated.View
              entering={FadeInDown.duration(400).delay(400)}
              exiting={FadeOutDown.duration(200).delay(200)}
              style={{
                flexDirection: "column",
                alignItems: "center",
                gap: 15,

                paddingTop: 50,
                paddingBottom: 30,
                paddingHorizontal: 20,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "AvenirBold",
                  fontSize: 14,
                  lineHeight: 30,
                }}
              >
                WELEARN GLOBAL TERMS AND CONDITIONS
              </Text>

              <View style={{ flex: 1, flexDirection: "column", gap: 15 }}>
                <Text
                  style={{
                    fontFamily: "AvenirRegular",
                    fontSize: 14,
                    lineHeight: 30,
                  }}
                >
                  WeLearn Global provides academic tutorship services known as
                  WeLearn wherein subscribers to our services are provided with
                  teachers across various subjects for students in the Nursery,
                  Primary, Secondary and Post-Secondary institutions with the
                  aim of improving them and equipping them to face the
                  challenges of academic pursuit in Nigeria as well as compete
                  favourably with their counterparts across any part of the
                  world.
                </Text>

                <Text
                  style={{
                    fontFamily: "AvenirRegular",
                    fontSize: 14,
                    lineHeight: 30,
                  }}
                >
                  WeLearn Global therefore welcomes you to our website. If you
                  continue to browse and use our website, it means you agree to
                  comply with and be bound by the WeLearn Global terms and
                  conditions of use which govern WeLearn Global’s relationship
                  with you in this website. If you disagree, please do not use.
                  WeLearn refers to the owner of the website whose registered
                  office is …….. in Nigeria. ‘You’ refers to the user or viewer
                  of our website.
                </Text>

                <Text
                  style={{
                    fontFamily: "AvenirRegular",
                    fontSize: 14,
                    lineHeight: 30,
                  }}
                >
                  The use of Welearn Global website is subject to the following
                  Terms and Conditions of use
                </Text>

                <View style={{ flexDirection: "column", gap: 7 }}>
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Every content of this webpage is for general information
                      and use only which can be changed anytime without notice.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      The Welearn website uses cookies.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Neither we nor any third parties provide any warranty or
                      guarantee as to the accuracy, timeliness, performance,
                      completeness or suitability of the information and
                      materials found or offered on this website for any
                      particular purpose. You acknowledge that such information
                      and materials may contain inaccuracies or errors and we
                      expressly exclude liability for any such inaccuracies or
                      errors to the fullest extent permitted by law.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Your use of any information or materials on this website
                      is entirely at your own risk, for which we shall not be
                      liable. It shall be your own responsibility to ensure that
                      any products, services or information available through
                      this website meet your specific requirements.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      This website contains material which is owned by or
                      licensed to us. This material includes, but is not limited
                      to, the design, layout, look, appearance and graphics.
                      Reproduction is prohibited other than in accordance with
                      the copyright notice, which forms part of these terms and
                      conditions.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      All trademarks reproduced in this website, which are not
                      the property of, or licensed to the Welearn Global, are
                      acknowledged on the website.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Unauthorized use of this website may give rise to a claim
                      for damages and/or be a criminal offence.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      From time to time, this website may also include links to
                      other websites. These links are provided for your
                      convenience to provide further information. They do not
                      signify that we endorse the website(s). We have no
                      responsibility for the content of the linked website(s).
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Your use of this website and any dispute arising out of
                      such use of the website is subject to the laws of Nigeria
                      and enforceable within the limit of those laws.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      WeLearn provides teachers to students to physically teach
                      them various subjects with respect to their subscriptions.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      These teachings take place at an agreed venue and time
                      convenient to both parties.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      The subscription is offered through a number of packages
                      at different prices.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      The list of our packages on offer and their prices can be
                      accessed on this website.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      We may offer additional services at the subscribers'
                      request and prices agreed on.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Once request is approved, Welearn Global provides teachers
                      to subscribers based on the packages they have subscribed.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      The Welearn Global packages are pay on the go services.
                      That is payments are made before services are rendered.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Teachers are withdrawn the moment payment for a particular
                      package subscribed to expires except renewed.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      WeLearn ensures that teachers comply with the time-table
                      and schedule and accepts responsibility for failure to
                      keep to time and schedule by the teachers.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Inappropriate behaviour of our staff must be reported
                      immediately through our customer care hotlines which are
                      provided on this website.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      If there is any report of missing item from subscribers
                      during the course of teaching and the subscriber honestly
                      believes that the teacher is responsible for such missing
                      item, subscriber is encouraged to report same to
                      management for investigation and necessary action where
                      teacher is found wanting.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      You can sign up to the Welearn Global by sending a request
                      online or visiting our office
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      WeLearn will ask certain questions aimed at identifying
                      who you are, where you live, how you can be contacted and
                      how you will pay Welearn Global for subscriptions
                      requested.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      We will either accept or reject your request based on our
                      review of your personal information.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Students aged below 15 years cannot subscribe on their own
                      and must be subscribed for by their parents or guardians.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Fees are paid monthly or for the number of months
                      subscribed for.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Fees may be periodically reviewed to meet present
                      realities.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      You will have access to Welearn Global teachers for the
                      period of your subscription only.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      If you wish to withdraw your subscription while your
                      subscription is still on, WeLearn shall not make any
                      refund as our Teachers are paid monthly and shall be
                      entitled to their monthly pay even though they worked for
                      just a day before you voluntarily withdrew your
                      subscription.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      You may pay your subscription in cash at our registered
                      office or through our bank details made available on this
                      website.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Welearn Global shall not be held responsible for payment
                      to unauthorized persons.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Welearn Global shall use your personal information to
                      communicate with you as the need arises.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      We both agree to use confidential information for the
                      purpose of allowing you or us to fulfill our obligation to
                      each other only.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      If any arbitrator or court finds that you or we have
                      violated these terms and condition and any person suffers
                      losses because of such violation, the party that violated
                      the terms and condition must compensate the other for
                      those losses.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      You confirm that you did not rely on any representation,
                      warranty or undertaking when requesting access to Welearn
                      Global. This does not limit or restrict any liability
                      arising as a result of fraud.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      If we do not enforce any of our rights in terms of this
                      document, it does not mean that we are waiving that right
                      or any other rights.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      If any provision in this document is found to be invalid,
                      the rest of the document will remain in effect.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Neither you or us will be responsible for any violation,
                      delay in performing, or failure to perform your or our
                      obligations in terms of this document if such violation,
                      delay or failure results from circumstances beyond your or
                      our reasonable control.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      We may transfer all our rights in this document to any
                      person and at any time.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Subject to the consumer protection laws in force in
                      Nigeria, this document will be governed and interpreted by
                      the laws of Nigeria. Any disputes will be referred to
                      arbitration in terms of arbitration Laws in Nigeria. The
                      arbitration will take place in Nigeria and at a location
                      chosen by us.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      The following addresses may be used for the service of all
                      notices and processes arising out of this document.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      Welearn Global address:
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      You: the physical address you last provided to us.
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 24, marginRight: 10 }}>•</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "AvenirRegular",
                        fontSize: 14,
                        lineHeight: 25,
                      }}
                    >
                      A notice that is actually received by you or by us will be
                      adequate notice even if the notice was not delivered to
                      the addresses above.
                    </Text>
                  </View>
                </View>

                <Text style={{ fontFamily: "AvenirBold", fontSize: 14 }}>
                  WeLearn Global Managing Director
                </Text>
              </View>

              <TouchableOpacity
                onPress={closeSeeTerms}
                style={{
                  alignItems: "center",
                  backgroundColor: "#00C0EA",
                  padding: 13,
                  borderRadius: 50,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "AvenirRegular",
                    color: "#fff",
                    fontSize: 14,
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </Animated.View>
      )}

      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar style="dark" />

        <AuthHeader />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, marginTop: 15 }}
        >
          <Animated.ScrollView
            entering={FadeInLeft.duration(200).delay(200)}
            exiting={FadeOutRight.duration(200).delay(200)}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flexDirection: "column", gap: 20, width: "100%" }}>
              <View style={{ flexDirection: "column", gap: 10, width: "100%" }}>
                <Text style={{ fontFamily: "AvenirBold", fontSize: 32 }}>
                  Join Welearn Today!
                </Text>
                <Text
                  style={{
                    fontFamily: "AvenirRegular",
                    fontSize: 17,
                    color: "#555555",
                    lineHeight: 30,
                  }}
                >
                  Unlock a world of educational opportunities for your child or
                  to embark on a rewarding journey as a tutor.
                </Text>
              </View>
              <View style={{ flexDirection: "column", gap: 15 }}>
                <TextInput
                  placeholder="Full Name"
                  style={styles.inputStyles}
                  value={fullname}
                  onChangeText={setFullname}
                />
                <TextInput
                  placeholder="Email Address"
                  style={styles.inputStyles}
                  value={email}
                  onChangeText={setEmail}
                />
                <View style={{ position: "relative", width: "100%" }}>
                  <TextInput
                    placeholder="Password"
                    style={styles.inputStyles}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword1}
                  />

                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.iconStyle}
                  >
                    {showPassword1 ? (
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
                <TouchableOpacity
                  disabled={!terms}
                  onPress={handleSignup}
                  style={{
                    alignItems: "center",
                    backgroundColor: terms ? "#00C0EA" : "#A0A0A0",
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
                      Sign Up
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row" }}>
                <BouncyCheckbox
                  style={{ flex: 0.1 }}
                  size={20}
                  fillColor="#00C0EA"
                  iconStyle={{ borderColor: "red", borderRadius: 5 }}
                  innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                  isChecked={terms}
                  onPress={() => setTerms(!terms)}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: "AvenirRegular", lineHeight: 25 }}>
                    By signing up, you agree to our{" "}
                    <Text
                      onPress={closeSeeTerms}
                      style={{ color: "#00C0EA", fontFamily: "AvenirBold" }}
                    >
                      Terms of Service
                    </Text>{" "}
                    and{" "}
                    <Text
                      onPress={closeSeeTerms}
                      style={{ color: "#00C0EA", fontFamily: "AvenirBold" }}
                    >
                      Privacy Policy.
                    </Text>
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(85, 85, 85, 0.3)",
                    height: 1,
                  }}
                ></View>
                <Text style={{ color: "#555555", fontFamily: "AvenirRegular" }}>
                  or
                </Text>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(85, 85, 85, 0.3)",
                    height: 1,
                  }}
                ></View>
              </View>

              <View
                style={{
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
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
                  Already have an account?{" "}
                  <Link
                    href={"/(auth)/(parent)/parentLogin"}
                    style={{ color: "#00C0EA", fontFamily: "AvenirDemi" }}
                  >
                    Login
                  </Link>
                </Text>
              </View>
            </View>
          </Animated.ScrollView>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default parentRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
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
  seeTerm: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,

    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});
