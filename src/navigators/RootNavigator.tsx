import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from '../screens/Splash/SplashScreen';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { RootState } from '../redux/reactstore';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [isReady, setIsReady] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const value = await AsyncStorage.getItem('isFirstTime');

        if (value === null) {
          await AsyncStorage.setItem('isFirstTime', 'false');
          setIsFirstTime(true);
        }
      } catch (e) {
        console.log('Init error', e);
      } finally {
        setIsReady(true);
      }
    };

    bootstrap();
  }, []);



  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!isReady && (
      <Stack.Screen name="Splash" component={SplashScreen} />
    )}

    {isLoggedIn ? (
      <Stack.Screen name="AppStack" component={AppStack} />
    ) : (
      <Stack.Screen name="AuthStack" component={AuthStack} />
    )}
  </Stack.Navigator>
  );
}
