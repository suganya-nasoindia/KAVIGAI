import React, { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Switch,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../redux/reactstore';
import { toggleServiceStatus } from '../../../../redux/slices/userProfileSlice';
import { saveUserServices } from '../../../UserInfo/thunks/updateUserServices';

const ServicesInfoView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();

  const services = useSelector(
    (state: RootState) => state.userProfile.services
  );

  useEffect(() => {
    if (services.length > 0) {
      console.log(
        'Initial services:',
        services.map(s => ({
          id: s.serviceID,
          active: s.isActive,
        }))
      );
    }
  }, [services]);

  const handleSave = () => {
    dispatch(saveUserServices());
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.serviceName}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        <Switch
          value={item.isActive}
          onValueChange={(value) =>
            dispatch(
              toggleServiceStatus({
                serviceID: item.serviceID,
                isActive: value,
              })
            )
          }
          trackColor={{
            false: '#ccc',
            true: colors.primary,
          }}
          thumbColor={
            item.isActive ? colors.primary : '#f4f3f4'
          }
        />
      </View>
    </View>
  );

  if (!services || services.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>No services found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={services}
      keyExtractor={(item) => item.serviceID.toString()}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
      ListFooterComponent={
        <View style={styles.footer}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save Services</Text>
          </Pressable>
        </View>
      }
    />
  );
};

export default ServicesInfoView;


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#666',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
});

