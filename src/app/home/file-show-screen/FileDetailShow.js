import React from "react";
import { View, StyleSheet, Image } from "react-native";
import VideoPlayer from "react-native-video-player";

const FileDetailShow = (props) => {
  const { route, navigation } = props;
  const messageInfo = route.params;
  return (
    <View style={style.container}>
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
  },
  image_message:{
    width: "100%",
    height: "100%",
    resizeMode: 'stretch'
  }
});

export default FileDetailShow;
