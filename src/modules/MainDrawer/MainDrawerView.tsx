// navigation/MainDrawer/MainDrawerView.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, TouchableOpacity } from 'react-native';
import CustomDrawer from '../../components/CustomDrawer';
import { drawerScreens } from './drawerConfig';

const Drawer = createDrawerNavigator();

export default function MainDrawerView({ drawerOptions }: any) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={drawerOptions}
    >
      {drawerScreens.map(({ name, component, icon }) => (
        <Drawer.Screen
          key={name}
          name={name}
          component={component}
          options={({ navigation }) => ({
            gestureEnabled: true,
            drawerIcon: ({ color, size }) => (
              <Image
                source={icon}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
            headerRight:
              name === 'Home' ? (
                () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Alerts')}>
                    <Image
                      source={require('../../assets/alerts.png')}
                      style={{ width: 24, height: 24, marginRight: 16, tintColor: 'white' }}
                    />
                  </TouchableOpacity>
                )
              ) : undefined,
          })}
        />
      ))}
    </Drawer.Navigator>
  );
}
