// src/modules/suggestedServices/SuggestedServicesService.ts

import { POSTMethod } from "../../services/api/ApiClient";
import API_ENDPOINTS  from "../../services/api/endpoints";
import { SuggestedServiceResponse } from "./SuggestedServicesTypes";
import Utilities from "../../Components/Utilities";

export const SuggestedServicesService = {
  async fetchServices(apiKey: string, accessToken: string, loginName: string) {
    try {
      const headers = {
        "X-Auth-Token": accessToken,
        Authorization: apiKey,
      };

      const requestBody = {
        data: JSON.stringify({
          info: {
            actionType: "showall",
            platformType: "android",
            type: "android",
            outputType: "json",
            currentDateTime: Utilities.getCurrentDateAndTimeInUTC(),
            suggestedserviceBeginDateTime: Utilities.getCurrentDateOnlyAndTimeInUTC(),
            suggestedserviceEndDateTime: Utilities.getCurrentDateAndTimeInUTC(),
            currentTimezone: Utilities.getCurrentTimeZone(),
          },
          data: {
            content: {
              apiKey,
              loginName,
            },
          },
        }),
      };
      console.log("ApiClient is :", POSTMethod);

      console.log("📤 Fetching Suggested Services:", requestBody);

      const response = await POSTMethod<SuggestedServiceResponse>(
        API_ENDPOINTS.END_POINT_SUGGESTED_SERVICES_HANDLER,
        requestBody,
        headers
      );

      console.log("📥 Suggested Services Response:", response);

      return response;
    } catch (err) {
      console.log("❌ Suggested Services Error:", err);
      throw err;
    }
  },
};
