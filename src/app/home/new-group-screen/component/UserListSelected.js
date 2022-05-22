import React from "react";
import {ScrollView, Text, View, StyleSheet} from "react-native";
import UserSelection from "./UserSelection";

const UserListSelected = (props) => {
    const {navigation, selectUser, unSelectUser, dataSelected} = props
    return (
        dataSelected ?
            <View style={style.component}>
                {dataSelected.map((user, index) => {
                    return (
                        <View style={style.tag_wrap}>
                            <Text style={style.tag}>{user.name}</Text>
                        </View>
                    )
                })}
            </View>
            : <View/>
    )
}

const style = StyleSheet.create({
    component: {
        height: 50,
        paddingVertical: 5,
        paddingHorizontal: 3,
        // backgroundColor:'#DBFF33',
        backgroundColor: '#bacfbf',
        flexDirection: "row",
        alignItems: "center"
    },
    tag_wrap: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#898c77",
        marginHorizontal: 5,
        padding: 3,
        borderRadius: 5,
    },
    tag: {
        // padding:5,

    }
})
export default UserListSelected
