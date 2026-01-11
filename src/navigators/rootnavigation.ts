App.tsx

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


Root Navigation

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

AuthStack.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image,StyleSheet } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

import WelcomeCarouselScreen from '../screens/WelcomeCarousel/WelcomeCarouselScreen';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from '../modules/Login/LoginScreen';
import SuggestedServicesView from '../modules/SuggestedServices/SuggestedServicesView';

const Stack = createNativeStackNavigator();

/* =========================
   HOME BUTTON (HEADER)
========================= */
function HomeButton() {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.getParent()?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'AppStack',
            state: {
             // index:0,
              routes: [{ name: 'Home' }],
            },
          },
        ],
      })
    );
  };

  return (
    <TouchableOpacity onPress={goToHome} style={{ marginLeft: 15 }}>
    <Image source={require('../assets/home.png')} style={styles.icon} />
    </TouchableOpacity>
  );
}

/* =========================
   AUTH STACK
========================= */
export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="WelcomeCarousel"
        component={WelcomeCarouselScreen}
      />

      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      {/* ✅ ONLY Suggested Services has header */}
      <Stack.Screen
        name="StartJourney"
        component={SuggestedServicesView}
        options={{
          headerShown: true,
          title: 'Suggested Services',

          headerStyle: {
            backgroundColor: '#498ABF', // your app primary color
          },
      
          // ✅ Title color
          headerTitleStyle: {
            color: '#FFFFFF',
          },
      
          // ✅ Back arrow color (if shown)
          headerTintColor: '#FFFFFF',
      
          headerRight: () => <HomeButton />,
        }}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
    icon: {
        width: 22,
        height: 22,
        tintColor: '#fff',
    },
});


AppStack.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../modules/Home/homescreen';
import AlertView from '../modules/Alerts/AlertView';
import AlertDetailsScreen from '../modules/Alerts/AlertDetailScreen';
import Profile from '../modules/Profile';
import AvailableMentors from '../modules/Mentors/AvailableMentors';
import GoalTemplates from '../modules/GoalTemplate/GoalTemplates';
import SuggestedServicesView from '../modules/SuggestedServices/SuggestedServicesView';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { primaryHeaderOptions } from '../themes/navigation';



const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: 'Home',
                    ...primaryHeaderOptions,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Alerts')}
                            style={{ marginRight: 15 }}
                        >
                            <Image
                                source={require('../assets/alerts.png')}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    ),
                })}

            />
            <Stack.Screen
                name="Profile"
                component={Profile}
            />

            <Stack.Screen
                name="AvailableMentors"
                component={AvailableMentors}
            />

            <Stack.Screen
                name="GoalTemplate"
                component={GoalTemplates}
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
                            <Image source={require('../assets/home.png')} style={styles.icon} />
                        </TouchableOpacity>
                    ),
                })} />
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
}
const styles = StyleSheet.create({
    icon: {
        width: 22,
        height: 22,
        tintColor: '#fff',
    },
});


