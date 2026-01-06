// src/modules/suggestedServices/SuggestedServicesService.ts

import { POSTMethod } from "../../services/api/ApiClient";
import API_ENDPOINTS  from "../../services/api/endpoints";
import { SuggestedServiceResponse } from "./SuggestedServicesTypes";
import Utilities from "../../Components/Utilities";


const sanitizeObject = (obj: any): any => {
  if (typeof obj === 'string') {
    return obj.trim();
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = sanitizeObject(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};

export const SuggestedServicesService = {
  async fetchServices(apiKey: string, accessToken: string, loginName: string) {
    try {
      // const headers = {
      //   Authorization: `Bearer ${accessToken.trim()}`,
      // };

      const requestBody = {
          info:{
            actionType: "showall",
            platformType: "android",
            type: "android",
            outputType: "json",
            currentDateTime: Utilities.getCurrentDateAndTimeInUTC(),
            suggestedserviceBeginDateTime: Utilities.getCurrentDateOnlyAndTimeInUTC(),
            suggestedserviceEndDateTime: Utilities.getCurrentDateAndTimeInUTC(),
            currentTimezone: Utilities.getCurrentTimeZone(),
          },
          data:{
            content:{
              apiKey,
              loginName,
            },
        },
      };
      const servicesRequestBody = {
        data:JSON.stringify(sanitizeObject(requestBody))      };
      console.log("ApiClient is :", POSTMethod);

      console.log("📤 Fetching Suggested Services:", servicesRequestBody);

      const response = await POSTMethod<SuggestedServiceResponse>(
        API_ENDPOINTS.END_POINT_SUGGESTED_SERVICES_HANDLER,
        servicesRequestBody,
      );

      console.log("📥 Suggested Services Response:", response);

      return response;
    } catch (err) {
      console.log("❌ Suggested Services Error:", err);
      throw err;
    }
  },
};
