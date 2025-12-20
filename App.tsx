/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { StatusBar, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/redux/reactstore';
import './src/i18n';

// Screens
import SplashScreen from './src/screens/Splash/SplashScreen';
import WelcomeCarouselScreen from './src/screens/WelcomeCarousel/WelcomeCarouselScreen';
import LoginScreen from './src/modules/Login/LoginScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SuggestedServicesView from './src/modules/SuggestedServices/SuggestedServicesView';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';

import Profile from './src/modules/Profile';

export type RootStackParamList = {
  Splash: undefined;
  WelcomeCarousel: undefined;
  WelcomeScreen: undefined;
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

                <Stack.Screen
                  name="WelcomeScreen"
                  component={WelcomeScreen}
                  options={{ headerShown: false }}
                />
                {/* Login */}
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="ProfileUpdate"
                  component={Profile}
                />
                {/* Start Your Journey page */}
                <Stack.Screen
                  name="StartJourney"
                  component={SuggestedServicesView}
                  options={({ navigation }) => ({
                    title: "Start Your Journey",
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                        style={{ marginLeft: 15 }}
                      >
                        <Image source={require('./src/assets/home.png')} style={styles.icon} />
                      </TouchableOpacity>
                    ),
                  })} />
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
const styles = StyleSheet.create({
  container: { flex: 1 },
  iconButton: { marginRight: 15 },
  icon: { width: 25, height: 25, tintColor: '#fff' },
});
