import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute,RouteProp } from '@react-navigation/native';
type RouteProps = RouteProp<AppStackParamList, 'AlertDetails'>;
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


import { getAlertById, deleteAlertById } from './AlertController';

/* =========================
   NAVIGATION TYPES
========================= */

type AppStackParamList = {
  AlertDetails: { alertId: number };
  Alerts: { refresh?: boolean } | undefined;
};

type NavProps = NativeStackNavigationProp<AppStackParamList>;
// type RouteProps = RouteProp<AppStackParamList, 'AlertDetails'>;

/* =========================
   SCREEN
========================= */

const AlertDetailsScreen = () => {
 const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();

  const { alertId } = route.params;
  
  console.log('Alert ID received:', alertId);

  const [alertData, setAlertData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlertDetails();
  }, []);

  const fetchAlertDetails = async () => {
    try {
      setLoading(true);
      const response = await getAlertById(alertId);
      console.log('Alert details fetched:', response);
      setAlertData(response[0]);
    } catch (e) {
      setError('Failed to load alert details');
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    navigation.goBack();
  };

  const onDelete = () => {
    Alert.alert(
      'Delete Alert',
      'Are you sure you want to delete this alert?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteAlertById(alertId);

            // ✅ Tell Alert list to refresh
            navigation.navigate('Alerts');
          },
        },
      ]
    );
  };

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#498ABF" />
      </View>
    );
  }

  /* ---------- ERROR ---------- */
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!alertData) return null;

  /* ---------- UI ---------- */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AlertTitle </Text>
      <Text style={styles.description}>{alertData.title}</Text>
      <Text style={styles.title}>Tags </Text>
      <Text style={styles.description}>{alertData.tags}</Text>
      <Text style={styles.title}>Description</Text>
      <Text style={styles.description}>{alertData.description}</Text>


      {/* {!!alertData.tags?.length && (
        <Text style={styles.tags}>Tags: {alertData.tags.join(', ')}</Text>
      )}
 */}
      <Text style={styles.title}>Date</Text>

      <Text style={styles.description}> {alertData.sentDate}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.btnText}>DELETE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
          <Text style={styles.btnText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlertDetailsScreen;

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFE8C7',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    paddingBottom: 10,
  },
  tags: {
    marginTop: 6,
    color: '#2E7D32',
  },
  date: {
    marginTop: 6,
    color: '#757575',
  },
  description: {
    fontSize: 18,
    lineHeight: 22,
    paddingBottom: 10,

  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  deleteBtn: {
    backgroundColor: '#D32F2F',
    padding: 12,
    borderRadius: 6,
    width: '45%',
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#757575',
    padding: 12,
    borderRadius: 6,
    width: '45%',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
