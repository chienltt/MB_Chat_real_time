import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import Register from "./components/Register"
const AuthStack = ()=>{
  const Stack = createNativeStackNavigator()
  return(
    <Stack.Navigator initialRouteName={'Login'}>
    {/*here is Login, Register screen...*/}
      <Stack.Screen name={'Login'} component={Login}/>
      <Stack.Screen name={'Register'} component={Register}/>
    </Stack.Navigator>
  )
}
export default AuthStack
