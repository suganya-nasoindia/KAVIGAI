import { useEffect, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { DataProvider, LayoutProvider } from 'recyclerlistview';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Utilities from '../../Components/Utilities';
import { POSTMethod } from '../../services/api/ApiClient';
import API_ENDPOINTS from '../../services/api/endpoints';
import type { AlertItem, AlertApiResponse } from './AlertModel';

const { width } = Dimensions.get('window');

export const useAlertController = () => {
  const reduxAuth = useSelector((state: any) => state.auth);

  const [apiKey, setApiKey] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loginName, setLoginName] = useState<string | null>(null);

  const [dataProvider, setDataProvider] = useState(
    new DataProvider<AlertItem>((r1, r2) => r1 !== r2)
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const layoutProvider = new LayoutProvider(
    () => 0,
    (_, dim) => {
      dim.width = width;
      dim.height = 95;
    }
  );

  /* =========================
     LOAD AUTH DATA
  ========================= */
  useEffect(() => {
    const loadAuthData = async () => {
      const values = await AsyncStorage.multiGet([
        'AUTH_TOKEN',
      ]);

     
      setAccessToken(values[1][1] || reduxAuth?.accessToken || null);
      setLoginName(values[2][1] || reduxAuth?.loginName || null);
    };

    loadAuthData();
  }, [reduxAuth]);

  /* =========================
     FETCH ALERTS
  ========================= */
  useEffect(() => {
    if (!apiKey || !accessToken || !loginName) return;

    const fetchAlerts = async () => {
      try {
        // const headers = {
        //   'X-Auth-Token': accessToken.trim(),
        //   Authorization: apiKey.trim(),
        // };

        const requestPayload = {
          info: {
            actionType: 'showall',
            platformType: 'android',
            type: 'android',
            outputType: 'json',
            currentDateTime: Utilities.getCurrentDateAndTimeInUTC(),
            currentTimezone: Utilities.getCurrentTimeZone(),
          },
          data: {
            loginName: loginName.trim(), // ✅ SPACE REMOVED
          },
        };

        const response: AlertApiResponse = await POSTMethod(
          API_ENDPOINTS.END_POINT_ALERT_HANDLER,
          { data: JSON.stringify(requestPayload) },
        );

        if (response?.status?.statusCode === 200) {
          setDataProvider(
            new DataProvider<AlertItem>((r1, r2) => r1 !== r2).cloneWithRows(
              response?.data?.content ?? []
            )
          );
        } else {
          Alert.alert('Error', 'Unable to fetch alerts.');
        }
      } catch (err: any) {
        setError(err);
        Alert.alert('Error', err?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [apiKey, accessToken, loginName]);

  return {
    dataProvider,
    layoutProvider,
    loading,
    error,
  };
};
