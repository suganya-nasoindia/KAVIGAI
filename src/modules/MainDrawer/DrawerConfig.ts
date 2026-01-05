// navigation/MainDrawer/drawerConfig.ts
import HomeScreen from '../Home/homescreen';
import ProfileScreen from '../Profile';
//import GoalListScreen from '../goals';
//import MentorListScreen from '../Mentors';
//import MenteeListScreen from '../Mentees';
// import GoalTemplates from '../GoalTemplate';
// import AvailableMentors from '../Mentors/AvailableMentors';
// import SettingsScreen from '../Settings';
// import SubscriptionScreen from '../subscription';
import SuggestedServices from '../SuggestedServices/SuggestedServicesView';
import AboutScreen from '../AppSupport/about';
import ContactScreen from '../AppSupport/Contact';
import PrivacyScreen from '../AppSupport/Privacy';
import TermsScreen from '../AppSupport/Terms';
import HelpScreen from '../AppSupport/help';

export const drawerScreens = [
  { name: 'Home', component: HomeScreen, icon: require('../../assets/home.png') },
  { name: 'Profile', component: ProfileScreen, icon: require('../../assets/profile.png') },
  // { name: 'Goals', component: GoalListScreen, icon: require('../../assets/goal.png') },
  // { name: 'Mentor Details', component: MentorListScreen, icon: require('../../assets/mymentors.png') },
  // { name: 'Mentee Details', component: MenteeListScreen, icon: require('../../assets/mymentees.png') },
  // { name: 'Add a Goal', component: GoalTemplateListScreen, icon: require('../../assets/select_goals.png') },
  // { name: 'Find a Mentor', component: AvailableMentorsList, icon: require('../../assets/find_mentor.png') },
  // { name: 'Settings', component: SettingsScreen, icon: require('../../assets/settings.png') },
  // { name: 'Subscription', component: SubscriptionScreen, icon: require('../../assets/subscription.png') },
  { name: 'Start Your Journey', component: SuggestedServices, icon: require('../../assets/find_mentor.png') },
  { name: 'About', component: AboutScreen, icon: require('../../assets/about.png') },
  { name: 'Contact', component: ContactScreen, icon: require('../../assets/contact.png') },
  { name: 'Privacy Policy', component: PrivacyScreen, icon: require('../../assets/privacy.png') },
  { name: 'Terms of Service', component: TermsScreen, icon: require('../../assets/tos.png') },
  { name: 'Help', component: HelpScreen, icon: require('../../assets/help.png') },
  { name: 'Logout', component: TermsScreen, icon: require('../../assets/logout.png') },
];
