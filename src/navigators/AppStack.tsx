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
import TodayScreen from '../modules/Today/TodayView';
import TodoScreen from '../modules/Todo/TodoListScreen';
import ServicesHomeScreen from '../modules/ServicesHome/ServicesHomeScreen';
import TodoDetailsScreen from '../modules/Todo/TodoDetailScreen';
import AddTodo from '../modules/Todo/AddTodo';


const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                   headerShown: false,
                }}
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
                       <Stack.Screen
                name="TodoDetails"
                component={TodoDetailsScreen}
                options={{
                    title: 'Todo Details',
                    ...primaryHeaderOptions,
                }}
            />
            <Stack.Screen
                name="AddTodo"
                component={AddTodo}
                options={{
                    title: 'Add Todo Details',

                    ...primaryHeaderOptions,
                }}
            />

            <Stack.Screen
                name="Today"
                component={TodayScreen}
                options={{
                    title: 'Today',
                    ...primaryHeaderOptions,
                }}
            />

            <Stack.Screen name="Todo" component={TodoScreen} options={{
                headerShown: false,
                title: 'Todo',
                ...primaryHeaderOptions,
            }} />
            <Stack.Screen name="Services" component={ServicesHomeScreen} options={{
                headerShown: false,
                title: 'Services',
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
