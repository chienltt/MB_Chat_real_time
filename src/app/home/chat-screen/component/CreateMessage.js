import React, { useState } from "react";
import { TextInput, View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EmojiSelector from '@manu_omg/react-native-emoji-selector'
const CreateMessage =(props)=>{
  const [valueText,setValueText] = useState('')
  const onChangeMessage=(text)=>{
    setValueText(text)
    console.log("gia tri la:",text)
  }
  const onSubmitMessage = (event)=>{
    setValueText(event.nativeEvent.text)
    console.log("gia tri la:",value.nativeEvent.text)
  }
  return(
    <View style={style.component}>
      <TouchableOpacity><FontAwesomeIcon size={28} color={'#6AF111'} name={'folder'}/></TouchableOpacity>
      <TouchableOpacity><FontAwesomeIcon size={28} color={'#6AF111'} name={'camera'}/></TouchableOpacity>
      <TextInput
        value={valueText}
        style={style.text_input}
        placeholder={'Aa'}
        onChangeText={(text)=>{onChangeMessage(text)}}
      />
      {/*<EmojiSelector*/}
      {/*  onEmojiSelected={emoji => console.log(emoji)}*/}
      {/*  style={style.text_input}*/}
      {/*  placeholder={'Aa'}*/}
      {/*/>*/}
      <TouchableOpacity><MaterialIcons size={28} color={'#6AF111'} name={'emoji-emotions'}/></TouchableOpacity>
      <TouchableOpacity><IonIcon size={28} color={'#6AF111'} name={'send'}/></TouchableOpacity>
    </View>
  )
}
const style = StyleSheet.create({
  component:{
    flex:10,
    width:'100%',
    height:50,
    backgroundColor:'#685F56',
    alignItems:"center",
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  text_input:{
    fontSize:15,
    width:'50%',
    backgroundColor:'#ffffff',
    borderRadius:15,
    paddingLeft:10
  }
})
export default CreateMessage
