// Today.controller.ts
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { DataProvider } from 'recyclerlistview';
import Utilities from '../../components/Utilities';
import { POSTMethod } from "../../services/api/ApiClient";

import { PieChartItem, TodayItem } from './TodayModel';
import API_ENDPOINTS from '../../services/api/endpoints';

export const useTodayController = () => {
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2)
  );
  const [pieData, setPieData] = useState<PieChartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { apiKey, accessToken, loginName } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    fetchToday();
  }, []);

  const fetchToday = async () => {
    try {
      const headers = {
        'X-Access-Token': accessToken,
        'X-Api-Key': apiKey,
      };

      const body = {
        data: JSON.stringify({
          info: {
            actionType: 'showall',
            platformType: 'android',
            outputType: 'json',
            currentDateTime: Utilities.getCurrentDateAndTimeInUTC(),
            todayBeginDateTime: Utilities.getDateAndTimeInUTC('BEGIN'),
            todayEndDateTime: Utilities.getDateAndTimeInUTC('END'),
            currentTimezone: Utilities.getCurrentTimeZone(),
          },
          data: { loginName },
        }),
      };

      const res = await POSTMethod(API_ENDPOINTS.END_POINT_GET_TODAY_HANDLER, body, headers);

      if (res?.status?.statusCode !== 200) {
        Alert.alert('Error', 'Unable to fetch today data');
        return;
      }

      const todayList: TodayItem[] = res.data?.content?.today || [];
      const stats = res.data?.content?.stats || [];

      const goals = stats.find((s: any) => s.type === 'GOAL')?.summary || [];

      const total = goals.reduce(
        (sum: number, g: any) => sum + (g.count || 0),
        0
      );

      const chart: PieChartItem[] = goals.map((g: any) => ({
        name:
          g.status === 'CURRENT'
            ? 'Current'
            : g.status === 'SKIPPED'
            ? 'Skipped'
            : 'Future',
        value: g.count || 0,
        color:
          g.status === 'CURRENT'
            ? '#ff6384'
            : g.status === 'SKIPPED'
            ? '#36a2eb'
            : '#ffce56',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      }));

      setPieData(chart);
      setDataProvider(
        new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(todayList)
      );
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    dataProvider,
    pieData,
    loading,
    error,
  };
};
