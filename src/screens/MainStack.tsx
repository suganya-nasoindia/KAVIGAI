/* eslint-disable react/no-unstable-nested-components */
// AppNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import HomeScreen from '../homeScreen';
import CustomDrawer from '../../components/CustomDrawer';
import { Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import Profile from '../modules/Profile';
// import GoalListScreen from '../goals';
// import MentorListScreen from '../Mentors';
// import MenteeListScreen from '../Mentees';
import GoalTemplates from '../modules/GoalTemplate';
import AvailableMentors from '../modules/Mentors/AvailableMentors';
//import SettingsScreen from '../Settings';
//import SubscriptionScreen from '../subscription';
import SuggestedServicesView from '../modules/SuggestedServices/SuggestedServicesView';
// import AboutScreen from '../AppSupport/about';
// import ContactScreen from '../AppSupport/contact';
// import PrivacyScreen from '../AppSupport/privacypolicy';
// import TosScreen from '../AppSupport/tos';
// import HelpScreen from '../AppSupport/help';

const Drawer = createDrawerNavigator();

export default function MainStack() {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4682B4', // Header background color
        },
        headerTintColor: '#fff', // Icon/text color in header
        drawerType: isLargeScreen ? 'permanent' : 'front',
        drawerStyle: isLargeScreen ? null : { width: '75%' },
        overlayColor: 'rgba(0,0,0,0.4)',
        headerShown: true,
        drawerActiveTintColor: '#498ABF',
        drawerActiveBackgroundColor: '#003CB3',
        swipeEdgeWidth: 100,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/home.png')}
              style={{
                width: size,
                height: size,
                tintColor: color, // Dynamic tint
              }}
            />
          ), // 👈 Moved the closing parenthesis here
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Alerts')}>
              <Image
                source={require('../../assets/alerts.png')}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 16,
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/profile.png')}
              style={{
                width: size,
                height: size,
                tintColor: color, // Dynamic tint
              }}
            />
          ), // 👈 Moved the closing parenthesis here
        }}
      />
      {/* <Drawer.Screen
        name="Goals"
        component={GoalListScreen}
        options={{
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/goal.png')}
              style={{
                width: size,
                height: size,
                tintColor: color, // Dynamic tint
              }}
            />
          ), // 👈 Moved the closing parenthesis here
        }}
      />
      <Drawer.Screen
        name="Mentor Details"
        component={MentorListScreen}
        options={({ navigation }) => ({
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/mymentors.png')}
              style={{
                width: size,
                height: size,
                tintColor: color, // Dynamic tint
              }}
            />
          ), // 👈 Moved the closing parenthesis here
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Find a Mentor ')}>
              <Image
                source={require('../../assets/search.png')}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 16,
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Mentee Details"
        component={MenteeListScreen}
        options={{
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/mymentees.png')}
              style={{
                width: size,
                height: size,
                tintColor: color, // Dynamic tint
              }}
            />
          ), // 👈 Moved the closing parenthesis here
        }}
      /> */}
      <Drawer.Screen
        name="Add a Goal"
        component={GoalTemplates}
        options={{
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/select_goals.png')}
              style={{
                width: size,
                height: size,
                tintColor: color, // Dynamic tint
              }}
            />
          ), // 👈 Moved the closing parenthesis here
        }}
      />
      <Drawer.Screen
        name="Find a Mentor"
        component={AvailableMentors}
        options={{
          gestureEnabled: true,
            drawerIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/find_mentor.png')}
                style={{
                  width: size,
                  height: size,
                  tintColor: color, // Dynamic tint
                }}
              />
            ), // 👈 Moved the closing parenthesis here
        }}
      />

      {/* <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          gestureEnabled: true,
          drawerIcon: ({ color,size }) => (
            <Image
                source={require('../../assets/settings.png')}
                style={{
                  width: size,
                  height: size,
                  tintColor: color, // Dynamic tint
                }}
              />
            ), // 👈 Moved the closing parenthesis here
        }}
      />
      <Drawer.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{
          gestureEnabled: true,
          drawerIcon: ({ color,size}) => (
            <Image
            source={require('../../assets/subscription.png')}
            style={{
              width: size,
              height: size,
              tintColor: color, // Dynamic tint
            }}
          />
        ), // 👈 Moved the closing parenthesis here
        }}
      /> */}
      <Drawer.Screen
        name="Start Your Journey"
        component={SuggestedServicesView}
        options={{
          gestureEnabled: true,
          drawerIcon: ({ color,size }) => (
            <Image
                source={require('../../assets/find_mentor.png')}
                style={{
                  width: size,
                  height: size,
                  tintColor: color, // Dynamic tint
                }}
              />
            ), // 👈 Moved the closing parenthesis here
        }}
      />
      {/* <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          gestureEnabled: true,
          drawerIcon: ({ color,size }) => (
            <Image
            source={require('../../assets/about.png')}
            style={{
              width: size,
              height: size,
              tintColor: color, // Dynamic tint
            }}
          />
        ), // 👈 Moved the closing parenthesis here
        }}
      />

      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          gestureEnabled: true,
          drawerIcon: ({ color,size }) => (
            <Image
            source={require('../../assets/contact.png')}
            style={{
              width: size,
              height: size,
              tintColor: color, // Dynamic tint
            }}
          />
        ), // 👈 Moved the closing parenthesis here
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyScreen}
        options={{
          gestureEnabled: true,
          drawerIcon: ({ color,size }) => (
            <Image
            source={require('../../assets/privacy.png')}
            style={{
              width: size,
              height: size,
              tintColor: color, // Dynamic tint
            }}
          />
        ), // 👈 Moved the closing parenthesis here
        }}
      />
      <Drawer.Screen
        name="Terms of Service"
        component={TosScreen}
        options={{
          gestureEnabled: true,
          drawerIcon: ({ color,size }) => (
            <Image
            source={require('../../assets/tos.png')}
            style={{
              width: size,
              height: size,
              tintColor: color, // Dynamic tint
            }}
          />
        ), // 👈 Moved the closing parenthesis here
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          gestureEnabled: true,
          drawerIcon: ({ color,size }) => (
            <Image
                source={require('../../assets/help.png')}
                style={{
                  width: size,
                  height: size,
                  tintColor: color, // Dynamic tint
                }}
              />
            ), // 👈 Moved the closing parenthesis here
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={TosScreen}
        options={{
          gestureEnabled: true,
          drawerIcon: ({ color,size }) => (
            <Image
            source={require('../../assets/logout.png')}
            style={{
              width: size,
              height: size,
              tintColor: color, // Dynamic tint
            }}
          />
        ), // 👈 Moved the closing parenthesis here
        }}
      /> */}
    </Drawer.Navigator>
  );
}
