import React, {useContext} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Avatar from '../../../../helpers/Avatar';
import avatar from '../../home-screen/image/avatar.png'
// import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from 'react-native-vector-icons/AntDesign'
import {createNewGroup} from "../../../../helpers/firebase/databases/WriteData";
import AppContext from "../../../AppContext";
import {getRoomChatsById} from "../../../../helpers/firebase/databases/ReadData";
const NewGroupButton = (props) => {
    const {userSelected,navigation} = props
    const {userInfo} =useContext(AppContext)
    if(userSelected.includes(userInfo)===false) userSelected.push(userInfo)
    const setNameGroupEachUser = (user)=>{
        let nameGroup=""
        userSelected.forEach((_user)=>{
            if(_user.userId !== user.userId) {
                nameGroup = nameGroup+_user.name+","
            }
        })
        return nameGroup.slice(0,-1)
    }
    const setNameGroup = ()=>{
        let nameGroup={}
        userSelected.forEach((_user)=>{
            nameGroup[_user.userId]= setNameGroupEachUser(_user)
        })
        return nameGroup
    }
    const setMembersGroup = ()=>{
        let members = []
        userSelected.forEach((_user)=>{
            members.push(_user.userId)
        })
        return members
    }
    const onPressCreateNewGroup =async ()=>{
        const newGroupData ={
            name:setNameGroup(),
            type:'group',
            members:setMembersGroup()
        }
        const newGroupStatus = await createNewGroup(newGroupData)
        if(newGroupStatus) {
            console.log('okok',newGroupStatus.id)
            const newGroup = await getRoomChatsById(newGroupStatus.id)
            if (newGroup) navigation.navigate('ChatScreen', newGroup)
        }
    }
    return (
        <TouchableOpacity style={style.wrap_box} onPress={()=>onPressCreateNewGroup()}>
            <View style={style.wrap}>
                <View style={style.avatar}>
                    <Avatar size={60} url={"https://static.vecteezy.com/system/resources/thumbnails/000/550/535/small/user_icon_007.jpg"} />
                </View>
                <View style={style.info_wrap}>
                    <View style={style.info}>
                        <Text numberOfLines={1} style={style.name}>Create new group</Text>
                    </View>
                    <Icon size={16} name={'right'}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const style = StyleSheet.create({
    wrap_box: {
        height: 50,
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
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:"center",
        fontSize:20,
    },
    info:{
        paddingVertical:5,
        marginLeft:10,
        flex:1,
        justifyContent:'center'
    },
    message:{
        fontSize:18,
        color:'#000000'
    },
    name:{
        fontSize:23,
        fontWeight:"700",
        color:'#000000'
    }
});

export default NewGroupButton
