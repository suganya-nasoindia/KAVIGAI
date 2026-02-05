import React, { useState, useCallback, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Share,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';

import TodoView from './TodoView';
import TodoComments from './TodoComments';

const TodoDetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { todoID } = route.params;

  const [selectedTab, setSelectedTab] =
    useState<'TODO' | 'COMMENTS'>('TODO');

  /* ---------- HEADER ---------- */
  useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Todo Details',
        headerRight: () => (
          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={onShare}
              style={styles.iconSpacing}
            >
              <Image
                source={require('../../assets/share.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete}>
              <Image
                source={require('../../assets/delete.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        ),
      });
 });

  const onShare = async () => {
    await Share.share({ message: 'Todo shared' });
  };

  const onDelete = () => {
    Alert.alert('Delete Todo', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image */}
      <Image
        source={require('../../assets/todo.png')}
        style={styles.profileImage}
      />

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'TODO' && styles.activeTab]}
          onPress={() => setSelectedTab('TODO')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'TODO' && styles.activeText,
            ]}
          >
            Todo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'COMMENTS' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('COMMENTS')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'COMMENTS' && styles.activeText,
            ]}
          >
            Comments
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {selectedTab === 'TODO' && <TodoView todoId={todoID} />}
        {selectedTab === 'COMMENTS' && (
          <TodoComments todoId={todoID} />
        )}
      </View>
    </ScrollView>
  );
};

export default TodoDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8C7',
  },
  profileImage: {
    width: '100%',
    height: 170,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#4688C5',
    borderColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#ffffff',
  },
  tabText: {
    color: '#DADADA',
    fontSize: 16,
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    padding: 5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  iconSpacing: {
    marginRight: 16,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
});
