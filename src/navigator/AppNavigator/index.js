import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from '../AuthNavigator';
import MainNavigator from '../MainNavigator';
import { useSelector } from "react-redux";
import Filter from '../../screens/Filter';


export default function AppNavigator() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    return (
        <NavigationContainer>
            {
                isAuthenticated ? (
                    <MainNavigator/>
                ) : (
                    
                    <AuthNavigator/>
                )
                
            }
        </NavigationContainer>
    )
}
