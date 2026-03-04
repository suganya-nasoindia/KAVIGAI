import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodoListScreen from './TodoListScreen';
import TodoDetailScreen from './TodoDetailScreen';
import AddTodo from './AddTodo';
import TodoView from './TodoView';
import TodoComments from './TodoComments';
import { primaryHeaderOptions } from '../../themes/navigation';

const Stack = createNativeStackNavigator();

const TodoStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="TodoList"
                component={TodoListScreen}
                options={({ }) => ({
                    title: 'Todo',
                    ...primaryHeaderOptions,

                })}
            />
            <Stack.Screen
                name="TodoDetails"
                options={({ }) => ({
                    title: 'Todo Details',
                    ...primaryHeaderOptions,

                })}
                component={TodoDetailScreen}
            />
            <Stack.Screen
                name="AddTodo"
                options={({ }) => ({
                    title: 'Add Todo',
                    ...primaryHeaderOptions,
                })}
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
