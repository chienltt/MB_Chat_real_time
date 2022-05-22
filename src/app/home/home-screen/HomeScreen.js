import React, {useContext, useEffect, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {View, Text, Button, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {createNewMessage, createNewRoomChat} from "../../helpers/firebase/databases/WriteData";
import {getCurrentDate} from "../../helpers/Dates/getCurrentDate";
import firestore from "@react-native-firebase/firestore";
import Icon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from "react-native-vector-icons/Entypo";
import AppContext from "../../AppContext";
import RoomLists from "./component/RoomLists";
import {getUserById} from "../../../helpers/firebase/databases/ReadData";

const HomeScreen = (props) => {
    const {navigation} = props
    const {user,userInfo,setUserInfo} = useContext(AppContext)
    const checkAndSetUserInfo = async ()=> {
        if ((!userInfo)||(userInfo.userId!==user.uid)) {
            const _userInfo = await getUserById(user.uid)
            if (_userInfo) {
                setUserInfo({
                    ..._userInfo,
                    userId:user.uid
                })
            }
        }
    }
    useEffect(()=>{
        checkAndSetUserInfo()
    },[user])
    return (
        <View style={style.wrap}>
            <View style={style.top}>
                <View style={style.topHeader}>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate("ProfileScreen",userInfo)
                    }}>
                        <Icon style={style.topHeaderElement} name={'user'}/>
                    </TouchableOpacity>
                    {/*<Text style={style.topHeaderElement} >Chat room</Text>*/}
                    <Button style={style.topHeaderElement} title={'tim kiem ...'}
                            onPress={() => navigation.navigate('SearchOthers')}/>
                    <TouchableOpacity onPress={()=>navigation.navigate('NewGroupScreen')}>
                      <EntypoIcon style={style.topHeaderElement} name={'new-message'} />
                    </TouchableOpacity>
                </View>
                {/*<View style={style.topSearchSection}>*/}
                {/*  <Icon style={{padding:10}} name={'search1'}/>*/}
                {/*  <TextInput*/}
                {/*    placeholder="search"*/}
                {/*    // keyboardType="numeric"*/}
                {/*  />*/}
                {/*</View>*/}
            </View>
            <View style={style.middle}>
                <RoomLists navigation={navigation}/>
            </View>
        </View>
    );
};
const style = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#550066'
    },
    top: {
        flex: 1,
        // backgroundColor:"#ff6d6d"
    },
    middle: {
        flex: 12,
        backgroundColor: "#f2f2f2"
    },
    topHeaderElement: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    topHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topSearchSection: {
        flex: 1,
        minHeight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    topSearchSectionInput: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',

    }
})
export default HomeScreen
