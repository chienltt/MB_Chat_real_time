import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import User from "./User";

const UserList = (props)=>{
    const {navigation,data} = props
    return(
        <ScrollView style={style.component}>
            {data.map((user,index)=>{
                console.log('user',user)
                return <User navigation={navigation} key={index} userInfo={user}/>
            })}
        </ScrollView>
    )
}
const style = StyleSheet.create({
    component: {
        paddingVertical:5,
        paddingHorizontal:3,
        backgroundColor:'#DBFF33'
    }
})
export default UserList
