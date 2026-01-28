// Today.controller.ts
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { DataProvider } from 'recyclerlistview';
import Utilities from '../../Components/Utilities';
import { POSTMethod } from "../../services/api/ApiClient";
import API_ENDPOINTS from '../../services/api/endpoints';

import { PieChartItem, TodayItem, TodayApiData } from './TodayModel';

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
      // const headers = {
      //   'X-Access-Token': accessToken,
      //   'X-Api-Key': apiKey,
      // };

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

      const res = await POSTMethod<TodayApiData>(
        API_ENDPOINTS.END_POINT_GET_TODAY_HANDLER,
        body
      );

      console.log('Fetch Today Response:', res);

      if (res.data?.status?.statusCode !== 200) {
        Alert.alert('Error', 'Unable to fetch today data');
        return;
      }

      const content = res.data.data.content;

      // Today list
      const todayList = content.today ?? [];
      console.log('today', todayList);      // Stats
      const stats = content.stats ?? [];
      console.log('stats', stats);
      const goalSummary =
      stats.find(s => s.type === 'GOAL')?.summary ?? [];
    
    // Convert counts safely
    const safeSummary = goalSummary.map(g => ({
      ...g,
      count: Number(g.count) || 0,
    }));
    
    const totalCount = safeSummary.reduce(
      (sum, g) => sum + g.count,
      0
    );
    
    // 🛑 HARD STOP if invalid
    if (totalCount === 0) {
      setPieData([]);
      setLoading(false);
      return;
    }
    
    const pieChartData: PieChartItem[] = safeSummary.map(g => {
      const percentage = (g.count / totalCount) * 100;
    
      return {
        name:
          g.status === 'CURRENT'
            ? 'Current'
            : g.status === 'SKIPPED'
              ? 'Skipped'
              : 'Pending',
    
        population: Number(percentage.toFixed(1)), // ✅ MUST be population
    
        color:
          g.status === 'CURRENT'
            ? '#ff6384'
            : g.status === 'SKIPPED'
              ? '#36a2eb'
              : '#ffce56',
    
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      };
    });
    
    setPieData(pieChartData);
    
      console.log('Pie Data:', pieChartData);
      setDataProvider(
        new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(todayList)
      );
    } catch (err) {
      console.error('Fetch Today Error:', err);
      setError('Failed to load today data.');
    } finally {
      setLoading(false);
    };
  }
  return {
    dataProvider,
    pieData,
    loading,
    error,
  };
};
