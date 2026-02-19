import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MentorTabScreen from './MentorTabScreen';
import { primaryHeaderOptions } from '../../themes/navigation';
import AvailableMentorList from '../Mentors/AvailableMentors';

const Stack = createNativeStackNavigator();

const MentorStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="MentorTabs"
                component={MentorTabScreen}
                options={({ navigation }) => ({
                    title: 'Mentors',
                    headerStyle: { backgroundColor: '#498ABF' },
                    headerTintColor: '#fff',
                    headerRight: () =>renderHeaderRight(navigation),
                })}
            />

             <Stack.Screen name="AvailableMentors" component={AvailableMentorList} options={{
                    title: 'Available Mentors',
                    ...primaryHeaderOptions,
                  }} />
        </Stack.Navigator>
    );
};

const renderHeaderRight = (navigation: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('AvailableMentors')}
        style={{ marginRight: 15 }}
      >
        <Image
          source={require('../../assets/search.png')}
          style={{ width: 24, height: 24, tintColor: '#fff' }}
        />
      </TouchableOpacity>
    );
  };
export default MentorStackNavigator;
