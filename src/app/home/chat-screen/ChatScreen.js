import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import Avatar from "../../../helpers/Avatar";
import Icon from 'react-native-vector-icons/AntDesign'
import MessageShow from "./component/MessageShow";
import CreateMessage from "./component/CreateMessage";
const listMessages =[
  {
    content:'Chao ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'Tai sao ban chao minh',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Vi minh thich ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'lam nguoi yeu minh nhe',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'oke',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Chao ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'Tai sao ban chao minh',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Vi minh thich ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'lam nguoi yeu minh nhe',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'oke',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Chao ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'Tai sao ban chao minh',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Vi minh thich ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'lam nguoi yeu minh nhe',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'oke',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Chao ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'Tai sao ban chao minh',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Vi minh thich ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'lam nguoi yeu minh nhe',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'oke',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Chao ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'Tai sao ban chao minh',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Vi minh thich ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'Chao ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'Tai sao ban chao minh',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Vi minh thich ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'lam nguoi yeu minh nhe',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'oke',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Chao ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'Tai sao ban chao minh',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Vi minh thich ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'lam nguoi yeu minh nhe',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'oke',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Chao ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'Tai sao ban chao minh',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Vi minh thich ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'lam nguoi yeu minh nhe',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'oke',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Chao ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'Tai sao ban chao minh',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },
  {
    content:'Vi minh thich ban',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'lam nguoi yeu minh nhe',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:false
  },
  {
    content:'oke',
    createdTime :'2022/01/01 14:04:03',
    type:'text',
    isOwn:true
  },


]

const ChatScreen = (props)=>{
  const roomInfo = props.route.params
  const {navigation}=props
  const [messageShowSize, setMessageShowSize] = useState(8)

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setMessageShowSize(8)
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setMessageShowSize(8)
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return(
    <View style={style.container}>
      <View style={style.header}>
        {/*<View style={style.header_wrap}>*/}
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Icon size={25} style={style.icon_goback} name={'left'}/>
        </TouchableOpacity>
        <View><Avatar size={50} url={roomInfo.avatar} /></View>
        <Text style={style.room_name} >{roomInfo.name} </Text>
        {/*</View>*/}
      </View>
      <View style={[style.message_show]}>
        <MessageShow listMessages={listMessages} roomInfo={roomInfo}/>
      </View>
      <CreateMessage/>
    </View>
  )
}
const style  = StyleSheet.create({
  container:{
    flex:1,
    minHeight:'100%',
    backgroundColor:'#000000'
  },
  header:{
    flex:1,
    flexDirection:'row',
    alignItems:"center",
    height:20,
    minHeight:10,
    backgroundColor:'#2E8C2E',
  },
  header_wrap:{
    height:'100%',
    width:'100%',
    flexDirection:'row',
    alignItems:"center",
    // height:20,
    minHeight:60,
    paddingHorizontal:5,
    backgroundColor:'#2E8C2E',
  },
  message_show:{
    flex:1,
  },
  icon_goback:{
    paddingRight:5,
  },
  avatar:{
    paddingHorizontal:10
  },
  room_name:{
    paddingHorizontal:20,
    fontSize:20,
    fontWeight:'700',
    color:'#ffffff'
  }
})
export default ChatScreen
