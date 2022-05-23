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
import searchScreen from "../search-screen/SearchScreen";
import Avatar from "../../../helpers/Avatar";
import GetUserView from "../../../helpers/GetUserView";

const HomeScreen = (props) => {
    const {navigation} = props
    const {user,userInfo,setThisUserData} = useContext(AppContext)
    const checkAndSetUserInfo = async ()=> {
        if ((!userInfo)||(userInfo.userId!==user.uid)) {
            // const _userInfo = await getUserById(user.uid)
            // if (_userInfo) {
            //     setUserInfo({
            //         ..._userInfo,
            //         userId:user.uid
            //     })
            // }
            await setThisUserData()
        }
    }
    useEffect(()=>{
        checkAndSetUserInfo()
    },[user])
    return (
        <View style={style.wrap}>
            <View style={style.top}>
                <View style={style.topHeader}>
                    <TouchableOpacity style={style.touchable} onPress={()=>{
                        navigation.navigate("ProfileScreen",userInfo)
                    }}>
                        {userInfo? userInfo.avatar ?
                            <Avatar size={30} url={userInfo.avatar} />
                            : <Icon style={style.topHeaderElement} name={'user'}/>
                            : <Icon style={style.topHeaderElement} name={'user'}/>
                        }
                        {/*<Icon style={style.topHeaderElement} name={'user'}/>*/}
                    </TouchableOpacity>
                    <View>
                        <Text style={style.headerText}>Chats</Text>
                    </View>
                    <TouchableOpacity style={style.touchable} onPress={()=>navigation.navigate('NewGroupScreen')}>
                        <Avatar size={30} url={"https://static.vecteezy.com/system/resources/thumbnails/000/550/535/small/user_icon_007.jpg"} />

                    </TouchableOpacity>
                </View>
            </View>
            <View style={{height: 3, backgroundColor: 'lightgrey'}}/>

            <TouchableOpacity style={style.userBtn} onPress={()=>{
                navigation.navigate("SearchOthers", searchScreen);
            }}>
                <View
                    style={style.buttonView}>
                    <Icon style={style.topHeaderElement} name={'search1'}/>
                    <Text style={style.buttonText}>Search</Text>
                </View>
            </TouchableOpacity>

            <View style={style.middle}>
                <RoomLists navigation={navigation}/>
            </View>
        </View>
    );
};
const style = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: GetUserView().background,
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
        color: 'black'
    },
    topHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
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

    },
    userBtn: {
        borderColor: '#666',
        borderWidth: 2,
        borderRadius: 100,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor: '#eeeeee'
    },
    buttonView: {
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 13,
        marginLeft: 10,
        color: 'black',
        opacity: 0.5,
    },
    touchable: {
        borderRadius: 100,
        backgroundColor: '#eee',
        padding: 5,
        margin: 10,
    },
})
export default HomeScreen
