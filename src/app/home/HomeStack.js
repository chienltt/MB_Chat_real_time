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

const HomeStack = (props) => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerShown :false}} initialRouteName={'HomeScreen'}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen}/>
      <Stack.Screen name={'ChatScreen'} component={ChatScreen}/>
    </Stack.Navigator>
  );
};
export default HomeStack;
