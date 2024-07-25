import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import jwtDecode from "jwt-decode";
import isEqual from "lodash.isequal";

const { createContext, useState, useEffect, useContext } = require("react");

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [isParent, setIsParent] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [tutorClass, setTutorClass] = useState([]);

  const navigate = useRouter();
  // console.log(user);

  const loadAuthData = async () => {
    const storedAuthTokens = await AsyncStorage.getItem("authTokens");
    const decodedAccess = await AsyncStorage.getItem("decodedAccess");
    const userDetails = await AsyncStorage.getItem("userDetails");

    if (storedAuthTokens) {
      const tokens = JSON.parse(storedAuthTokens);
      setAuthTokens(tokens);
    }
    if (decodedAccess) {
      const decode = JSON.parse(decodedAccess);
      setUser(decode);
    }
    if (userDetails) {
      const details = JSON.parse(userDetails);
      setUserDetails(details);
    }
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (authTokens === null || authTokens === undefined) {
      loadAuthData();
    }
  }, []);

  const getAllTutors = async () => {
    setLoading(true);
    try {
      let response = await fetch(
        "https://welearnapi.fun/api/instructor-profiles/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        const sortedTutors = data.sort((a, b) => b.is_verified - a.is_verified);

        if (!isEqual(tutors, sortedTutors)) {
          setTutors(sortedTutors);
          console.log("Tutors updated");
        } else {
          console.log("Tutors are the same, no update needed");
        }
      } else {
        console.log(data.detail);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getLoginStudent = async () => {
    try {
      let response = await fetch(
        `https://welearnapi.fun/api/student-profiles/update/${user?.profile_id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (!isEqual(userDetails, data)) {
          await AsyncStorage.setItem("userDetails", JSON.stringify(data));
          setUserDetails(data);
          console.log("User updated");
        } else {
          console.log("User Details are the same, no update needed");
        }
        console.log("Got User Details");
      } else {
        console.log(data.detail);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLoginTutor = async () => {
    try {
      let response = await fetch(
        `https://welearnapi.fun/api/instructor-profiles/update/${user?.profile_id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (!isEqual(userDetails, data)) {
          await AsyncStorage.setItem("userDetails", JSON.stringify(data));
          setUserDetails(data);
          console.log("User updated");
        } else {
          console.log("User Details are the same, no update needed");
        }
        console.log("Got User Details");
      } else {
        console.log(data.detail);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTutorClass = async () => {
    setLoading(true);
    try {
      let response = await fetch("https://welearnapi.fun/api/class-bookings/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        if (!isEqual(tutorClass, data)) {
          setTutorClass(data);
          console.log("TutorClass updated");
        } else {
          console.log("TutorClass are the same, no update needed");
        }
      } else {
        console.log(data.detail);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem("isAuthenticated");
    await AsyncStorage.removeItem("authTokens");
    await AsyncStorage.removeItem("isParent");
    await AsyncStorage.removeItem("isInstructor");

    navigate.replace("/(onboarding)/choose");

    setAuthTokens(null);
    setUser(null);
    setIsAuthenticated(false);
    setIsParent(false);
    setIsInstructor(false);
  };

  const contextData = {
    isAuthenticated,
    isParent,
    isInstructor,
    setIsAuthenticated,
    setIsParent,
    setIsInstructor,
    user,
    logoutUser,
    authTokens,
    setAuthTokens,
    setUser,
    getLoginStudent,
    userDetails,
    getAllTutors,
    tutors,
    loading,

    tutorClass,
    setTutorClass,
    getLoginTutor,
    getAllTutorClass,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContext");
  }

  return value;
};
