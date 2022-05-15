import React, { useContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import LoadingScreen from "../helpers/Loading/LoadingScreen";
import AppContext from "./AppContext";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./home/HomeStack";
import AuthStack from "./auth/AuthStack";
const Routes = (props)=>{
  const {user,setUser} = useContext(AppContext)
  const [loading,setLoading] = useState(true)
  const [initializing,setInitializing]= useState(true)
  const onAuthStateChanged = (user)=>{
    setUser(user)
    if(initializing) setInitializing(false)
    setLoading(false)
  }
  useEffect(()=>{
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber;
  })
  if(loading) return <LoadingScreen/>
  return(
      <NavigationContainer>
        {<HomeStack/>}
      </NavigationContainer>
  )
}
export default Routes
