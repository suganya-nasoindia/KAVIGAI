/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
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

import { useTodoController } from './useTodoController';
import { Todo } from './TodoModel';
import ButtonComponent from '../../Components/ButtonComponent';

const { width } = Dimensions.get('window');

/* ================================================= */
/* ================= SAFE IMAGE ==================== */
/* ================================================= */

const SafeImage = ({ item }: { item: Todo }) => {
  const isValidUrl =
    item.imageUrl &&
    item.imageUrl.trim() !== '' &&
    item.imageUrl !== 'null';

  const source = isValidUrl
    ? { uri: encodeURI(item.imageUrl.trim()) }
    : require('../../assets/todo.png');

  return (
    <Image
      source={source}
      style={[
        styles.image,
        !isValidUrl && { tintColor: '#555' },
      ]}
      resizeMode="contain"
    />
  );
}

/* ================================================= */
/* ================= ROW COMPONENTS ================= */
/* ================================================= */

const GoalTodoItem = ({ item }: { item: Todo }) => (
  <View style={[styles.card, styles.goalCard]}>
    <SafeImage item={item} />
    <Text style={styles.title}>{item.name}</Text>
 <Text style={styles.timestamp}>
            {item.beginDate && item.endDate
              ? `${item.beginDate} - ${item.endDate}`
              : 'No Date'}
          </Text>
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
    <SafeImage item={item} />
    <Text style={styles.title}>{item.name}</Text>
 <Text style={styles.timestamp}>
            {item.beginDate && item.endDate
              ? `${item.beginDate} - ${item.endDate}`
              : 'No Date'}
          </Text>
    <Text style={styles.description} numberOfLines={2}>
      {item.description}
    </Text>
  </View>
);

/* ================================================= */
/* ================= TODO SCREEN =================== */
/* ================================================= */

const TodoScreen = () => {
  const navigation = useNavigation<any>();

  const { todos, loading, error, filter, reload, setFilter } =
    useTodoController();

  const ViewTypes = {
    NORMAL: 'NORMAL',
    GOAL: 'GOAL',
  };

  /* ---------------- DATA PROVIDER ---------------- */
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2)
  );

  useEffect(() => {
    setDataProvider(prev =>
      prev.cloneWithRows(Array.isArray(todos) ? todos : [])
    );
  }, [todos]);

  useEffect(() => {
    if (todos.length === 0) {
      reload();
    }
  }, []);

  /* ---------------- COUNT CALCULATION ---------------- */
  const counts = useMemo(() => {
    return {
      current: todos.filter(t => t.dateInterval === 0).length,
      skipped: todos.filter(t => t.dateInterval < 0).length,
      future: todos.filter(t => t.dateInterval > 0).length,
    };
  }, [todos]);

  /* ---------------- HEIGHT CALCULATION ---------------- */

  const LINE_HEIGHT = 15;
  const BASE_PADDING = 40;

  const calculateRowHeight = (item: Todo) => {
    const titleLines = Math.ceil((item.name?.length ?? 0) / 25);
    const descLines = Math.ceil((item.description?.length ?? 0) / 45);

    let height =
      BASE_PADDING +
      titleLines * LINE_HEIGHT +
      descLines * LINE_HEIGHT;

    if (item.goalID || (item.goals && item.goals.length > 0)) {
      height += 40;
    }

    return Math.max(height, 100);
  };

  /* ---------------- LAYOUT PROVIDER ---------------- */

  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        index => {
          const item = dataProvider.getDataForIndex(index) as Todo;
          const hasGoal =
            Boolean(item.goalID) ||
            (Array.isArray(item.goals) && item.goals.length > 0);

          return hasGoal ? ViewTypes.GOAL : ViewTypes.NORMAL;
        },
        (type, dim, index) => {
          const item = dataProvider.getDataForIndex(index) as Todo;
          dim.width = width;
          dim.height = calculateRowHeight(item);
        }
      ),
    [dataProvider]
  );

  /* ---------------- ROW RENDERER ---------------- */

  const rowRenderer = (_: string, item: Todo) => {
    const hasGoal =
      Boolean(item.goalID) ||
      (Array.isArray(item.goals) && item.goals.length > 0);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('TodoDetails', {
            todoID: item.ID,
          })
        }
      >
        {hasGoal ? (
          <GoalTodoItem item={item} />
        ) : (
          <NormalTodoItem item={item} />
        )}
      </TouchableOpacity>
    );
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
        </View>
      ) : (
        <RecyclerListView
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.getParent()?.navigate('AddTodo')}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoScreen;

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
    marginVertical: 5,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },

  goalCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#36a2eb',
  },
  timestamp: { fontSize: 12, color: '#999' },

  image: {
    width: 75,
    height: 75,
    marginBottom: 8,
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
});
