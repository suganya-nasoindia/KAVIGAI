// Today.view.tsx
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import { PieChart } from 'react-native-chart-kit';
import { useTodayController } from './TodayController';

const { width } = Dimensions.get('window');

const TodayScreen: React.FC = () => {
  const { dataProvider, pieData, loading, error } = useTodayController();

  const layoutProvider = new LayoutProvider(
    () => 'ROW',
    (_, dim) => {
      dim.width = width;
      dim.height = 120;
    }
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Goal Status</Text>

      {pieData.length > 0 ? (
        <PieChart
          data={pieData}
          width={width}
          height={200}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
          chartConfig={{
            color: () => '#000',
          }}
        />
      ) : (
        <Text style={styles.empty}>No goal data available</Text>
      )}

      <RecyclerListView
        layoutProvider={layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={(_, item) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TodayScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFE8C7' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { textAlign: 'center', fontSize: 16, margin: 10 },
  empty: { textAlign: 'center', color: '#666' },
  card: {
    backgroundColor: '#DCDCDC',
    margin: 6,
    padding: 10,
    borderRadius: 8,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  desc: { fontSize: 14, color: '#555' },
});
