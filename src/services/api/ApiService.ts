import NetInfo from '@react-native-community/netinfo';

export interface HeadersType {
  [key: string]: string;
}

export const POSTMethod = async <T>(
  url: string,
  requestBody: unknown,
  customHeaders: HeadersType = {}
): Promise<T> => {

  console.log("POST →", url, requestBody, customHeaders);

  try {
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      throw new Error("No internet connection");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...customHeaders,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg || `HTTP ${response.status}`);
    }

    return (await response.json()) as T;

  } catch (err: any) {
    console.log("POST ERROR →", err);
    throw new Error(err.message || "POST request failed");
  }
};


export const PUTMethod = async <T>(
  url: string,
  requestBody: unknown,
  customHeaders: HeadersType = {}
): Promise<T> => {
    
  console.log("PUT →", url, requestBody, customHeaders);

  try {
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      throw new Error("No internet connection");
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...customHeaders,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg || `HTTP ${response.status}`);
    }

    return (await response.json()) as T;

  } catch (err: any) {
    console.log("PUT ERROR →", err);
    throw new Error(err.message || "PUT request failed");
  }
};
