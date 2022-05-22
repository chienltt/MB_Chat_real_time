import React, {useContext} from "react";
import {View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import Avatar from "../../../../helpers/Avatar";
import AppContext from "../../../AppContext";
import {checkSeen} from "../../../../helpers/firebase/databases/WriteData";

const Room = (props) => {
    const {user,setIsChangeRoomList} = useContext(AppContext)
    const {navigation,getRoomList} = props
    const roomInfo = props.roomInfo;
    console.log('checked',roomInfo.isChecked.includes(user.uid))
    return (
        <TouchableOpacity style={style.wrap_box} onPress={() => {
            setIsChangeRoomList(true)
            checkSeen(roomInfo,user.uid,getRoomList)
            navigation.navigate('ChatScreen', roomInfo)
        }}>
            <View style={style.wrap}>
                <View style={style.avatar}>
                    <Avatar size={60} url={roomInfo.avatars[user.uid]}/>
                </View>
                <View style={style.info_wrap}>
                    <View style={style.info}>
                        <Text numberOfLines={1} style={style.name}>{roomInfo.name[user.uid]}</Text>
                        {roomInfo.lastMessage ? roomInfo.lastMessage.type === 'text' ?
                            <Text numberOfLines={1} style={roomInfo.isChecked.includes(user.uid)===true?style.message:style.message_bold}>{roomInfo.lastMessage.content}</Text> :
                            <Text numberOfLines={1} style={roomInfo.isChecked.includes(user.uid)===true?style.message:style.message_bold}>send a file</Text> : <Text>empty</Text>}
                    </View>
                </View>
            </View>
            <View style={{height: 3, backgroundColor: 'lightgrey'}}/>
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
        fontSize: 20,
    },
    info: {
        paddingBottom: 5,
        flex: 1,
        justifyContent: 'space-between'
    },
    message: {
        fontSize: 18,
        color: '#666'
    },
    message_bold:{
        fontSize: 18,
        color: '#000000',
        fontWeight:"700",
    },
    name: {
        fontSize: 20,
        fontWeight: "700",
        color: '#000000'
    }
});
export default Room;
