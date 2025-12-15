import { useState } from "react";
import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginService } from "./LoginServices";
import { LoginResponse } from "./LoginTypes";

export const useLoginController = (navigation: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response: LoginResponse = await LoginService.login(username, password);

      console.log("=== FULL LOGIN RESPONSE ===");
      console.log(JSON.stringify(response, null, 2));
     
      const statusCode = response?.status?.statusCode;

      // ❌ If API returns 401 or FAILURE → Show Error
      if (statusCode !== 200) {
        const errorMessage =
          response?.data?.content?.message ||
          "Login failed. Please check your username/password.";

        Alert.alert("Login Failed", errorMessage);
        return;
      }

     
     
     
      const content = response?.data?.content;

      if (!content) {
        Alert.alert("Error", "Invalid server response.");
        console.log("❌ ERROR: Content missing in login response");
        return;
      }

      const { apiKey, authToken, firstTime,loginName } = content;

      console.log("Extracted Values:", { apiKey, authToken, firstTime,loginName });

      // Save values
      await AsyncStorage.setItem("API_KEY", apiKey);
      await AsyncStorage.setItem("AUTH_TOKEN", authToken);
      await AsyncStorage.setItem("LOGIN_NAME", loginName);
      await AsyncStorage.setItem("FIRST_TIME", JSON.stringify(firstTime));

      // Navigate
      if (firstTime === true) {
        console.log("➡ Navigating to StartYourJourney");
        navigation.replace("WelcomeScreen");
      } else {
        console.log("➡ Navigating to Dashboard");
        navigation.replace("Dashboard");
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    password,
    loading,
    setUsername,
    setPassword,
    handleLogin,
  };
};
