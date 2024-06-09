import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import jwtDecode from "jwt-decode";

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

  console.log(authTokens);

  const navigate = useRouter();

  const loadAuthData = async () => {
    const storedAuthTokens = await AsyncStorage.getItem("authTokens");
    if (storedAuthTokens) {
      const tokens = JSON.parse(storedAuthTokens);
      setAuthTokens(tokens);
      setUser(jwtDecode(tokens.access));
      setIsAuthenticated(true);
    }
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
        setTutors(data);
        setLoading(false);
        console.log("Got Tutors Details");
      } else {
        setLoading(false);
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
        `https://welearnapi.fun/api/student-profiles/update/${user.profile_id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setUserDetails(data);
        console.log("Got User Details");
      } else {
        console.log(data.detail);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem("isAuthenticated");
    await AsyncStorage.removeItem("authTokens");

    if (isParent) {
      navigate.replace("/(auth)/(parent)/parentLogin");
    } else if (isInstructor) {
      navigate.replace("/(auth)/(instructor)/instructorLogin");
    }

    setAuthTokens(null);
    setUser(null);
    setIsAuthenticated(false);
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
