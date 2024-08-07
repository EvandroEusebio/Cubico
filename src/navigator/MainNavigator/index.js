import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import InfoImovel from "../../components/InfoImovel";
import AddImovel from "../../screens/AddImovel";
import Chat from "../../screens/Chat";
import ChatTalk from "../../screens/ChatTalk";
import EditProfile from "../../screens/EditProfile";
import Favorite from "../../screens/Favorite";
import Home from "../../screens/Home";
import MarkDataCalendar from "../../screens/MarkDataCalendar";
import MyImovels from "../../screens/MyImovels";
import Profile from "../../screens/Profile";
import VisitAppointement from "../../screens/VisitAppointement";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const InfoImovelStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InfoImovel" component={InfoImovel} />
      <Stack.Screen
        name="ChatTalk"
        component={ChatTalk}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="VisitAppointment" component={MarkDataCalendar} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home02"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="InfoImovelStack" component={InfoImovelStack} options={{ headerShown: false }}/>
      
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatTalk"
        component={ChatTalk}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
};

const ScreenProfile = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MyImovels" component={MyImovels} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="MyInfoImovel" component={InfoImovel} options={{headerTitle: "Meus imóveis"}}/>
        <Stack.Screen name="UpdateMyImovel" component={AddImovel} />
        <Stack.Screen name="MyAppointment" component={VisitAppointement} />
        <Stack.Screen name="Favoritos" component={Favorite} />
      </Stack.Navigator>
    );
  };

export default function MainNavigator() {
  return (
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
          } else if (route.name === "VisitAppointement") {
            iconName = focused ? "walk" : "walk-outline";
          } else if (route.name === "Favoritos") {
            iconName = focused ? "heart" : "heart-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: getTabBarVisibility(route),
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
        component={Favorite}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="AddImovel"
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
        name="VisitAppointement"
        component={VisitAppointement}
        options={{ headerShown: true, tabBarLabel: "Visítas", headerTitle: "Visitas" }}
        
      />
      <Tab.Screen
        name="Perfil"
        component={ScreenProfile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}


const getTabBarVisibility = route => {
    //console.warn(route);
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    //console.warn(routeName);
  
    if( routeName === 'MyImovels' || routeName === 'MyInfoImovel' || routeName === 'UpdateMyImovel' || routeName === 'ChatTalk' || routeName === 'MyAppointment' ) {
      return 'none';
    }
    return 'flex';
};