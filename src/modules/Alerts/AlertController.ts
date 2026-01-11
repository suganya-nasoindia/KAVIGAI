import { useEffect, useMemo, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import { DataProvider, LayoutProvider } from 'recyclerlistview';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Utilities from '../../Components/Utilities';
import { POSTMethod } from '../../services/api/ApiClient';
import API_ENDPOINTS from '../../services/api/endpoints';
import type { AlertItem, AlertApiResponse } from './AlertModel';

const { width } = Dimensions.get('window');

export const useAlertController = () => {
  const [loginName, setLoginName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [dataProvider, setDataProvider] = useState(
    new DataProvider<AlertItem>((r1, r2) => r1 !== r2)
  );

  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        () => 0,
        (_, dim) => {
          dim.width = width;
          dim.height = 95;
        }
      ),
    []
  );

  /* Load auth */
  useEffect(() => {
    const loadAuth = async () => {
      const name = await AsyncStorage.getItem('LOGIN_NAME');
      const key = await AsyncStorage.getItem('API_KEY');

      setLoginName(name?.trim() || '');
      setApiKey(key?.trim() || '');
    };

    loadAuth();
  }, []);

  /* Fetch alerts */
  useEffect(() => {
    if (!loginName || !apiKey) return;

    const fetchAlerts = async () => {
      try {
        setLoading(true);
        setError(null);

        const payload = {
          info: {
            actionType: 'showall',
            platformType: 'android',
            type: 'android',
            outputType: 'json',
            currentDateTime: Utilities.getCurrentDateAndTimeInUTC(),
            currentTimezone: Utilities.getCurrentTimeZone(),
          },
          data: {
            content: { apiKey, loginName, }
          },
        };

        const response = await POSTMethod<AlertApiResponse>(
          API_ENDPOINTS.END_POINT_ALERT_HANDLER,
          { data: JSON.stringify(payload) }
        );

        if (response.success && response.data?.status?.statusCode === 200) {
          setDataProvider(prev =>
            prev.cloneWithRows(response.data.data?.content ?? [])
          );
        } else {
          Alert.alert('Error', response.error || 'Unable to fetch alerts');
        }
      } catch (err: any) {
        setError(err);
        Alert.alert('Error', err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [loginName, apiKey]);

  return {
    dataProvider,
    layoutProvider,
    loading,
    error,
  };
};


export const getAlertById = async (alertID: number) => {
  try {
    const apiKey = await AsyncStorage.getItem('API_KEY');
    const loginName = await AsyncStorage.getItem('LOGIN_NAME');

    const requestPayload = {
      info: {
        type: 'mobile',
        actionType: 'show',
        platformType: 'mobile',
        outputType: 'json',
      },
      data: {
        content: {
          apiKey: apiKey ?? '',
          alertNotificationID: alertID,
          loginName: loginName ?? '',
        },
      },
    };

    const response = await POSTMethod(
      API_ENDPOINTS.END_POINT_ALERT_HANDLER,
      {
        data: JSON.stringify(requestPayload),
      }
    );

    if (response.success && response.data?.status?.statusCode === 200) {
      // 🔹 Return alert details object
      return response.data.data?.content ?? null;
    }

    throw new Error(response.error || 'Failed to fetch alert details');
  } catch (error) {
    console.error('getAlertById error:', error);
    throw error;
  }
};

export const deleteAlertById = async (alertID: number) => {
  try {
    const apiKey = await AsyncStorage.getItem('API_KEY');
    const loginName = await AsyncStorage.getItem('LOGIN_NAME');

    const requestPayload = {
      info: {
        type: 'mobile',
        actionType: 'delete',
        platformType: 'mobile',
        outputType: 'json',
      },
      data: {
        content: {
          apiKey: apiKey ?? '',
          alertNotificationID: alertID,
          loginName: loginName ?? '',
        },
      },
    };

    const response = await POSTMethod(
      API_ENDPOINTS.END_POINT_ALERT_HANDLER,
      {
        data: JSON.stringify(requestPayload),
      }
    );

    if (response.success && response.data?.status?.statusCode === 200) {
      // 🔹 Return alert details object
      return response.data.data?.content ?? null;
    }

    throw new Error(response.error || 'Failed to fetch alert details');
  } catch (error) {
    console.error('getAlertById error:', error);
    throw error;
  }
};