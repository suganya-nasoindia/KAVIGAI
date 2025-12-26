import { PATCHMethod, POSTMethod } from "../../services/api/ApiClient";
import API_ENDPOINTS from "../../services/api/endpoints";
import { UserInfoApiResponse } from "./UserInfoTypes";

export const UserInfoService = {
  /* ---------------- FETCH USER INFO ---------------- */
  async fetchUserInfo(): Promise<UserInfoApiResponse> {
    try {
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
    } catch (err) {
      console.log("❌ UserInfo Error:", err);
      throw err;
    }
  },

  /* ---------------- UPDATE USER INFO ---------------- */
  async updateUser(payload: any) {
    try {
      const body = {
        data: JSON.stringify(payload), // 🔥 IMPORTANT
      };

      console.log("🚀 updateUser called with:", payload);
      console.log("📡 Update User Request:", body);

      const response = await PATCHMethod(
        API_ENDPOINTS.END_POINT_USER_HANDLER,
        body
      );

      console.log("✅ Update User Response:", response);
      return response;
    } catch (err) {
      console.error("❌ updateUser failed:", err);
      throw err;
    }
  },
};
