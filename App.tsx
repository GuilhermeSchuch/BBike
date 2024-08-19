import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { registerRootComponent } from 'expo';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import { HomeScreen, SettingsScreen } from "@screens";

// Icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

// Utils
import { lightTheme } from 'src/utils/theme';

// Redux
import { store } from "./src/app/store";
import { Provider } from "react-redux";

const { width, height } = Dimensions.get('window');

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarStyle: {backgroundColor: lightTheme.secondaryColor},
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => (
                <Entypo
                  name="home"
                  size={width / 10}
                  color={focused ? lightTheme.tertiaryColor  : lightTheme.primaryColor}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerShown: false,
              tabBarStyle: {backgroundColor: lightTheme.secondaryColor},
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => (
                <MaterialIcons
                  name="settings"
                  size={width / 10}
                  color={focused ? lightTheme.tertiaryColor  : lightTheme.primaryColor}
                />
              )
            }}
          />
        </Tab.Navigator>

        <StatusBar style='auto' />
      </NavigationContainer>
    </Provider>
  );
}

registerRootComponent(App);