import React from "react";
import { Image,StyleSheet } from "react-native";
const Avatar = (props)=>{
  const {url,size}= props
  const style = StyleSheet.create({
    container: {
      width:size,
      height:size,
      borderRadius:size/2
    }
  })
  return(
    <Image source={{uri:url}} style={style.container}/>
  )
}
export default Avatar
