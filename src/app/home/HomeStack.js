import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";
import { createNewMessage, createNewRoomChat } from "../../helpers/firebase/databases/WriteData";
import { getCurrentDate } from "../../helpers/Dates/getCurrentDate";
import firestore from "@react-native-firebase/firestore";

const HomeStack = (props) => {
  const [data,setData] = useState([])
  const Stack = createNativeStackNavigator();
  const chatroom = 'Chatrooms'
  useEffect(() => {
    const subscriber = firestore()
      .collection(chatroom)
      .doc("gSKawbVoW8WfS6DlNlgu")
      .collection("message")
      .orderBy('createdTime','desc')
      .limit(4)
      // .get()
      // .then(querySnapshot => {
      //   console.log('Total users: ', querySnapshot.size);
      //
      //   querySnapshot.forEach(documentSnapshot => {
      //     console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      //   });
      // });
      .onSnapshot(function(querySnapshot) {
      var cities = [];
      querySnapshot.forEach(function(doc) {
        cities.push(doc.data().content);
      });
      setData(cities)
      console.log("Current cities in CA: ", cities.join(", "));
    });

    // Stop listening for updates when no longer required
    return () => subscriber();
  },[chatroom]);
  return (
    // <Stack.Navigator initialRouteName={""}>
    //   {/*here is homes screen...*/}
    //   <View>day la trang home</View>
    // </Stack.Navigator>
    <View><Text>day la trang home</Text>
      <Button title={"create room chat"} onPress={async () => {
        await createNewRoomChat([1, 2]);
      }} />
      <Button title={"create message"} onPress={async () => {
        const message = {
          type: "text",
          content: "Hello world!",
          createdTime: getCurrentDate(),
        };
        const chatRoomId = "gSKawbVoW8WfS6DlNlgu";
        await createNewMessage(chatRoomId, message);
      }} />
      {data.map((mes)=>{
        return(<Text>{mes}</Text>)
      })}
    </View>
  );
};
export default HomeStack;
