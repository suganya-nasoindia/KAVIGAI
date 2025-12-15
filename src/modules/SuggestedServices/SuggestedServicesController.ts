import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataProvider } from "recyclerlistview";
import { SuggestedServicesService } from "./SuggestedService";
import { SuggestedServiceItem } from "./SuggestedServicesTypes";

export const useSuggestedServicesController = () => {
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2)
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reduxAuth = useSelector((state: any) => state.auth);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);

      const [storedApiKey, storedAuthToken, storedLoginName] =
        await AsyncStorage.multiGet([
          "API_KEY",
          "AUTH_TOKEN",
          "LOGIN_NAME",
        ]).then(values => values.map(v => v[1]));

      const apiKey = storedApiKey || reduxAuth?.apiKey;
      const authToken = storedAuthToken || reduxAuth?.accessToken;
      const loginName = storedLoginName || reduxAuth?.loginName;

      if (!apiKey || !authToken || !loginName) {
        throw new Error("Missing authentication credentials");
      }

      const response = await SuggestedServicesService.fetchServices(apiKey, authToken, loginName);

      if (
        response.success &&
        response.data?.status?.statusCode === 200
      ) {
        const content = response.data.data
          .content as SuggestedServiceItem[];

        setDataProvider(prev => prev.cloneWithRows(content));
      } else {
        Alert.alert(
          "Error",
          response.data?.status?.message ||
            response.error ||
            "Unable to fetch services"
        );
      }
    } catch (err: any) {
      console.log("❌ SuggestedServices Controller Error:", err);
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
