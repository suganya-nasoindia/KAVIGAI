// src/modules/suggestedServices/SuggestedServicesController.ts

import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { DataProvider } from "recyclerlistview";
import { SuggestedServicesService } from "./SuggestedService";

export const useSuggestedServicesController = () => {
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2)
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { apiKey, accessToken, loginName } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);

      const response = await SuggestedServicesService.fetchServices(
        apiKey,
        accessToken,
        loginName
      );

      if (response?.status?.statusCode === 200) {
        const content = response?.data?.content;

        if (Array.isArray(content)) {
          setDataProvider((prev) => prev.cloneWithRows(content));
        } else {
          Alert.alert("Error", "Unexpected data format");
        }
      } else {
        const msg =
          response?.data?.content?.message ||
          "Unable to fetch services. Please try again.";
        Alert.alert("Error", msg);
      }
    } catch (err: any) {
      console.log("❌ Controller Error:", err);
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    dataProvider,
    loading,
    error,
  };
};
