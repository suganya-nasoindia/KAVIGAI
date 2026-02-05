import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodoListScreen from './TodoListScreen';
import TodoDetailScreen from './TodoDetailScreen';
import AddTodo from './AddTodo';
import TodoView from './TodoView';
import TodoComments from './TodoComments';

const Stack = createNativeStackNavigator();

const TodoStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="TodoList"
                component={TodoListScreen}
            />
            <Stack.Screen
                name="TodoDetails"
                component={TodoDetailScreen}
            />
            <Stack.Screen
                name="AddTodo"
                component={AddTodo}
            />
            <Stack.Screen
                name="TodoView"
                component={TodoView}
            />
            <Stack.Screen
                name="Comments"
                component={TodoComments}
            />
        </Stack.Navigator>
    );
};

export default TodoStackNavigator;
