import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { Alert, Dimensions } from 'react-native';
import { DataProvider, LayoutProvider } from 'recyclerlistview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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

  /* 🔹 Load auth ONCE */
  useEffect(() => {
    const loadAuth = async () => {
      const name = await AsyncStorage.getItem('LOGIN_NAME');
      const key = await AsyncStorage.getItem('API_KEY');

      setLoginName(name?.trim() || '');
      setApiKey(key?.trim() || '');
    };

    loadAuth();
  }, []);

  /* 🔹 Fetch alerts when screen is focused */
  useFocusEffect(
    useCallback(() => {
      if (!loginName || !apiKey) {
        return () => {};
      }

      let isActive = true;

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
              currentDateTime:
                Utilities.getCurrentDateAndTimeInUTC(),
              currentTimezone:
                Utilities.getCurrentTimeZone(),
            },
            data: {
              content: { apiKey, loginName },
            },
          };

          const response = await POSTMethod<AlertApiResponse>(
            API_ENDPOINTS.END_POINT_ALERT_HANDLER,
            payload
          );

          if (
            isActive &&
            response.success &&
            response.data?.status?.statusCode === 200
          ) {
            const alerts =
              response.data?.data?.content ?? [];

            setDataProvider(prev =>
              prev.cloneWithRows(alerts)
            );
          } else if (isActive) {
            Alert.alert(
              'Error',
              response.error || 'Unable to fetch alerts'
            );
          }
        } catch (err: any) {
          if (isActive) {
            setError(err);
            Alert.alert(
              'Error',
              err.message || 'Something went wrong'
            );
          }
        } finally {
          isActive && setLoading(false);
        }
      };

      fetchAlerts();

      /* cleanup on blur */
      return () => {
        isActive = false;
      };
    }, [loginName, apiKey])
  );

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

    const response = await POSTMethod<AlertApiResponse>(
      API_ENDPOINTS.END_POINT_ALERT_HANDLER,
      requestPayload
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

function fetchAlerts() {
  throw new Error('Function not implemented.');
}
