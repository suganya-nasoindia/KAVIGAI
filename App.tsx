/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/redux/reactstore';
import './src/i18n';

// Screens

import { Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import RootNavigator from './src/navigators/RootNavigator';
export type RootStackParamList = {
  Splash: undefined;
  WelcomeCarousel: undefined;
  WelcomeScreen: undefined;
  Login: undefined;
  StartJourney: undefined;
  AvailableMentor: undefined;
  Home: undefined;
};


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
             
            <RootNavigator/>

            </NavigationContainer>
          </PaperProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
