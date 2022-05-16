import React, { useContext, useState } from "react";
import { TextInput, View, StyleSheet, Button, TouchableOpacity, Text, Keyboard } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EmojiSelector from "@manu_omg/react-native-emoji-selector";
import moment from "moment";
import { getMessages } from "../../../../helpers/firebase/databases/ReadData";
import AppContext from "../../../AppContext";
import { createNewMessage } from "../../../../helpers/firebase/databases/WriteData";
import { ChooseFileLaunchCamera, ChooseFileLaunchLibrary } from "../../../../helpers/ChooseFile";

const CreateMessage = (props) => {
  const { user } = useContext(AppContext);
  const { setListMessages, listMessages } = props;
  const [valueText, setValueText] = useState("");
  const onChangeMessage = (text) => {
    setValueText(text);
  };
  const onSubmitMessage = async () => {
    if (valueText !== "") {
      const now = new Date();
      const newMessage = {
        content: valueText,
        createdTime: now,
        type: "text",
        user: user.uid,
      };
      createNewMessage("gSKawbVoW8WfS6DlNlgu", newMessage);
      setValueText("");
      Keyboard.dismiss();
      // const newListMessage = [...listMessages];
      // newListMessage.push(newMessage);
      // setListMessages(newListMessage);
      // const realListMessages = await getMessages("gSKawbVoW8WfS6DlNlgu");
      // console.log("gia tri la:", newMessage.createdTime);
    }
  };
  const onSubmitImageMessage = async (url) => {
    const now = new Date();
    const newMessage = {
      content: url,
      createdTime: now,
      type: "image",
      user: user.uid,
    };
    await createNewMessage("gSKawbVoW8WfS6DlNlgu", newMessage);
  };
  const onSubmitVideoMessage = async (url) => {
    const now = new Date();
    const newMessage = {
      content: url,
      createdTime: now,
      type: "video",
      user: user.uid,
    };
    await createNewMessage("gSKawbVoW8WfS6DlNlgu", newMessage);
  };
  return (
    <View style={style.component}>
      <TouchableOpacity onPress={async () => {
        const { url, response } = await ChooseFileLaunchLibrary();
        console.log("response", response);
        if (response.assets[0].type === "image/jpeg")
          await onSubmitImageMessage(url);
        else if (response.assets[0].type === "video/mpeg")
          await onSubmitVideoMessage(url);
      }}><FontAwesomeIcon size={28} color={"#6AF111"} name={"folder"} /></TouchableOpacity>
      <TouchableOpacity onPress={async () => {
        const url = await ChooseFileLaunchCamera();
        await onSubmitImageMessage(url);
      }
      }><FontAwesomeIcon size={28} color={"#6AF111"} name={"camera"} /></TouchableOpacity>
      <TextInput
        value={valueText}
        style={style.text_input}
        placeholder={"Aa"}
        onChangeText={(text) => {
          onChangeMessage(text);
        }}
      />
      <TouchableOpacity onPress={() => onSubmitMessage()}><IonIcon size={28} color={"#6AF111"}
                                                                   name={"send"} /></TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  component: {
    flex: 1,
    width: "100%",
    height: 50,
    backgroundColor: "#685F56",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  text_input: {
    fontSize: 15,
    width: "50%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingLeft: 10,
  },
});
export default CreateMessage;
