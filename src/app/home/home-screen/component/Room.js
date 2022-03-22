import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Avatar from "../../../../helpers/Avatar";

const Room = (props) => {
  const {navigation} = props
  const roomInfo = props.roomInfo;
  // console.log("da vao",roomInfo.avatar)
  return (
    <TouchableOpacity style={style.wrap_box} onPress={()=>{
      navigation.navigate('ChatScreen',roomInfo)
    }}>
      <View style={style.wrap}>
        <View style={style.avatar}>
          <Avatar size={60} url={roomInfo.avatar} />
        </View>
        <View style={style.info_wrap}>
          <View style={style.info}>
            <Text numberOfLines={1} style={style.name}>{roomInfo.name}</Text>
            <Text numberOfLines={1} style={style.message}>{roomInfo.last_message}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  wrap_box: {
    height: 70,
    // backgroundColor: "#ff6d6d",
    padding: 5,
    marginBottom: 5,
  },
  wrap: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "#ff6d6d",
  },
  avatar: {
    flex: 1,
    // height: "100%",
    // backgroundColor:"#ff6d6d",
  },
  info_wrap: {
    flex: 5,
    // backgroundColor:"#75FF33",
    fontSize:20,
  },
  info:{
    paddingVertical:5,
    flex:1,
    justifyContent:'space-between'
  },
  message:{
    fontSize:18,
    color:'#000000'
  },
  name:{
    fontSize:20,
    fontWeight:"700",
    color:'#000000'
  }
});
export default Room;
