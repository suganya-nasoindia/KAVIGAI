import { useState } from "react";
import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginService } from "./LoginServices";
import { LoginResponse } from "./LoginTypes";
import { UserInfoService } from "../UserInfo/UserInfoService";
import {
  setProfile,
  setMentorInfo,
  setServices,
  setMyMentors,
  setMyMentees,
  setCurrentGoals,
} from "../../redux/slices/userProfileSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/reactstore";
import { setUserInfo } from "../../redux/actions";
import { loginSuccess } from '../../redux/slices/authslice';


export const useLoginController = (navigation: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    setLoading(true);
    dispatch(loginSuccess());   // 🔥 THIS IS THE SWITCH

    try {
      /* ======================
         1️⃣ LOGIN APIs
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
        userInfoResponse?.data?.data?.content?.[0]?.user;

      if (!userPayload) {
        Alert.alert("Error", "Invalid user profile response");
        return;
      }

      const {
        user,
        mentor,
        services,
        myMentors,
        myMentees,
        currentGoals,
      } = userPayload;

      /* ======================
         5️⃣ STORE USER ID
      ====================== */

      const userId = user?.userID;
      if (userId) {
        await AsyncStorage.setItem("USER_ID", String(userId));
      }

      /* ======================
         6️⃣ DISPATCH REDUX
      ====================== */

      // 🔹 BASIC PROFILE ONLY
      dispatch(setUserInfo(userPayload));

      // 🔹 MENTOR INFO (SEPARATE)
      if (mentor) {
        const mentorID =userPayload.mentor?.mentorID;
        console.log("Storing MENTOR_ID:", mentorID);
        if(mentorID){
          await AsyncStorage.setItem("MENTOR_ID", String(mentorID));
        } 
        dispatch(setMentorInfo(userPayload.mentor));
      }

      // 🔹 SERVICES
      dispatch(setServices(userPayload.services.map((service: any) => ({
        serviceID: service.serviceID,
        serviceName: service.serviceName,
        serviceType:service.serviceType,
        description: service.description,
        isActive: Boolean(service.status), // 🔥 THIS LINE
      }))
    ));

      // 🔹 MY MENTORS
      dispatch(setMyMentors(userPayload.myMentors ?? []));

      // 🔹 MY MENTEES
      dispatch(setMyMentees(userPayload.myMentees ?? []));

      // 🔹 GOALS
      dispatch(setCurrentGoals(userPayload.currentGoals ?? []));

      console.log("🧠 mentorInfo:", userPayload.mentor);
      console.log("🛠 services:", services);
      console.log("👥 myMentors:", userPayload.myMentors);
      console.log("👥 myMentees:", userPayload.myMentees);
      console.log("🎯 goals:", userPayload.currentGoals);


      //       //console.log("User ID:", userPayload?.user?.userID);
      //       const userIdn               n  = userPayload?.user?.userID;
      //       dispatch(setUserInfo(userPayload));
      //       if (userId) {
      //         await AsyncStorage.setItem("USER_ID", String(userId));
      //       }
      //       const storedUserId =c;
      // console.log("Stored User ID:", storedUserId);
      //       // /* ======================
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
        firstTime ? "WelcomeScreen" : "HomeScreen"
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
