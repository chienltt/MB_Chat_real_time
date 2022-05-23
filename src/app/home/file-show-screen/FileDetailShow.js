import React from "react";
import {View, StyleSheet, Image, TouchableOpacity} from "react-native";
import VideoPlayer from "react-native-video-player";
import Icon from "react-native-vector-icons/AntDesign";

const FileDetailShow = (props) => {
  const { route, navigation } = props;
  const messageInfo = route.params;
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.icon_goback} onPress={() => navigation.goBack()}>
        <Icon size={25} color={"#ffffff"} name={'left'}/>
      </TouchableOpacity>
      {messageInfo.type === "image" ?
        <Image style={style.image_message} source={{ uri: messageInfo.content }} /> :
        <VideoPlayer
          video={{ uri: messageInfo.content }}
          // videoWidth={600}
          // videoHeight={400}
        />
      }
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // backgroundColor:'#000000',
    // justifyContent:"center",
    backgroundColor: "#5F5F5D",
    justifyContent: "center",
    position:"relative"
  },
  image_message:{
    width: "100%",
    height: "100%",
    resizeMode: 'stretch'
  },
  icon_goback:{
    height:30,
    position:"absolute",
    left:10,
    top:10,
    zIndex:10,
  }
});

export default FileDetailShow;
