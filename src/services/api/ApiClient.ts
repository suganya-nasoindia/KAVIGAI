// src/services/api/ApiClient.ts

const BASE_URL = "https://api.kavigai.com:443/api/v1/index.php";

// Timeout wrapper
const timeout = (ms: number) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), ms)
  );

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiClient {
  // ===============================
  // 🔥 POST Request Handler
  // ===============================
  async post<T>(
    endpoint: string,
    body: FormData | object,
    timeoutMs: number = 15000
  ): Promise<ApiResponse<T>> {
    const url = `${BASE_URL}/${endpoint}`;

    console.log("🟦 API CALL START (POST)");
    console.log("➡️ URL:", url);
    console.log("➡️ BODY:", body instanceof FormData ? "[FormData]" : body);
    console.log("----------------------------------");

    const options: RequestInit = {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers:
        body instanceof FormData
          ? undefined
          : { "Content-Type": "application/json" },
    };

    try {
      const response: any = await Promise.race([
        fetch(url, options),
        timeout(timeoutMs),
      ]);

      console.log("⬅️ RAW RESPONSE:", response);

      const json = await response.json();
      console.log("📥 PARSED RESPONSE:", json);

      console.log("🟩 API SUCCESS (POST)");
      console.log("==================================");

      return { success: json?.status?.statusCode === 200,
        data: json,
        error: json?.status?.message };
    } catch (error: any) {
      console.log("🟥 API ERROR (POST)");
      console.log("❌ MESSAGE:", error.message);
      console.log("==================================");

      return { success: false, error: error.message };
    }
  }

  // ===============================
  // 🔥 GET Request Handler
  // ===============================
  async get<T>(
    endpoint: string,
    timeoutMs: number = 15000
  ): Promise<ApiResponse<T>> {
    const url = `${BASE_URL}/${endpoint}`;

    console.log("🟦 API CALL START (GET)");
    console.log("➡️ URL:", url);
    console.log("----------------------------------");

    try {
      const response: any = await Promise.race([fetch(url), timeout(timeoutMs)]);

      console.log("⬅️ RAW RESPONSE:", response);

      const json = await response.json();
      console.log("📥 PARSED RESPONSE:", json);

      console.log("🟩 API SUCCESS (GET)");
      console.log("==================================");

      return { success: true, data: json };
    } catch (error: any) {
      console.log("🟥 API ERROR (GET)");
      console.log("❌ MESSAGE:", error.message);
      console.log("==================================");

      return { success: false, error: error.message };
    }
  }
}

export default new ApiClient();
