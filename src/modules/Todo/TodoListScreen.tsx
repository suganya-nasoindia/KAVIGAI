/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text, TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';


import { useTodoController, FilterType } from './useTodoController';
import { Todo } from './TodoModel';
import ButtonComponent from '../../Components/ButtonComponent';

const { width } = Dimensions.get('window');


const TodoScreen = () => {
  // const { todos, loading, error, filter, reload } = useTodoController();
  const { todos, loading, error, filter, reload, setFilter } = useTodoController();

  const ViewTypes = {
    NORMAL: 'NORMAL',
    GOAL: 'GOAL',
  };

  
  console.log('Active filter:', filter);
  console.log('Todos received:', todos.length);
  console.log('todos length:', todos.length);
  console.log('all todos:', todos);

  /* ---------------- DATA PROVIDER ---------------- */
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2)
  );

  const counts = useMemo(() => {
    return {
      current: todos.filter(t => t.dateInterval === 0).length,
      skipped: todos.filter(t => t.dateInterval < 0).length,
      future: todos.filter(t => t.dateInterval > 0).length,
    };
  }, [todos]);

  useEffect(() => {
    setDataProvider(prev =>
      prev.cloneWithRows(Array.isArray(todos) ? todos : [])
    );
  }, [todos]);

  useEffect(() => {
    if (todos.length === 0) {
      reload();   // force reload
    }
  }, [])


  /* ---------------- LAYOUT PROVIDER ---------------- */
  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        (index) => {
          const item = dataProvider.getDataForIndex(index) as Todo;
          const hasGoal =
            Boolean(item.goalID) ||
            (Array.isArray(item.goals) && item.goals.length > 0);
  
          return hasGoal ? ViewTypes.GOAL : ViewTypes.NORMAL;
        },
        (type, dim,index) => {
          const item = dataProvider.getDataForIndex(index) as Todo;
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
  const rowRenderer = (_: string, item: Todo) => {
    const hasGoal =
      Boolean(item.goalID) ||
      (Array.isArray(item.goals) && item.goals.length > 0);

    return hasGoal ? (
      <GoalTodoItem item={item} />
    ) : (
      <NormalTodoItem item={item} />
    );
  };



  const LINE_HEIGHT = 15;
  const BASE_PADDING = 25;
  
  const calculateRowHeight = (item: Todo) => {
    const titleLines = Math.ceil((item.name?.length ?? 0) / 25);
    const descLines = Math.ceil((item.description?.length ?? 0) / 45);
  
    let height =
      BASE_PADDING +
      titleLines * LINE_HEIGHT +
      descLines * LINE_HEIGHT;
  
    // extra height if goal exists
    if (item.goalID || (item.goals && item.goals.length > 0)) {
      height += 40;
    }
  
    return Math.max(height, 80); // minimum height
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
    </View>
  );
};

export default TodoScreen;

/* ================================================= */
/* ================= ROW COMPONENTS ================= */
/* ================================================= */

const GoalTodoItem = ({ item }: { item: Todo }) => (
  <View style={[styles.card, styles.goalCard]}>
    <Text style={styles.title}>{item.name}</Text>

    <Text style={styles.description} numberOfLines={2}>
      {item.description}
    </Text>

    <Text style={styles.goalText}>
      🎯 {item.goals?.[0]?.goalName ?? 'Goal'}
    </Text>
  </View>
);

const NormalTodoItem = ({ item }: { item: Todo }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{item.name}</Text>

    <Text style={styles.description} numberOfLines={2}>
      {item.description}
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
});



