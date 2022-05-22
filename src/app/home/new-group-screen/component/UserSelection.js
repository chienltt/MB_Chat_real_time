import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Avatar from "../../../../helpers/Avatar";
import Icon from "react-native-vector-icons/FontAwesome";

const UserSelection=(props)=>{
    const {unSelectUser,selectUser} = props
    const userInfo = props.userInfo;
    const [isSelected,setIsSelected] = useState(userInfo.selected)

    const onClickUser = ()=>{
        userInfo.selected=!userInfo.selected
        if(isSelected=== true) unSelectUser(userInfo)
        else selectUser(userInfo)
        setIsSelected(prev=> !prev)
    }

    return (
        <TouchableOpacity style={style.wrap_box} onPress={()=>onClickUser()}>
            <View style={style.wrap}>
                <View style={style.avatar}>
                    <Avatar size={60} url={userInfo.avatar} />
                </View>
                <View style={style.info_wrap}>
                    <View style={style.info}>
                        <Text numberOfLines={1} style={style.name}>{userInfo.name}</Text>
                    </View>
                    {isSelected?<Icon size={30} name={'check-circle'}/>:<View/>}
                </View>
            </View>
            <View style={{height: 3, backgroundColor: 'lightgrey'}}/>

        </TouchableOpacity>
    );
}
const style = StyleSheet.create({
    wrap_box: {
        height: 80,
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
        fontSize:20,
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center"
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
export default UserSelection
