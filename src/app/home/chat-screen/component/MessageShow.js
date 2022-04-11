import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, Keyboard } from "react-native";
import Message from "./Message";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import AppContext from "../../../AppContext";

const MessageShow = (props) => {
  // const {user}=useContext(AppContext)
  const scrollViewRef = useRef();
  const { listMessages, roomInfo,navigation } = props;
  let isFirstRender = true
  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
  //     scrollViewRef.current.scrollToEnd({animated: true})
  //   });
  //   return () => {
  //     showSubscription.remove();
  //   };
  // }, []);
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [listMessages]);

  return (
    <ScrollView style={style.container}
                ref={scrollViewRef}
                onContentSizeChange={() => {
                  if (isFirstRender  === true)
                    scrollViewRef.current.scrollToEnd({ animated: true });
                  isFirstRender =false;
                }}
    >
      {listMessages !== undefined ? listMessages.map((mes, index) => {
        return (<Message navigation={navigation} key={index} messageInfo={mes} roomInfo={roomInfo} />);
      }) : <View></View>}
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    height: "90%",
    // justifyContent:"flex-end",
    // flexDirection:"column-reverse"
  },
});
export default MessageShow;
