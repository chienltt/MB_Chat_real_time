import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Avatar from '../../../../helpers/Avatar';
// import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from 'react-native-vector-icons/AntDesign'
const NewGroupButton = (props) => {
    const {userSelected} = props
    return (
        <TouchableOpacity style={style.wrap_box} onPress={()=>{
            // navigation.navigate('ChatScreen',roomInfo)
        }}>
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
