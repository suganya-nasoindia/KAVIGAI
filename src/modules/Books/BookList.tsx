import React from 'react';
import { RootState } from '../../redux/reactstore';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RecyclerListView } from 'recyclerlistview';

import ButtonComponent from '../../Components/ButtonComponent';
import { useBookListController } from './BooksController';
import { BookItem } from './BookModel';

/* ---------------- SHARED CONTENT ----------------*/

const BookContent = ({ item }: { item: BookItem }) => (
  <View style={styles.row}>
    <Image
      source={
        item.imageUrl
          ? { uri: item.imageUrl.replace(/\s/g, '%20') }
          : require('../../assets/book.png')
      }
      style={styles.icon}
    />

    <View style={styles.textContainer}>
      <Text style={styles.timestamp}>
        {item.beginDate} - {item.endDate}
      </Text>

      <Text style={styles.title} numberOfLines={1}>
        {item.name}
      </Text>

      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
    </View>
  </View>
);

/* ---------------- ROW TYPES ---------------- */

const GoalBookItem = ({ item, navigation }: any) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('BookDetails', { event: item })}
  >
    <View style={[styles.card, styles.goalCard]}>
      <BookContent item={item} />
      <Text style={styles.goalText}>
        🎯 {item.goals?.[0]?.goalName ?? 'Goal'}
      </Text>
    </View>
  </TouchableOpacity>
);

const NormalBookItem = ({ item, navigation }: any) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('BookDetails', { event: item })}
  >
    <View style={styles.card}>
      <BookContent item={item} />
    </View>
  </TouchableOpacity>
);

/* ---------------- MAIN SCREEN ---------------- */

const BookList = ({ navigation }: any) => {
    const selectedService = useSelector(
        (state: RootState) => state.service.selectedService
    );
  const {
    loading,
    error,
    filterType,
    setFilterType,
    dataProvider,
    layoutProvider,
  } = useBookListController();

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (error) {
    return <Text>Error loading Books</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ButtonComponent
        onPressCurrent={() => setFilterType('current')}
        onPressSkipped={() => setFilterType('skipped')}
        onPressPending={() => setFilterType('future')}
        selectedFilter={filterType}
        serviceName={selectedService ?? 'BOOK'} // 🔥 dynamic
        />

      {dataProvider.getSize() === 0 ? (
        <View style={styles.center}>
          <Text>No Books available</Text>
        </View>
      ) : (
        <RecyclerListView
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}
          rowRenderer={(_, item: BookItem) => {
            const hasGoal =
              Boolean(item.goalID) ||
              (Array.isArray(item.goals) && item.goals.length > 0);

            return hasGoal ? (
              <GoalBookItem item={item} navigation={navigation} />
            ) : (
              <NormalBookItem item={item} navigation={navigation} />
            );
          }}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddBook')}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BookList;

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

  row: {
    flexDirection: 'row',
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

  icon: {
    width: 75,
    height: 75,
    marginRight: 10,
  },

  textContainer: {
    flex: 1,
  },

  timestamp: {
    fontSize: 12,
    color: '#777',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 14,
    color: '#555',
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
