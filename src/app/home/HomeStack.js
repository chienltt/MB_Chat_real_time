import React, {useContext, useEffect, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {View, Text, Button, StyleSheet} from "react-native";
import {createNewMessage, createNewRoomChat} from "../../helpers/firebase/databases/WriteData";
import {getCurrentDate} from "../../helpers/Dates/getCurrentDate";
import firestore from "@react-native-firebase/firestore";
import AppContext from "../AppContext";
import Login from "../auth/components/Login";
import HomeScreen from "./home-screen/HomeScreen";
import ChatScreen from "./chat-screen/ChatScreen";
import FileDetailShow from "./file-show-screen/FileDetailShow";
import SearchScreen from "./search-screen/SearchScreen";
import NewGroupScreen from "./new-group-screen/NewGroupScreen";
import ProfileScreen from "./home-screen/ProfileScreen";
import EditProfileScreen from "./home-screen/EditProfileScreen";

const HomeStack = (props) => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={'HomeScreen'}>
            <Stack.Screen name={'HomeScreen'} component={HomeScreen}/>
            <Stack.Screen name={'ChatScreen'} component={ChatScreen}/>
            <Stack.Screen name={'FileShowScreen'} component={FileDetailShow}/>
            <Stack.Screen name={'SearchOthers'} component={SearchScreen}/>
            <Stack.Screen name={'NewGroupScreen'} component={NewGroupScreen}/>
            <Stack.Screen name={'ProfileScreen'} component={ProfileScreen}/>
            <Stack.Screen name={'EditProfileScreen'} component={EditProfileScreen}/>
        </Stack.Navigator>
    );
};
export default HomeStack;
