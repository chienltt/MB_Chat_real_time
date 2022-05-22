import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import Avatar from "../../../../helpers/Avatar";
import Video from "react-native-video";
import VideoShow from "./VideoShow";

const Message = (props) => {
  const [timeVisible, setTimeVisible] = useState(false);
  const { messageInfo, roomInfo,navigation } = props;
  return (
    messageInfo.quickUpdated === true ?
      <View></View> :
      <View style={messageInfo.isOwn === false ? style.wrap_notOwn : style.wrap_Own}>
        <Avatar size={40} url={roomInfo.avatar} />
        {
          messageInfo.type === "text" ?
            <TouchableOpacity style={style.text_message_wrap} onPress={() => {
              setTimeVisible(!timeVisible);
            }
            }>
              {timeVisible === true ? <Text style={{ color: "#ffffff" }}> {messageInfo.createdTimeFormated} </Text> :
                <View />}
              <Text style={[style.text_message, messageInfo.isOwn === false ? style.text_message_notOwn : style.text_message_own]}>
                {messageInfo.content}
              </Text>
            </TouchableOpacity>
            : messageInfo.type === "image" ?
              <TouchableOpacity style={style.image_message_wrap} onPress={() => {
                navigation.navigate('FileShowScreen',messageInfo)
              }
              }>
                {/*{timeVisible === true ? <Text style={{ color: "#ffffff" }}> {messageInfo.createdTimeFormated} </Text> :*/}
                {/*  <View />}*/}
                <Image style={style.image_message} source={{ uri: messageInfo.content }} />
              </TouchableOpacity> : messageInfo.type === "video" ?
                <TouchableOpacity style={style.image_message_wrap} onPress={() => {
                  setTimeVisible(!timeVisible);
                }
                }>
                  {/*{timeVisible === true ? <Text style={{ color: "#ffffff" }}> {messageInfo.createdTimeFormated} </Text> :*/}
                  {/*  <View />}*/}
                  <VideoShow messageInfo={messageInfo} navigation={navigation}/>
                </TouchableOpacity> : <View></View>
        }
      </View>
  );
};
const style = StyleSheet.create({
  wrap_notOwn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingVertical: 10,
  },
  wrap_Own: {
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingLeft: 5,
    paddingVertical: 10,
  },
  text_message_wrap: {
    maxWidth: "45%",
    marginHorizontal: 5,
  },
  text_message: {
    width: "100%",
    fontSize: 20,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  text_message_own: {
    backgroundColor: "#3c6bff",
    color: "#fff",
  },
  text_message_notOwn: {
    color: "black",
    backgroundColor: "lightgrey",
  },
  image_message_wrap: {
    width: "45%",
    marginHorizontal: 5,
    flexDirection: "row-reverse",
  },
  image_message: {
    width: 200,
    aspectRatio:3/2,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
});
export default Message;
