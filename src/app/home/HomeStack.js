import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button,StyleSheet } from "react-native";
import { createNewMessage, createNewRoomChat } from "../../helpers/firebase/databases/WriteData";
import { getCurrentDate } from "../../helpers/Dates/getCurrentDate";
import firestore from "@react-native-firebase/firestore";
import AppContext from "../AppContext";
import Login from "../auth/components/Login";
import HomeScreen from "./home-screen/HomeScreen";
import ChatScreen from "./chat-screen/ChatScreen";
import ProfileScreen from "./home-screen/ProfileScreen";
import EditProfileScreen from "./home-screen/EditProfileScreen";

const HomeStack = (props) => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerShown :false}} initialRouteName={'ProfileScreen'}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen}/>
      <Stack.Screen name={'ChatScreen'} component={ChatScreen}/>
      <Stack.Screen name={'ProfileScreen'} component={ProfileScreen}/>
        <Stack.Screen name={'EditProfileScreen'} component={EditProfileScreen}/>

    </Stack.Navigator>
  );
};
export default HomeStack;
