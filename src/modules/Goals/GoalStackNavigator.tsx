import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GoalListView from './GoalListView';
// import GoalDetailsScreen from './GoalDetailsScreen';
// import AddGoalsScreen from './AddGoalsScreen';

const Stack = createNativeStackNavigator();

const TodoStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="GoalList"
                component={GoalListView}
            />
            {/* <Stack.Screen
                name="GoalDetails"
                component={GoalDetailsScreen}
            />
            <Stack.Screen
                name="AddGoal"
                component={AddGoalsScreen}
            /> */}
    
        </Stack.Navigator>
    );
};

export default TodoStackNavigator;
