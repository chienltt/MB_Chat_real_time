import React, {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {searchUser} from "../../../helpers/firebase/databases/ReadData";
import Icon from "react-native-vector-icons/AntDesign";
import UserList from "../search-screen/component/UserList";
import Avatar from "../../../helpers/Avatar";
import NewGroupButton from "./component/NewGroupButton";
import UserListSelection from "./component/UserListSelection";
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
                    const isSelected = dataSelected.find(userSelected => userSelected.id === user.id)
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
        // console.log('okok',newValueSearch)
    }
    const onUnSelectUser= async (user)=>{
        const newDataSelected=dataSelected.map(_user=>{
            if (_user!== user.id ) return _user
        })
        setDataSelected(newDataSelected)
    }
    return (
        <View style={style.wrap}>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text>cancel </Text>
                </TouchableOpacity>
                <View style={style.topSearchSection}>
                    {/*<Icon style={{padding: 10}} name={'search1'}/>*/}
                    <TextInput
                        placeholder="search user"
                        value={value}
                        onChangeText={(value)=>onchangeSearchValue(value)}
                    />
                </View>
            </View>
            <View style={style.body}>
                <NewGroupButton userSelected={dataSelected} />
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
        backgroundColor: '#2E8C2E',
    },
    topSearchSection: {
        flex: 1,
        minHeight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    body:{
        flex:12,
        backgroundColor: '#fff'
    }
})
export default NewGroupScreen
