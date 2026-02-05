/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo, useState,useLayoutEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';

import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';

import { PieChart } from 'react-native-chart-kit';

import Constants from '../../Components/Constants';
import { useTodayController } from './TodayController';
import { TodayItem } from './TodayModel';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const TodayScreen = () => {

  const navigation = useNavigation();
  //console.log(navigation.getState().routeNames);
  console.log(navigation.getParent()?.getState().routeNames);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Today',
      headerStyle: {
        backgroundColor: '#498ABF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '200',
      },
      headerRight: () => (
        <TouchableOpacity
        onPress={() => navigation.getParent()?.navigate('Alerts')}
        style={{ marginRight: 15 }}
        >
          <Image
            source={require('../../assets/alerts.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  //     // 🔹 Optional cleanup when leaving tab
  //     return () => {
  //       navigation.getParent()?.setOptions({
  //         headerRight: undefined,
  //       });
  //     };
  //   }, [navigation])
  // );

  const { dataProvider, pieData, loading, error } = useTodayController();

  /* ---------------- STATE ---------------- */
  const [itemHeights, setItemHeights] = useState<Record<number, number>>({});
  // const [dataProvider, setDataProvider] = useState(
  //   new DataProvider((r1, r2) => r1 !== r2)
  // );

  // /* ---------------- BIND LIST DATA ---------------- */
  // useEffect(() => {
  //   setDataProvider(prev =>
  //     prev.cloneWithRows(Array.isArray(todayList) ? todayList : [])
  //   );
  // }, [todayList]);

  /* ---------------- LAYOUT PROVIDER ---------------- */
  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        index => index,
        (type, dim) => {
          dim.width = width;
          dim.height = itemHeights[type] ?? 110;
        }
      ),
    [itemHeights]
  );

  /* ---------------- PIE CHART DATA ---------------- */
  //  const pieData = useMemo(() => {
  //   if (!goalStats || goalStats.length === 0) return [];
  // console.log('goalStats:', goalStats);
  //   // find GOAL stats
  //   const goal = goalStats.find((s: { type: string; summary?: any[] }) => s.type === 'GOAL');
  //   if (!goal || !goal.summary) return [];
  //   console.log('found goal stats',goal);
  // console.log('goal summary:', goal.summary);
  //   const colorMap: Record<string, string> = {
  //     CURRENT: '#4CAF50',
  //     SKIPPED: '#F44336',
  //     FUTURE: '#2196F3',
  //   };

  //   return goal.summary
  //     .filter(item => Number(item.count) > 0)
  //     .map(item => ({
  //       name: item.status,            // REQUIRED
  //       population: Number(item.count),
  //       color: colorMap[item.status] || '#999',
  //       legendFontColor: '#444',
  //       legendFontSize: 12,
  //     }));
  // }, [goalStats]);

  /* ---------------- PLACEHOLDER IMAGE ---------------- */
  const getPlaceHolderImage = (type?: string) => {
    switch (type) {
      case Constants.TODO_UC:
        return require('../../assets/todo.png');
      case Constants.BOOK_UC:
        return require('../../assets/book.png');
      case Constants.EVENT_UC:
        return require('../../assets/events.png');
      case Constants.MEETING_UC:
        return require('../../assets/meeting.png');
      case Constants.WEBSITES_UC:
        return require('../../assets/website.png');
      default:
        return require('../../assets/todo.png');
    }
  };

  /* ---------------- SAFE IMAGE ---------------- */
  const SafeImage = ({ item }: { item: TodayItem }) => {
    const source = item.imageUrl?.trim()
      ? { uri: item.imageUrl.replace(/\s/g, '%20') }
      : getPlaceHolderImage(item.type);

    return <Image source={source} style={styles.icon} resizeMode="contain" />;
  };

  /* ---------------- GOAL ITEM ---------------- */
  const GoalItem = ({ item }: { item: TodayItem }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <SafeImage item={item} />
        <View style={styles.textContainer}>
          <Text style={styles.timestamp}>
            {item.beginDate && item.endDate
              ? `${item.beginDate} - ${item.endDate}`
              : 'No Date'}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </View>

      <View style={styles.goalFooter}>
        <Image
          source={require('../../assets/goal.png')}
          style={styles.goalIcon}
        />
        <Text style={styles.goalText}>
          {item.goals?.[0]?.goalName?.toUpperCase()}
        </Text>
        {item.goals?.[0]?.connectedStatus && (
          <View style={styles.statusIndicator} />
        )}
      </View>
    </View>
  );

  /* ---------------- NON GOAL ITEM ---------------- */
  const NonGoalItem = ({ item }: { item: TodayItem }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <SafeImage item={item} />
        <View style={styles.textContainer}>
          <Text style={styles.timestamp}>
            {item.beginDate && item.endDate
              ? `${item.beginDate} - ${item.endDate}`
              : 'No Date'}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  );

  /* ---------------- ROW HEIGHT ---------------- */
  const onLayout =
    (index: number) =>
      (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setItemHeights(prev => ({ ...prev, [index]: height }));
      };

  /* ---------------- ROW RENDERER ---------------- */
  const rowRenderer = (_: number, item: TodayItem, index: number) => (
    <View onLayout={onLayout(index)}>
      {item.goalID ? <GoalItem item={item} /> : <NonGoalItem item={item} />}
    </View>
  );

  /* ---------------- UI STATES ---------------- */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <View style={styles.container}>

      {pieData.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Goal Summary</Text>
          console.log('pieData 👉', pieData);

          <PieChart
            data={pieData}
            width={width - 20}
            height={150}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute 
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
           labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
            }}
          />
        </View>
      )}

      {/* -------- TODAY LIST -------- */}
      <View style={{ flex: 1 }}>
        <RecyclerListView
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
        />
      </View>

    </View>
  );
};

export default TodayScreen;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8C7',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  row: { flexDirection: 'row' },

  icon: { width: 24, height: 24, marginRight: 12, tintColor:'#ffff'},

  textContainer: { flex: 1 },

  title: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 13, color: '#666', marginTop: 4 },
  timestamp: { fontSize: 12, color: '#999' },

  goalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  goalIcon: { width: 16, height: 16, marginRight: 6 },
  goalText: { fontSize: 12, fontWeight: '600' },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    marginLeft: 6,
  },

  chartContainer: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legend: {
    flexDirection: 'row',
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#444',
  },
});
