import API_ENDPOINTS from "../../../../services/api/endpoints";
import { PATCHMethod } from "../../../../services/api/ApiClient"; // use your existing client


export const MentorInfoService = {
  async updateMentorInfo(apiKey: string, accessToken: string,payload: any) {
    try {

      const headers = {
        "X-Auth-Token": accessToken,
        Authorization: apiKey,
      };

      const body = {
        data: JSON.stringify(payload),
      };

      const response = await PATCHMethod(
        API_ENDPOINTS.END_POINT_MENTOR_HANDLER,
        body,headers
      );

      console.log("✅ Mentor update response:", response);

      return response; // 🔥 IMPORTANT: return response
    } catch (error: any) {
      console.error("❌ updateMentorInfo failed:", error);
      throw error; // 🔥 let UI handle it
    }
  },
};
