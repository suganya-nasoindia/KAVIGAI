import AsyncStorage from '@react-native-async-storage/async-storage';
import { POSTMethod } from '../../services/api/ApiClient';
import ApiEndpoints from '../../services/api/endpoints';

export const LoginModel = {

  /** Validate Username + Password */
  validateFields(username: string, password: string) {
    return username.trim() !== "" && password.trim() !== "";
  },

  /** Prepare login request body */
  getLoginRequest(username: string, password: string) {
    return {
      data: JSON.stringify({
        info: {
          type: "android",
          outputType: "json",
          platformType: "android",
        },
        content: {
          loginName: username.toLowerCase(),
          password: password.toLowerCase(),
          gpsCoordinate: "",
          ipaddress: "",
        },
      }),
    };
  },

  /** Call LOGIN API using your ApiClient.ts POSTMethod */
  async login(requestBody: any) {
    return await POSTMethod(ApiEndpoints.LOGIN, requestBody);
  },

  /** Save First-Time Access flag */
  async saveFirstTimeAccess(content: any) {
    await AsyncStorage.setItem("firstTimeAccess", JSON.stringify(content.firstTime));
  },

  /** Save All User Related Data */
  async saveUserBundle(data: any) {
    const content = data?.data?.content?.[0];

    await AsyncStorage.setItem('@user_profile', JSON.stringify(content.user));
    await AsyncStorage.setItem('@user_mentors', JSON.stringify(content.myMentors || []));
    await AsyncStorage.setItem('@user_mentees', JSON.stringify(content.myMentees || []));
    await AsyncStorage.setItem('@user_goals', JSON.stringify(content.currentGoals || []));
  },

  /** Call PROFILE API using user accessToken + apiKey */
  async getUserProfile(accessToken: string, apiKey: string) {
    const headers = {
      "X-Access-Token": accessToken,
      "X-Api-Key": apiKey,
    };

    const body = {
      data: JSON.stringify({
        info: {
          type: "web",
          actionType: "show",
          platformType: "web",
          outputType: "json",
        },
        data: { content: { profile: true } },
      }),
    };

    return await POSTMethod("userhandler", body, headers);
  },

  /** Get First Time Flag */
  async getFirstTime() {
    const val = await AsyncStorage.getItem("firstTimeAccess");
    return val ? JSON.parse(val) : false;
  }
};
