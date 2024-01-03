import "react-native-gesture-handler";
import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button, Platform } from "react-native";
import Login from "./src/screens/Login";
import { Provider } from "react-redux";
import { Store } from "./src/features/store";
import SignUp from "./src/screens/SignUp";
import Teste from "./src/screens/Teste";
import Home from "./src/screens/Home";
import AddImovel from "./src/screens/AddImovel";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from "./src/screens/Profile";
import EditProfile from "./src/screens/EditProfile";
import Map from "./src/components/Map";
import InfoImovel from "./src/components/InfoImovel";
import { createStackNavigator } from "@react-navigation/stack";
import MarkDataCalendar from "./src/screens/MarkDataCalendar";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import axios from "axios";
import API_URL from "./config/api";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notification

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home02"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="InfoImovel" component={InfoImovel} />
      <Stack.Screen name="VisitAppointment" component={MarkDataCalendar} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "add-circle" : "add-circle-outline";
              } else if (route.name === "Perfil") {
                iconName = focused ? "person-circle" : "person-circle-outline";
              } else if (route.name === "Chat") {
                iconName = focused ? "chatbubbles" : "chatbubbles-outline";
              } else if (route.name === "Favoritos") {
                iconName = focused ? "heart" : "heart-outline";
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              borderTopColor: "transparent",
              backgroundColor: "#000",
              paddingBottom: 5,
              paddingTop: 5,
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Favoritos"
            component={Login}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Settings"
            component={AddImovel}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    top: Platform.OS === "ios" ? -10 : -15,
                    width: 50,
                    height: 50,
                    borderRadius: Platform.OS === "ios" ? 25 : 30,
                    backgroundColor: focused ? "#000" : "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: focused ? "#fff" : "#000",
                  }}
                >
                  <Ionicons
                    name="add"
                    size={30}
                    color={focused ? "#fff" : "#000"}
                  />
                </View>
              ),
              tabBarIconStyle: {},
              tabBarLabel: "",
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Chat"
            component={InfoImovel}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Perfil"
            component={EditProfile}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      
    </Provider>
  );
}

/*

*/
