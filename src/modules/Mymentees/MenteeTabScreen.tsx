// TabScreen.tsx

import React, { useMemo } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

import MyMenteeList from './MyMenteesList';
import NewRequestsList from './NewRequestsList';


// =======================
// 🟢 MODEL (Types)
// =======================

export type TabParamList = {
  "My Mentees": undefined;
  "New Requests": undefined;
};


// =======================
// 🟢 CONTROLLER (Logic)
// =======================

const useTabController = () => {
  const initialRoute = useMemo<keyof TabParamList>(
    () => "My Mentees",
    []
  );

  return {
    initialRoute,
  };
};


// =======================
// 🟢 VIEW (UI)
// =======================

const Tab = createMaterialTopTabNavigator<TabParamList>();

const MenteeTabScreen: React.FC = () => {
  const { initialRoute } = useTabController();

  const screenOptions: MaterialTopTabNavigationOptions = {
    tabBarActiveTintColor: '#498ABF',
    tabBarInactiveTintColor: '#505050',
    tabBarLabelStyle: {
      fontWeight: 'bold',
    },
    tabBarIndicatorStyle: {
      backgroundColor: '#498ABF',
    },
    tabBarStyle: {
      backgroundColor: '#f0f0f0',
    },
    swipeEnabled: true,
    lazy: false,
  };

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={screenOptions}
    >
      <Tab.Screen name="My Mentees" component={MyMenteesList} />
      <Tab.Screen name="New Requests" component={NewRequestsList} />
    </Tab.Navigator>
  );
};

export default MenteeTabScreen;
