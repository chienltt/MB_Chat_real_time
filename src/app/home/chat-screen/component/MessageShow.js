import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Keyboard } from "react-native";
import Message from "./Message";
const MessageShow=(props)=>{
  const scrollViewRef = useRef();
  const {listMessages,roomInfo } = props
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      scrollViewRef.current.scrollToEnd({animated: true})
    });
    return () => {
      showSubscription.remove();
    };
  }, []);
  return(
    <ScrollView style={style.container}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
    >
      {listMessages.map((mes,index)=>{
        return(<Message key={index} messageInfo={mes} roomInfo={roomInfo}/>)
      })}
  </ScrollView>
  )
}
const style = StyleSheet.create({
  container:{
    height:'90%',
    // justifyContent:"flex-end",
    // flexDirection:"column-reverse"
  }
})
export default MessageShow
