import React from "react";
import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'


const LoadingScreen = (props)=>{
  return(
    <View style={{flex: 1, alignItems: 'center',
        justifyContent: 'center',}}>
      <Text style={{fontSize: 30}}>Loading</Text>
        <Icon style={{fontSize: 30, marginTop: 10}} name={'loading1'}/>
    </View>
  )
}
export default LoadingScreen
