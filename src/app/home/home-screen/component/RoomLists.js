import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import Room from "./Room";
import AppContext from "../../../AppContext";
import {getListUserRoomChats} from "../../../../helpers/firebase/databases/ReadData";
import firestore from "@react-native-firebase/firestore";

const RoomLists = (props) => {
    const {navigation} = props
    const {user,userInfo} = useContext(AppContext)
    const [roomList, setRoomList] = useState([])
    const getUserRoomList = async () => {
        // if(isChangeRoomList===true) {
            const _data = await getListUserRoomChats(user.uid)
            if (_data) setRoomList(_data)
        //     setIsChangeRoomList(false)
        // }
    }
    useEffect(()=>{
        getUserRoomList()
    },[userInfo])

    useEffect(() => {
        const getRoomListRealTime = async ()=>{
            let data= []
            await firestore()
                .collection('Chatrooms')
                .orderBy("updateTime", "desc")
                .limit(1)
                .onSnapshot((querySnapshot)=> {
                    // console.log('du lieu vao')
                    // querySnapshot.forEach(function (doc) {
                    //     data.push(doc.data());
                    //     console.log('du lieu',doc.data())
                    // });
                    console.log('co thay doi')
                    getUserRoomList()
                })
        }
        getRoomListRealTime()
    },[user.uid])

    return (
        <ScrollView style={style.component}>
            {roomList ? roomList.map((room, index) => {
                return <Room navigation={navigation} key={index} roomInfo={room} getRoomList={getUserRoomList}/>
            }) : <View/>}
        </ScrollView>
    )
}
const style = StyleSheet.create({
    component: {
        paddingVertical: 5,
        paddingHorizontal: 3,
        backgroundColor: '#fff'
    }
})
export default RoomLists
