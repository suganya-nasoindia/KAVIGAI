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
import { Provider } from 'react-redux';
import store from './src/redux/reactstore';

// Screens
import SplashScreen from './src/screens/Splash/SplashScreen';
import WelcomeCarouselScreen from './src/screens/WelcomeCarousel/WelcomeCarouselScreen';
import LoginScreen from './src/modules/Login/LoginScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SuggestedServicesView from './src/modules/SuggestedServices/SuggestedServicesView';


export type RootStackParamList = {
  Splash: undefined;
  WelcomeCarousel: undefined;
  Login: undefined;
  StartJourney: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>

      <PaperProvider
            settings={{
              icon: (props) => <MaterialCommunityIcons {...props} />,
            }}
          >
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
              options={{ headerShown: false }} 
            />

            {/* Start Your Journey page */}
            <Stack.Screen 
              name="StartJourney" 
              component={SuggestedServicesView} 
              options={{ headerShown: false }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
        </PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
    </Provider>
  );
}

const headerStyles = {
  headerStyle: { backgroundColor: '#4682B4' },
  headerTitleStyle: { color: '#fff' },
  headerTintColor: '#fff',
};
