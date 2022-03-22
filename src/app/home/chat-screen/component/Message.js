import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Avatar from "../../../../helpers/Avatar";
const Message=(props)=>{
  const [timeVisible,setTimeVisible] = useState(false)
  const {messageInfo,roomInfo} = props
  return(
    messageInfo.quickUpdated === true?
      <View></View>:
      <View style={messageInfo.isOwn === false ? style.wrap_notOwn:style.wrap_Own}>
        <Avatar size={40} url={roomInfo.avatar}/>
        {
          messageInfo.type==='text'?
            <TouchableOpacity style={style.text_message_wrap} onPress={()=>{
            setTimeVisible(!timeVisible)}
            }>
              {timeVisible===true?<Text style={{color:'#ffffff'}}> {messageInfo.createdTime} </Text>:<View/>}
              <Text style={style.text_message}>
                {messageInfo.content}
              </Text>
            </TouchableOpacity>
            : <View></View>
        }
      </View>
  )
}
const style=StyleSheet.create({
  wrap_notOwn:{
    width:'100%',
    flexDirection:"row",
    alignItems:'center',
    paddingLeft:5,
    paddingVertical:10,
  },
  wrap_Own:{
    width:'100%',
    flexDirection:'row-reverse',
    alignItems:'center',
    paddingLeft:5,
    paddingVertical:10,
  },
  text_message_wrap:{
    maxWidth:'45%',
    marginHorizontal:5,
  },
  text_message:{
    width:'100%',
    color:'#FFFFFF',
    fontSize:20,
    paddingVertical:3,
    paddingHorizontal:6,
    backgroundColor:'#2D2A27',
    borderRadius:10,
  }
})
export default Message
