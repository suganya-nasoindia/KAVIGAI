// src/services/api/ApiClient.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
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
  const token = await AsyncStorage.getItem("authToken");
  const apiKey = await AsyncStorage.getItem("apiKey");

  return {
    Authorization: token ? `Bearer ${token}` : "",
    "x-api-key": apiKey ?? "",
  };
};

/** ------------------------------------
 *  POST METHOD
-------------------------------------*/
export const POSTMethod = async <T>(
  endpoint: string,
  body: unknown,
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

    // 🔵 Log Outgoing Request
    console.log("====== POST REQUEST ======");
    console.log("URL:", url);
    console.log("Headers:", headers);
    console.log("Body:", body);


    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    // Handle invalid / no JSON or empty response
    const text = await response.text();

    // 🔵 Log Raw Response
    console.log("====== RAW RESPONSE TEXT ======");
    console.log(text);

    const json = text ? JSON.parse(text) : {};

    // 🔵 Log Parsed JSON
    console.log("====== PARSED RESPONSE JSON ======");
    console.log(json);

    if (!response.ok) {
      const errorResponse = {
        success: false,
        error: json?.message || json?.error || "Request failed",
      };

      console.log("====== FINAL ERROR RESPONSE ======");
      console.log(errorResponse);

      return errorResponse;
    }
    const successResponse = {
      success: true,
      data: json,
    };

    console.log("====== FINAL SUCCESS RESPONSE ======");
    console.log(successResponse);

    return successResponse;
  } catch (error: any) {
    console.log("====== FETCH ERROR ======");
    console.log(error);

    return {
      success: false,
      error: error.message || "Network error",
    };
  }
};
