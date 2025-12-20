import { useState } from "react";
import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginService } from "./LoginServices";
import { LoginResponse } from "./LoginTypes";
import { UserInfoService } from "../UserInfo/UserInfoService";
import { setUserInfo } from "../../redux/actions";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/reactstore";


export const useLoginController = (navigation: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    setLoading(true);

    try {
      /* ======================
         1️⃣ LOGIN API
      ====================== */
      const response: LoginResponse =
        await LoginService.login(username, password);
      console.log("rESPONSE Code:", response);
      console.log("success:", response.success);
      console.log("status:", response.status);
      console.log("statusCode:", response.status?.statusCode);

      const statusCode =
        response?.status?.statusCode;
      console.log("Status Code:", statusCode);
      if (statusCode !== 200) {
        Alert.alert(
          "Login Failed",
          response?.data?.content?.message ||
          "Invalid username or password"
        );
        return; // ⛔ STOP
      }

      const content = response?.data?.content;
      if (!content) {
        Alert.alert("Error", "Invalid login response");
        return; // ⛔ STOP
      }

      const {
        apiKey,
        authToken,
        firstTime,
        loginName,
      } = content;

      /* ======================
         2️⃣ SAVE TOKENS
      ====================== */
      await AsyncStorage.multiSet([
        ["API_KEY", apiKey],
        ["AUTH_TOKEN", authToken],
        ["LOGIN_NAME", loginName],
        ["FIRST_TIME", JSON.stringify(firstTime)],
      ]);

      /* ======================
         3️⃣ USER INFO API
      ====================== */
      const userInfoResponse =
        await UserInfoService.fetchUserInfo();

      console.log("USER INFO RESPONSE:", userInfoResponse);

      const userStatusCode = userInfoResponse?.data?.status?.statusCode;

      console.log("Status Code:", userStatusCode);

      if (
        !userInfoResponse?.success ||
        userStatusCode !== 200
      ) {
        Alert.alert(
          "Error",
          "Failed to load user profile"
        );

        await AsyncStorage.multiRemove([
          "API_KEY",
          "AUTH_TOKEN",
        ]);

        return; // ⛔ STOP
      }

      const userPayload =
        userInfoResponse?.data?.data?.content?.[0].user;

      //console.log("User ID:", userPayload?.user?.userID);
      const userId = userPayload?.user?.userID;
      dispatch(setUserInfo(userPayload));

      if (userId) {
        await AsyncStorage.setItem("USER_ID", String(userId));
      }
      const storedUserId = await AsyncStorage.getItem("USER_ID");
console.log("Stored User ID:", storedUserId);
      // /* ======================
      //    4️⃣ SERVICES API
      // ====================== */
      // const servicesResponse =
      //   await AppServices.fetchServices();

      // if (
      //   !servicesResponse.success ||
      //   servicesResponse.data?.status?.statusCode !== 200
      // ) {
      //   Alert.alert(
      //     "Error",
      //     "Failed to load services"
      //   );
      //   await AsyncStorage.multiRemove([
      //     "API_KEY",
      //     "AUTH_TOKEN",
      //   ]);
      //   return; // ⛔ STOP
      // }

      /* ======================
         5️⃣ NAVIGATION (ONLY NOW)
      ====================== */
      navigation.replace(
        firstTime ? "WelcomeScreen" : "Dashboard"
      );

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      Alert.alert(
        "Error",
        "Something went wrong. Please try again."
      );
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
