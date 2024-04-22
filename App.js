import 'react-native-gesture-handler';
import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button, Platform, TouchableOpacity } from "react-native";
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
import MyImovels from "./src/screens/MyImovels";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Onboard from "./src/screens/Onboard";
import Chat from "./src/screens/Chat";
import ChatTalk from "./src/screens/ChatTalk";
import { AlertNotificationRoot } from "react-native-alert-notification";
import AppNavigator from "./src/navigator/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={Store}>
        <AlertNotificationRoot>
          <AppNavigator />
        </AlertNotificationRoot>
      </Provider>
    </GestureHandlerRootView>
  );
}
