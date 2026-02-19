// TabScreen.tsx

import React, { useMemo } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

import MyMentorList from './MyMentorsList';
import PendingRequestsList from './PendingRequestsList';


// =======================
// 🟢 MODEL (Types)
// =======================

export type TabParamList = {
  "My Mentors": undefined;
  "Pending Requests": undefined;
};


// =======================
// 🟢 CONTROLLER (Logic)
// =======================

const useTabController = () => {
  const initialRoute = useMemo<keyof TabParamList>(
    () => "My Mentors",
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

const MentorTabScreen: React.FC = () => {
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
      <Tab.Screen name="My Mentors" component={MyMentorList} />
      <Tab.Screen name="Pending Requests" component={PendingRequestsList} />
    </Tab.Navigator>
  );
};

export default MentorTabScreen;
