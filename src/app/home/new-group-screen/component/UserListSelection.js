import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import UserSelection from "./UserSelection";
const UserListSelection = (props)=>{
    const {navigation,data,unSelectUser,selectUser} = props
    return(
        <ScrollView style={style.component}>
            {data.map((user,index)=>{
                return <UserSelection navigation={navigation} key={index} userInfo={user}  selectUser={selectUser} unSelectUser={unSelectUser}/>
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
export default UserListSelection
