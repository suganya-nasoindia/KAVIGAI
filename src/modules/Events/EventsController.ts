import { useEffect, useState, useCallback } from 'react';
import { Alert, Dimensions } from 'react-native';
import { DataProvider, LayoutProvider } from 'recyclerlistview';
import { useSelector } from 'react-redux';

import Utilities from '../../Components/Utilities';
import { POSTMethod } from "../../services/api/ApiClient";
import API_ENDPOINTS from '../../services/api/endpoints';

import { EventItem, FilterType } from './EventModel';

const { width } = Dimensions.get('window');

export const useEventListController = () => {
  const { apiKey, accessToken, loginName } = useSelector(
    (state: any) => state.auth
  );

  const [allData, setAllData] = useState<EventItem[]>([]);
  const [filterType, setFilterType] = useState<FilterType>('current');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [itemHeights, setItemHeights] = useState<Record<number, number>>({});

  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2)
  );

  /* ---------------- API ---------------- */

  const getEventList = async () => {
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
        API_ENDPOINTS.END_POINT_GET_EVENT_HANDLER,
        body,
        headers
      );

      if (response?.status?.statusCode !== 200) {
        Alert.alert('Error', 'Failed to load events');
        return;
      }

      const content: EventItem[] = response.data.content || [];

      const updated = content.map(item => ({
        ...item,
        dateInterval: Utils.calculateDateInterval(
          Utils.getCurrentDateAndTimeInUTC(),
          item.beginDate,
          item.endDate
        ),
      }));

      setAllData(updated);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FILTER ---------------- */

  const applyFilter = useCallback(
    (type: FilterType, data = allData) => {
      let filtered: EventItem[] = [];

      if (type === 'current') {
        filtered = data.filter(i => i.dateInterval === 0);
      } else if (type === 'skipped') {
        filtered = data.filter(i => i.dateInterval! < 0);
      } else {
        filtered = data.filter(i => i.dateInterval! > 0);
      }

      setDataProvider(
        new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(filtered)
      );
    },
    [allData]
  );

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    getEventList();
  }, []);

  useEffect(() => {
    applyFilter(filterType);
  }, [filterType, allData]);

  /* ---------------- LAYOUT ---------------- */

  const layoutProvider = new LayoutProvider(
    index => index,
    (type, dim) => {
      dim.width = width;
      dim.height = itemHeights[type] || 120;
    }
  );

  const onLayout = (index: number, height: number) => {
    setItemHeights(prev => ({ ...prev, [index]: height }));
  };

  return {
    loading,
    error,
    filterType,
    setFilterType,
    dataProvider,
    layoutProvider,
    onLayout,
  };
};
