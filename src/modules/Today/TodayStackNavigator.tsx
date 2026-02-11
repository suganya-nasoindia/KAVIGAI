import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {TouchableOpacity, Image} from 'react-native';
import TodayScreen from './TodayView';
import { primaryHeaderOptions } from '../../themes/navigation';

import AlertDetailsScreen from '../Alerts/AlertDetailScreen';
import AlertView from '../Alerts/AlertView';

const Stack = createNativeStackNavigator();

const TodoStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="Today"
                component={TodayScreen}
                options={({ navigation }) => ({
                    title: 'Today',
                    headerStyle: { backgroundColor: '#498ABF' },
                    headerTintColor: '#fff',
                    headerRight: () =>renderHeaderRight(navigation),
                })}
            />

<Stack.Screen name="Alerts" component={AlertView} options={{
                title: 'Alerts',
                ...primaryHeaderOptions,
            }} />
            <Stack.Screen name="AlertDetails" component={AlertDetailsScreen} options={{
                headerShown: true,
                title: 'Alert Details',
                ...primaryHeaderOptions,
            }} />

        </Stack.Navigator>
    );
};

const renderHeaderRight = (navigation: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Alerts')}
        style={{ marginRight: 15 }}
      >
        <Image
          source={require('../../assets/alerts.png')}
          style={{ width: 24, height: 24, tintColor: '#fff' }}
        />
      </TouchableOpacity>
    );
  };
  

export default TodoStackNavigator;
