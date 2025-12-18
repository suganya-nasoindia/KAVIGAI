// src/services/api/ApiClient.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  data?: T ;
  error?: string;
}

export interface HeadersType {
  [key: string]: string;
}

const BASE_URL = "https://api.kavigai.com/api/v1/index.php/";

/** ------------------------------------
 *  GET TOKEN & APIKEY FROM STORAGE
-------------------------------------*/
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("AUTH_TOKEN");
  const apiKey = await AsyncStorage.getItem("API_KEY");

  return {
    Authorization: apiKey ? `Bearer ${token}` : "",
    "X-Auth-Token": token ?? "",
  };
};

/** ------------------------------------
 *  POST METHOD
-------------------------------------*/
export const POSTMethod = async <T>(
  endpoint: string,
  body: any,
  customHeaders: HeadersType = {}
): Promise<ApiResponse<T>> => {
  try {
    const authHeaders = await getAuthHeaders();

    const headers: HeadersType = {
      "Content-Type": "application/json",
      ...authHeaders,
      ...customHeaders,
    };

    const url = `${BASE_URL}${endpoint}`;

    console.log("====== POST REQUEST ======");
    console.log("URL:", url);
    console.log("Headers:", headers);
    console.log("Body:", body);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const text = await response.text();
    console.log("====== RAW RESPONSE TEXT ======");
    console.log(text);

    const json = text ? JSON.parse(text) : {};

    console.log("====== PARSED RESPONSE JSON ======");
    console.log(json);

    // ❌ HTTP ERROR
    if (!response.ok) {
      return {
        success: false,
        statusCode: response.status,
        error: json?.message || json?.error || "Request failed",
      };
    }

    // ✅ HTTP SUCCESS
    return {
      success: true,
      statusCode: response.status,
      data: json as T,
    };
  } catch (error: any) {
    return {
      success: false,
      statusCode: 0,
      error: error.message || "Network error",
    };
  }
};


