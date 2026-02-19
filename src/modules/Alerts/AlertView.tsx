// Alert.view.tsx

import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { RecyclerListView } from 'recyclerlistview';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAlertController } from './AlertController';
import type { AlertItem } from './AlertModel';

/* =========================
   NAVIGATION TYPES
========================= */

type TodayStackParamList = {
  Today: undefined;
  Alerts: undefined;
  AlertDetails: { alertId: number };
};

/* =========================
   ROW COMPONENT
========================= */

type AlertRowProps = {
  item: AlertItem;
  onPress: (item: AlertItem) => void;
};

const AlertRow = ({ item, onPress }: AlertRowProps) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={styles.card}>
      <Image
        source={require('../../assets/alerts.png')}
        style={styles.icon}
      />
      <View style={styles.content}>
        <Text style={styles.timestamp}>
          {item.sentDate || 'No Date'}
        </Text>
        <Text style={styles.title}>
          {item.title || 'No Title'}
        </Text>
        <Text
          style={styles.message}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.description || 'No Description Available'}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

/* =========================
   VIEW
========================= */

export default function AlertView() {
  const navigation =
    useNavigation<NativeStackNavigationProp<TodayStackParamList>>();
console.log('Rendering AlertView');
  // ✅ CALL HOOK ONLY ONCE
  const {
    dataProvider,
    layoutProvider,
    loading,
    error,
  } = useAlertController();
  const onAlertPress = (item: AlertItem) => {
    if (!item.alertNotificationID) return;

    navigation.navigate('AlertDetails', {
      alertId: item.alertNotificationID,
    });
  };

  const rowRenderer = (_: number, item: AlertItem) => (
    <AlertRow item={item} onPress={onAlertPress} />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#498ABF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error: {error.message || 'An error occurred'}
        </Text>
      </View>
    );
  }

  if (dataProvider.getSize() === 0) {
    return (
      <View style={styles.noAlertsContainer}>
        <Text style={styles.emptyText}>No Alerts available.</Text>

        {/* Optional manual refresh */}
        {/* <TouchableOpacity onPress={fetchAlerts}>
          <Text style={{ color: '#498ABF', marginTop: 10 }}>
            Tap to refresh
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RecyclerListView
        layoutProvider={layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={rowRenderer}
      />
    </View>
  );
}


/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFE8C7' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#DCDCDC',
    margin: 5,
  },
  icon: { width: 40, height: 40, marginRight: 15 },
  content: { flex: 1 },
  timestamp: { fontSize: 12, color: '#646464', marginBottom: 4 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#505050' },
  message: { fontSize: 14, color: '#646464' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: { fontSize: 18, color: '#498ABF', marginTop: 8 },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: { fontSize: 16, color: 'red' },
  noAlertsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: { fontSize: 16, color: '#505050' },
});
