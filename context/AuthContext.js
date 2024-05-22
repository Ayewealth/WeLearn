import AsyncStorage from "@react-native-async-storage/async-storage";

const { createContext, useState, useEffect } = require("react");

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(async () =>
    (await AsyncStorage.getItem("authTokens"))
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(async () =>
    (await AsyncStorage.getItem("authTokens"))
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isParent, setIsParent] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);

  const logoutUser = async () => {
    setAuthTokens(null);
    setUser(null);
    await AsyncStorage.removeItem("authTokens");
    setIsAuthenticated(false);
  };

  const updateToken = async () => {
    console.log("Token Updated");
    let response = await fetch(
      "https://bmp-app.onrender.com/api/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authTokens?.refresh }),
      }
    );
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      await AsyncStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };

  useEffect(() => {
    const mins = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, mins);
    return () => clearInterval(interval);
  }, [authTokens]);

  const contextData = {
    isAuthenticated,
    isParent,
    isInstructor,
    setIsAuthenticated,
    setIsParent,
    setIsInstructor,
    user,
    updateToken,
    logoutUser,
    authTokens,
    setAuthTokens,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
