import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from '../screens/Splash/SplashScreen';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { RootState } from '../redux/reactstore';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  useEffect(() => {
    const initApp = async () => {
      try {
        const firstTimeValue = await AsyncStorage.getItem('isFirstTime');

        // if key doesn't exist → first time user
        if (firstTimeValue === null) {
          setIsFirstTime(true);
          await AsyncStorage.setItem('isFirstTime', 'false');
        } else {
          setIsFirstTime(false);
        }
      } catch (e) {
        setIsFirstTime(false);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000); // splash duration
      }
    };

    initApp();
  }, []);

  // ⛔ wait until async storage is resolved
  if (isLoading || isFirstTime === null) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Splash" component={SplashScreen} />
      </RootStack.Navigator>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstTime ? (
        <RootStack.Screen name="AuthStack" component={AuthStack} />
      ) : (
        <RootStack.Screen name="AppStack" component={AppStack} />
      )}
    </RootStack.Navigator>
  );
}
