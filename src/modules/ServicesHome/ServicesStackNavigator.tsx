import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ServicesHomeScreen from './ServicesHomeScreen';
import EventList from '../../modules/Events/EventList';
import BookList from '../../modules/Books/BookList';
import MeetingList from '../../modules/Meetings/MeetingList';
import WebsiteList from '../../modules/Websites/WebsiteList';

const Stack = createNativeStackNavigator();

const ServicesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ServicesHome"
        component={ServicesHomeScreen}
      />
      <Stack.Screen
        name="EventList"
        component={EventList}
      />
      <Stack.Screen
        name="BookList"
        component={BookList}
      />
      <Stack.Screen
        name="MeetingList"
        component={MeetingList}
      />
         <Stack.Screen
        name="WebsiteList"
        component={WebsiteList}
      />
    </Stack.Navigator>
  );
};

export default ServicesStackNavigator;
