import React, {useContext, useEffect, useState} from "react";
import {Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, Keyboard, Alert} from "react-native";
import Avatar from "../../../helpers/Avatar";
import Icon from 'react-native-vector-icons/AntDesign'
import MessageShow from "./component/MessageShow";
import CreateMessage from "./component/CreateMessage";
import AppContext from "../../AppContext";
import {getMessages, getMessagesRealtime} from "../../../helpers/firebase/databases/ReadData";
import moment from "moment";
import firestore from "@react-native-firebase/firestore";
import GetUserInGroup from "./component/GetUserInGroup";

const ChatScreen = (props) => {
    const {user} = useContext(AppContext)
    const roomInfo = props.route.params
    const {navigation} = props
    const [messageShowSize, setMessageShowSize] = useState(8)
    const [listMessages, setListMessages] = useState([])
    const [messageRealtime, setMessageRealtime] = useState()
    const roomId = roomInfo.roomId
    let initStateData = true
    useEffect(() => {
        const getListMessagesInit = async () => {
            const data = await getMessages(roomId)
            const listMessages = data.map(message => {
                const date = message.createdTime.toDate()
                const createdTime = moment(date)
                message.createdTimeFormated = createdTime.format('MM/DD HH:MM:ss')
                message.user === user.uid ? message.isOwn = true : message.isOwn = false
                return message
            })
            setListMessages(listMessages)
        }
        getListMessagesInit()
    }, [])

    useEffect(() => {
        if (roomInfo.type === "basic")
            if (roomInfo.status === "block")
                Alert.alert("you  can't message this person!")
    }, [])

    useEffect(() => {
        // if (Object.keys(listMessages).length!==0) {
        const getListMessagesRealtime = async () => {
            let data = []
            // const data = await getMessagesRealtime(roomId)
            await firestore()
                .collection("Chatrooms")
                .doc(roomId)
                .collection("message")
                .orderBy("createdTime", "desc")
                .limit(1)
                .onSnapshot(function (querySnapshot) {
                    console.log('khoi tao la', initStateData)
                    if (initStateData === true) {
                        initStateData = false
                        return;
                    }
                    querySnapshot.forEach(function (doc) {
                        data.push(doc.data());
                    });
                    console.log('du lieu realtime la', data[data.length - 1])
                    const message = data[data.length - 1]
                    const date = message.createdTime.toDate()
                    const createdTime = moment(date)
                    message.createdTimeFormated = createdTime.format('MM/DD HH:MM:ss')
                    message.user === user.uid ? message.isOwn = true : message.isOwn = false
                    setMessageRealtime(message)
                });
        }
        getListMessagesRealtime()
        // }
    }, [roomId])
    useEffect(() => {
        if (messageRealtime) setListMessages((prev) => [...prev, messageRealtime])
    }, [messageRealtime])

    const addUserToGroup = async () => {
        const data = await GetUserInGroup(roomInfo)
        navigation.navigate('NewGroupScreen', {
            selectedUser: data,
            mode: "update",
            roomId: roomInfo.roomId
        })
    }
    return (
        <View style={style.container}>
            <View style={style.header_wrap}>
                {/*<View style={style.header_wrap}>*/}
                <View style={style.header_left}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon size={25} style={style.icon_goback} name={'left'}/>
                    </TouchableOpacity>
                    <View><Avatar size={50}
                                  url={roomInfo.type === "basic" ? roomInfo.avatars[user.uid] : roomInfo.avatar}/></View>
                    <Text style={style.room_name}>{roomInfo.name[user.uid]} </Text>
                    {/*</View>*/}
                </View>
                {roomInfo.type === "group" ? <TouchableOpacity onPress={() => addUserToGroup()}>
                    <Icon size={27} style={style.header_update_group} name={'adduser'}/>
                </TouchableOpacity> : <View/>}
            </View>

            <View style={[style.message_show]}>
                <MessageShow navigation={navigation} listMessages={listMessages} setListMessages={setListMessages}
                             roomInfo={roomInfo}/>
            </View>
            {roomInfo.type === 'basic' ? roomInfo.status === "active" ? <CreateMessage roomInfo={roomInfo}/> : <View/> :
                <CreateMessage roomInfo={roomInfo}/>}
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: '100%',
        backgroundColor: '#fff'
    },
    header_wrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        height: 20,
        minHeight: 10,
        backgroundColor: '#2E8C2E',
        justifyContent:"space-between",
        paddingRight:20
    },
    header_left: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        // height: 20,
        // minHeight: 10,
        // backgroundColor: '#2E8C2E',
    },
    header_update_group: {

        fontWeight: "800",
        color: "#fff"
    }
    ,
    message_show: {
        flex: 8,
    },
    icon_goback: {
        paddingRight: 5,
    },
    avatar: {
        paddingHorizontal: 10
    },
    room_name: {
        paddingHorizontal: 20,
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff'
    }
})
export default ChatScreen
