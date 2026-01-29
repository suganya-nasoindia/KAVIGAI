import { useEffect, useState, useCallback, useMemo } from 'react';
import { Alert, Dimensions } from 'react-native';
import { DataProvider, LayoutProvider } from 'recyclerlistview';
import { useSelector } from 'react-redux';

import Utilities from '../../Components/Utilities';
import { POSTMethod } from '../../services/api/ApiClient';
import API_ENDPOINTS from '../../services/api/endpoints';
import { MeetingItem, FilterType } from './MeetingModel';

const { width } = Dimensions.get('window');

const ViewTypes = {
  NORMAL: 'NORMAL',
  GOAL: 'GOAL',
};

export const useMeetingListController = () => {
  const { apiKey, accessToken, loginName } = useSelector(
    (state: any) => state.auth
  );

  const [allData, setAllData] = useState<MeetingItem[]>([]);
  const [filterType, setFilterType] = useState<FilterType>('current');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  /* ---------------- DATA PROVIDER ---------------- */
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2)
  );

  /* ---------------- API ---------------- */
  const getMeetingList = async () => {
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
            type: 'android',
            outputType: 'json',
            currentDateTime: Utilities.getCurrentDateAndTimeInUTC(),
            currentTimezone: Utilities.getCurrentTimeZone(),
          },
          data: { loginName },
        }),
      };

      const response = await POSTMethod(
        API_ENDPOINTS.END_POINT_GET_MEETINGS_HANDLER,
        body,
        headers
      );

      if (response?.data?.status?.statusCode !== 200) {
        Alert.alert('Error', 'Failed to load events');
        return;
      }

      const content: MeetingItem[] =
        response.data.data?.content ?? [];

      const updated = content.map(item => ({
        ...item,
        dateInterval: Utilities.calculateDateInterval(
          Utilities.getCurrentDateAndTimeInUTC(),
          item.beginDate,
          item.endDate
        ),
      }));

      setAllData(updated);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FILTER ---------------- */
  const applyFilter = useCallback(
    (type: FilterType) => {
      let filtered: MeetingItem[] = [];

      switch (type) {
        case 'current':
          filtered = allData.filter(i => i.dateInterval === 0);
          break;
        case 'skipped':
          filtered = allData.filter(i => i.dateInterval! < 0);
          break;
        case 'future':
          filtered = allData.filter(i => i.dateInterval! > 0);
          break;
      }

      setDataProvider(prev => prev.cloneWithRows(filtered));
    },
    [allData]
  );

  useEffect(() => {
    getMeetingList();
  }, []);

  useEffect(() => {
    applyFilter(filterType);
  }, [filterType, allData]);

  /* ---------------- HEIGHT CALC ---------------- */
  const calculateRowHeight = (item: MeetingItem) => {
    const LINE_HEIGHT = 16;
    const BASE_PADDING = 70;

    const titleLines = Math.ceil((item.name?.length ?? 0) / 25);
    const descLines = Math.ceil((item.description?.length ?? 0) / 45);

    let height =
      BASE_PADDING +
      titleLines * LINE_HEIGHT +
      descLines * LINE_HEIGHT;

    if (item.goalID || (item.goals && item.goals.length > 0)) {
      height += 35;
    }

    return Math.max(height, 120);
  };

  /* ---------------- LAYOUT PROVIDER ---------------- */
  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        index => {
          const item = dataProvider.getDataForIndex(index) as MeetingItem;

          const hasGoal =
            Boolean(item.goalID) ||
            (Array.isArray(item.goals) && item.goals.length > 0);

          return hasGoal ? ViewTypes.GOAL : ViewTypes.NORMAL;
        },
        (_type, dim, index) => {
          const item = dataProvider.getDataForIndex(index) as MeetingItem;
          dim.width = width;
          dim.height = calculateRowHeight(item);
        }
      ),
    [dataProvider]
  );

  return {
    loading,
    error,
    filterType,
    setFilterType,
    dataProvider,
    layoutProvider,
  };
};
