import React from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import TodayScreen from '../today';
// import TodoScreen from '../todo';
// import ServicesScreen from '../services';
import AlertScreen from '../Alerts';

/* =========================
   MODEL
========================= */

const TABS = [
  {
    name: 'Today',
    icon: require('../../assets/today.png'),
    component: AlertScreen,
  },
  {
    name: 'Alerts',
    icon: require('../../assets/todo.png'),
    component: AlertScreen,
  },
  {
    name: 'Services',
    icon: require('../../assets/services.png'),
    component: AlertScreen,
  },
] as const;

/* =========================
   CONTROLLER
========================= */

const useHomeController = () => {
  const getIconForRoute = (routeName: string) => {
    return TABS.find(tab => tab.name === routeName)?.icon;
  };

  return {
    getIconForRoute,
  };
};

/* =========================
   VIEW
========================= */

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const { getIconForRoute } = useHomeController();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowIcon: true,
          tabBarStyle: { backgroundColor: '#498ABF' },
          tabBarLabelStyle: { fontSize: 12, color: '#ffffff' },
          tabBarIcon: ({ focused }) => (
            <Image
              source={getIconForRoute(route.name)}
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? '#ffffff' : '#646464',
              }}
              resizeMode="contain"
            />
          ),
          headerShown: false,
        })}
      >
        {TABS.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#498ABF',
  },
});
