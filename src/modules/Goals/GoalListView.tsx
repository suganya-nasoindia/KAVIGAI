/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState, useMemo,useLayoutEffect } from 'react';
import {
  View,
  Text, TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';


import { useGoalController, FilterType } from './GoalController';
import { Goals } from './GoalModel';
import ButtonComponent from '../../Components/ButtonComponent';

const { width } = Dimensions.get('window');


const GoalListScreen = () => {

  const navigation = useNavigation<any>();
  
  navigation.setOptions({
    headerShown: true,
    title: 'Goals',
    headerStyle: {
      backgroundColor: '#498ABF',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '200',
    },
  });

  // const { todos, loading, error, filter, reload } = useTodoController();
  const { goals, loading, error, filter, reload, setFilter } = useGoalController();
  const ViewTypes = {
    NORMAL: 'NORMAL',
    GOAL: 'GOAL',
  };


  console.log('Active filter:', filter);
  console.log('Goals received:', goals.length);
  console.log('todos length:', goals.length);
  console.log('all todos:', goals);

  /* ---------------- DATA PROVIDER ---------------- */
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2)
  );


  const counts = useMemo(() => {
    return {
      current: goals.filter(t => t.dateInterval === 0).length,
      skipped: goals.filter(t => t.dateInterval < 0).length,
      future: goals.filter(t => t.dateInterval > 0).length,
    };
  }, [goals]);

  useEffect(() => {
    setDataProvider(prev =>
      prev.cloneWithRows(Array.isArray(goals) ? goals : [])
    );
  }, [goals]);

  useEffect(() => {
    if (goals.length === 0) {
      reload();   // force reload
    }
  }, [])


  /* ---------------- LAYOUT PROVIDER ---------------- */
  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        (index) => {
          const item = dataProvider.getDataForIndex(index) as Goals;
          const hasGoal =
            Boolean(item.goalID) ||
            (Array.isArray(item.goals) && item.goals.length > 0);

          return hasGoal ? ViewTypes.GOAL : ViewTypes.NORMAL;
        },
        (type, dim, index) => {
          const item = dataProvider.getDataForIndex(index) as Goals;
          dim.width = width;
          dim.height = calculateRowHeight(item);

          // switch (type) {
          //   case ViewTypes.GOAL:
          //     dim.height = 120;   // taller
          //     break;
          //   case ViewTypes.NORMAL:
          //   default:
          //     dim.height = 85;    // shorter
          // }
        }
      ),
    [dataProvider]
  );


  /* ---------------- ROW RENDERER ---------------- */
  const rowRenderer = (_: string, item: Goals) => {
  
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          // console.log('Goal pressed:', item.ID)
          navigation.navigate('GoalDetails', {
            goalID: item.GoalID,
            // pass only ID
          })
        }
      >
     <GoalItem item={item} />

      </TouchableOpacity>
    );
  };



  const LINE_HEIGHT = 25;
  const BASE_PADDING = 25;

  const calculateRowHeight = (item: Goals) => {
    const titleLines = Math.ceil((item.goalName?.length ?? 0) / 25);
    const descLines = Math.ceil((item.goaldescription?.length ?? 0) / 45);

    let height =
      BASE_PADDING +
      titleLines * LINE_HEIGHT +
      descLines * LINE_HEIGHT;

    // extra height if goal exists
    if (item.goalID || (item.goals && item.goals.length > 0)) {
      height += 40;
    }

    return Math.max(height, 60); // minimum height
  };



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
      {/* 🔘 FILTER BUTTONS */}
      <ButtonComponent
        selectedFilter={filter}
        onPressCurrent={() => setFilter('current')}
        onPressSkipped={() => setFilter('skipped')}
        onPressPending={() => setFilter('future')}

        currentCount={counts.current}
        skippedCount={counts.skipped}
        pendingCount={counts.future}
        hideHeader={true}
      />
      {dataProvider.getSize() === 0 ? (
        <View style={styles.center}>
          <Text>No todos available.</Text>
        </View>) : (
        <RecyclerListView
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
        />
      )}

      <TouchableOpacity
        style={styles.fab}

        onPress={() => navigation.getParent()?.navigate('AddGoal')
        }
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>

    </View>

  );
};

export default GoalListScreen;

/* ================================================= */
/* ================= ROW COMPONENTS ================= */
/* ================================================= */



const GoalItem = ({ item }: { item: Goals }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{item.goalName}</Text>
    <Text style={styles.description} numberOfLines={2}>
    {item.goalBeginDate} - {item.goalEndDate}</Text>
    <Text style={styles.description} numberOfLines={2}>
      {item.goalDescription}
    </Text>
  </View>
);

/* ================================================= */
/* ===================== STYLES ==================== */
/* ================================================= */

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
    marginVertical: 3,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },

  goalCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#36a2eb',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
  },

  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  goalText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#646464',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1565C0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fabIcon: {
    color: '#fff',
    fontSize: 30,
  },
  icon: { width: 22, height: 22, tintColor: '#fff', resizeMode: 'contain', },
  headerIcons: { flexDirection: 'row', alignItems: 'center', marginRight: 8, },
});



