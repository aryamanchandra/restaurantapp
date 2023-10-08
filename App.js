import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import Food from "./src/screens/Food";
import Filter from "./src/screens/Filter";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import Explore from "./src/screens/Explore";
import FeatherIcon from "react-native-vector-icons/Feather";
import Settings from "./src/screens/Settings";
import Ionicons from "react-native-vector-icons/Ionicons";


//Initializing navigation stack and bottom tabs
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Function for Bottom Tabs
const Main = () => {
  return (
    <Tab.Navigator
      style={styles.bottomBar}
      screenOptions={{
        tabBarStyle: {
          height: 50,
          backgroundColor: "#000",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#00ADB5",
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Icons
                name="home"
                size={30}
                color={tabInfo.focused ? "#00ADB5" : "#8e8e93"}
                style={styles.icons}
              />
            );
          },
        }}
        component={Home}
      />

      <Tab.Screen
        name="Explore"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <FeatherIcon
                name="search"
                size={28}
                color={tabInfo.focused ? "#00ADB5" : "#8e8e93"}
              />
            );
          },
        }}
        component={Explore}
      />
      <Tab.Screen
        name="Settings"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="settings-sharp"
                size={26}
                color={tabInfo.focused ? "#00ADB5" : "#8e8e93"}
              />
            );
          },
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={Main}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Food"
          component={Food}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Filter"
          component={Filter}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "#00ADB5",
  },
  bottomBar: {
    backgroundColor: "000",
    marginHorizontal: 0,
    marginVertical: 0,
  },
  icons: {
    padding: 0,
    margin: 0,
  },
});
