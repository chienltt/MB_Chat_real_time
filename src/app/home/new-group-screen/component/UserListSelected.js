import React from "react";
import {ScrollView, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import UserSelection from "./UserSelection";
import Avatar from "../../../../helpers/Avatar";
import Feather from "react-native-vector-icons/Feather";

const UserListSelected = (props) => {
    const { dataSelected, unSelectUser} = props;
    const unSelect = (user) => unSelectUser(user);
    return (
        dataSelected.length ?
            <View style={style.component}>
                {dataSelected.map((user, index) => {
                    return (
                        <View style={{marginRight:15}}>
                            <TouchableOpacity style={style.Xicon} onPress={() => unSelectUser(user)}>
                                <Feather
                                    name="x"
                                    color='#fff'
                                    size={20}
                                />
                            </TouchableOpacity>
                            <Avatar size={60} url={user.avatar} />
                            <Text style={style.name}>{user.name}</Text>
                        </View>
                    )
                })}
                <View style={{height: 3, backgroundColor: 'lightgrey'}}/>
            </View>
            : <View/>
    )
}

const style = StyleSheet.create({
    component: {
        height: 80,
        paddingVertical: 5,
        paddingHorizontal: 3,
        marginTop: 7,
        backgroundColor: '#fff',
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
    name: {
        textAlign: "center",
        color: "black",
    },
    avatar: {
        flex: 1,
    },
    Xicon: {
        position:"absolute",
        right: 0,
        zIndex: 1,
        backgroundColor: "red",
        borderRadius: 100,
    }
})
export default UserListSelected
