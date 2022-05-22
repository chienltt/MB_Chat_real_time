import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import User from "./User";

const UserList = (props)=>{
    const {navigation,data,selectUser,unSelectUser} = props
    return(
        <ScrollView style={style.component}>
            {data.map((user,index)=>{
                return <User navigation={navigation} key={index} userInfo={user}/>
            })}
        </ScrollView>
    )
}
const style = StyleSheet.create({
    component: {
        paddingVertical:5,
        paddingHorizontal:3,
        backgroundColor:'#fff'
    }
})
export default UserList
