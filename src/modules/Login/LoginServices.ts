import { LoginResponse } from "./LoginTypes";
import ApiEndpoints from "../../services/api/endpoints";
import { POSTMethod } from "../../services/api/ApiClient";

export const LoginService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const body = {
      info: {
        type: "android",
        outputType: "json",
        platformType: "android",
      },
      content: {
        loginName: username,
        password: password,
        gpsCoordinate: "",
        ipaddress: "",
      },
    };

    console.log("Sending Login Request Body:", body);

    const response = await POSTMethod<LoginResponse>(ApiEndpoints.LOGIN, {
      data: JSON.stringify(body),
    });

    if (!response.data) {
      throw new Error("Login response data is undefined");
    }

    return response.data;
  },
};
