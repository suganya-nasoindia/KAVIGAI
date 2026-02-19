import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
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
    navigation.getParent()?.navigate('AppStack', {
      screen: 'Home',
    });

    // navigation.getParent()?.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: 'AppStack' }],
    //   })
    // );
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
