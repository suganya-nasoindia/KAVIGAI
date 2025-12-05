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

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    // Handle invalid / no JSON or empty response
    const text = await response.text();
    const json = text ? JSON.parse(text) : {};

    if (!response.ok) {
      return {
        success: false,
        error: json?.message || json?.error || "Request failed",
      };
    }

    return {
      success: true,
      data: json as T,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Network error",
    };
  }
};
