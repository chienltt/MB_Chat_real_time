import React, {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {searchUser} from "../../../helpers/firebase/databases/ReadData";
import Icon from "react-native-vector-icons/AntDesign";
import UserList from "../search-screen/component/UserList";
import Avatar from "../../../helpers/Avatar";
import NewGroupButton from "./component/NewGroupButton";
import UserListSelection from "./component/UserListSelection";
import UserListSelected from "./component/UserListSelected";
const NewGroupScreen = (props)=>{
    const {navigation} = props
    const [value,setValue] = useState('')
    const [data,setData] = useState([])
    const [dataSelected,setDataSelected] = useState([])
    const onchangeSearchValue = async (value)=>{
        if(value==='') {
            setValue('')
            setData([])
        }
        else {
            setValue(value)
            const _data = await searchUser(value)
            if(_data) {
                _data.map(user => {
                    const isSelected = dataSelected.find(userSelected => userSelected.userId === user.userId)
                    if (isSelected) user.selected = true
                    user.selected = false
                })
                setData(_data)
            }
        }
    }
    const onselectUser = async (user)=>{
        setDataSelected((prev)=>[...prev,user])
        // const newValueSearch = value.split(',')[0]
        console.log('okok',user);
    }
    const onUnSelectUser= async (user)=>{
        const newDataSelected=dataSelected.filter(userSelected=>userSelected.userId!== user.userId)
        console.log('gia tri',newDataSelected)
        // const index = dataSelected.filter((userSelected,index)=>{
        //     if (userSelected.id === user.id) return index
        // })
        // if (index) setDataSelected(dataSelected.splice(index,1))
        setDataSelected(newDataSelected)
    }
    return (
        <View style={style.wrap}>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon size={25} style={style.icon_goback} name={'left'}/>
                </TouchableOpacity>
                <View style={style.topSearchSection}>
                    <TextInput
                        style={{width: '100%'}}
                        placeholder="Search user"
                        value={value}
                        onChangeText={(value)=>onchangeSearchValue(value)}
                    />
                </View>
            </View>
            <View style={{height: 3, backgroundColor: 'lightgrey'}}/>
            <View style={style.body}>
                <NewGroupButton userSelected={dataSelected} />
                <View style={{height: 3, backgroundColor: 'lightgrey'}}/>
                <UserListSelected dataSelected ={dataSelected} unSelectUser={onUnSelectUser}/>
                <UserListSelection navigation={navigation} data={data} selectUser={onselectUser} unSelectUser={onUnSelectUser}/>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    wrap:{
        flex:1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        height: 20,
        minHeight: 10,
        backgroundColor: '#fff',
    },
    topSearchSection: {
        flex: 1,
        minHeight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginLeft: 20,

    },
    body:{
        flex:12,
        backgroundColor: '#fff'
    },

})
export default NewGroupScreen
