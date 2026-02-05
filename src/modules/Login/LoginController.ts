import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/reactstore";

import { LoginService } from "./LoginServices";
import { UserInfoService } from "../UserInfo/UserInfoService";

import { loginSuccess } from "../../redux/slices/authslice";
import {
  setProfile,
  setMentorInfo,
  setServices,
  setMyMentors,
  setMyMentees,
  setCurrentGoals,
} from "../../redux/slices/userProfileSlice";

export const useLoginController = (navigation: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    setLoading(true);

    try {
      /* ======================
         1️⃣ LOGIN
      ====================== */
      const response = await LoginService.login(username, password);
      const statusCode = response?.status?.statusCode;

      if (statusCode !== 200) {
        Alert.alert(
          "Login Failed",
          response?.data?.content?.message || "Invalid credentials"
        );
        return;
      }

      const { apiKey, authToken, firstTime, loginName } =
        response.data.content;

      /* ======================
         2️⃣ AUTH → REDUX
      ====================== */
      dispatch(
        loginSuccess({
          apiKey,
          accessToken: authToken,
          loginName,
        })
      );

      await AsyncStorage.setItem(
        "AUTH_DATA",
        JSON.stringify({
          apiKey,
          accessToken: authToken,
          loginName,
          firstTime,
        })
      );
      console.log("LOGIN SUCCESSFUL", AsyncStorage.getItem("AUTH_DATA"));
      /* ======================
         3️⃣ USER INFO
      ====================== */
      const userInfoResponse = await UserInfoService.fetchUserInfo();
      const userStatusCode =
        userInfoResponse?.data?.status?.statusCode;

      if (userStatusCode !== 200) {
        Alert.alert("Error", "Failed to load profile");
        return;
      }

      const payload =
        userInfoResponse.data.data.content[0].user;

      const {
        user,
        mentor,
        services,
        myMentors,
        myMentees,
        currentGoals,
      } = payload;

      /* ======================
         4️⃣ USER → REDUX
      ====================== */
      dispatch(setProfile(user));
      if (mentor) dispatch(setMentorInfo(mentor));

      dispatch(
        setServices(
          services.map((s: any) => ({
            serviceID: s.serviceID,
            serviceName: s.serviceName,
            serviceType: s.serviceType,
            description: s.description,
            isActive: Boolean(s.status),
          }))
        )
      );

      dispatch(setMyMentors(myMentors ?? []));
      dispatch(setMyMentees(myMentees ?? []));
      dispatch(setCurrentGoals(currentGoals ?? []));

      await AsyncStorage.setItem(
        "USER_PROFILE",
        JSON.stringify(payload)
      );

      console.log("USER INFO FETCH SUCCESSFUL", AsyncStorage.getItem("USER_PROFILE"));

      /* ======================
         5️⃣ NAVIGATION
      ====================== */
      console.log("FirstTime",firstTime);
      
      navigation.replace(
        firstTime ? "WelcomeScreen" : "HomeScreen"
      );
    } catch (e) {
      console.log("LOGIN ERROR:", e);
      Alert.alert("Error", "Something went wrong");
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
