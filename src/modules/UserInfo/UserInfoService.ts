import { POSTMethod } from "../../services/api/ApiClient";
import API_ENDPOINTS from "../../services/api/endpoints";

export const UserInfoService = {
  async fetchUserInfo() {
    const body = {
      data: JSON.stringify({
        info: {
          action: "show",
          actionType: "show",
          platformType: "android",
          outputType: "json",
          type: "android",
        },
        data: {
          content: {
            profile: true,
          },
        },
      }),
    };

    console.log("📤 UserInfo Request:", body);

    const response = await POSTMethod(
      API_ENDPOINTS.END_POINT_USER_HANDLER,
      body
    );

    console.log("📥 UserInfo Response:", response);
    return response;
  },
};
