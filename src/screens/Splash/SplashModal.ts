import ApiClient from "../../services/api/ApiClient";
import API_ENDPOINTS  from "../../services/api/endpoints";

export interface VersionInfo {
  versionCode: number | null;
  versionString: string | null;
}

export const fetchVersionInfo = async (): Promise<VersionInfo> => {
  const formData = new FormData();
  formData.append("data", JSON.stringify({
    info: {
      actionType: "showall",
      platformType: "android",
      action: "showall",
      outputType: "json",
      role: "",
      type: "",
      currentDateTime: new Date().toISOString(),
      currentTimezone: "IST",
    },
    data: {
      content: {
        platformType: "mobile",
        platformName: "Android",
        versionCode: 192,
        versionString: "1.0.192",
      },
    },
  }));

  const response = await ApiClient.post(API_ENDPOINTS.VERSION_CHECK, formData);

  if (!response.success || !response.data) {
    return { versionCode: null, versionString: null };
  }

  const contentArray = response.data?.data?.content ?? [];
 
  return {
    versionCode: contentArray[0]?.versionCode ?? null,
    versionString: contentArray[0]?.versionString ?? null,
  };
};
