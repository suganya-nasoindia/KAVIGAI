import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodayScreen from './TodayView';
import AlertDetailsScreen from '../Alerts/AlertDetailScreen';
import AlertView from '../Alerts/AlertView';

const Stack = createNativeStackNavigator();

const TodoStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Today"
                component={TodayScreen}
            />
            <Stack.Screen
                name="Alerts"
                component={AlertView}
            />
            <Stack.Screen
                name="AlertDetails"
                component={AlertDetailsScreen}
            />
    
        </Stack.Navigator>
    );
};

export default TodoStackNavigator;
