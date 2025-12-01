/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import SplashScreen from './src/screens/Splash/SplashScreen';
import WelcomeCarouselScreen from './src/screens/WelcomeCarousel/WelcomeCarouselScreen';
import LoginScreen from './src/screens/LoginScreen';
import StartJourneyScreen from './src/screens/StartJourneyScreen';

export type RootStackParamList = {
  Splash: undefined;
  WelcomeCarousel: undefined;
  Login: undefined;
  StartJourney: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

        <NavigationContainer>
          <Stack.Navigator screenOptions={headerStyles}>
            {/* Splash screen */}
            <Stack.Screen 
              name="Splash" 
              component={SplashScreen} 
              options={{ headerShown: false }} 
            />

            {/* Welcome Carousel */}
            <Stack.Screen 
              name="WelcomeCarousel" 
              component={WelcomeCarouselScreen} 
              options={{ headerShown: false }} 
            />

            {/* Login */}
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ title: 'Login' }} 
            />

            {/* Start Your Journey page */}
            <Stack.Screen 
              name="StartJourney" 
              component={StartJourneyScreen} 
              options={{ headerShown: false }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const headerStyles = {
  headerStyle: { backgroundColor: '#4682B4' },
  headerTitleStyle: { color: '#fff' },
  headerTintColor: '#fff',
};
