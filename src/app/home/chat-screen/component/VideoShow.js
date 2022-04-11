import React, { useState } from "react";
import Video from "react-native-video";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
const VideoShow = (props)=>{
  const {navigation,messageInfo} = props
  const [isPlay,setIsPlay] = useState(false)
  return(
    <TouchableOpacity onPress={()=>{navigation.navigate('FileShowScreen',messageInfo)}}>
      <Video
        source={{uri:messageInfo.content}}
        style={style.container}
        paused={isPlay}
        muted={true}
        repeat={true}
      />
    </TouchableOpacity>
  )
}
const style = StyleSheet.create({
  container:{
    width: 200,
    aspectRatio:3/2,
    // height:null,
    // resizeMode:'contain',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 10,
  }
})
export default VideoShow
