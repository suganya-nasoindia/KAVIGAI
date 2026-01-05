import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';

/* =========================
   VIEW
========================= */

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Sugan</Text>
        </View>

        {/* Drawer items */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version aaa</Text>
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 35,
    backgroundColor: '#FF8639',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  name: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  versionContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#888',
  },
});
