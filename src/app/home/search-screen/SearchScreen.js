import React, {useEffect, useState} from "react";
import {KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {getAllUsers, searchUser} from "../../../helpers/firebase/databases/ReadData";
import UserList from "./component/UserList";

const SearchScreen = (props) => {
    const {navigation} = props
    const [value, setValue] = useState('')
    const [data, setData] = useState([])
    const onchangeSearchValue = async (value) => {
        if (value === '') {
            const _data = await getAllUsers()
            setValue('')
            if (_data) {
                setData(_data)
            }
        } else {
            setValue(value)
            const _data = await searchUser(value)
            if (_data) {
                setData(_data)
            }
        }
    }
    const initData = async () => {
        const _data = await getAllUsers()
        if (_data) setData(_data)
    }
    useEffect(() => {
        initData()
    },[])
    return (
        <KeyboardAvoidingView style={style.wrap}>

            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon size={25} style={style.icon_goback} name={'left'}/>
                </TouchableOpacity>
                <View style={style.topSearchSection}>
                    <TextInput
                        style={{width: '100%'}}
                        placeholder="Search"
                        value={value}
                        onChangeText={(value) => onchangeSearchValue(value)}
                    />
                </View>
            </View>
            <View style={{height: 3, backgroundColor: 'lightgrey'}}/>
            <View style={style.body}>
                <UserList navigation={navigation} data={data}/>

            </View>


        </KeyboardAvoidingView>

    )
}
const style = StyleSheet.create({
    wrap: {
        flex: 1,
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
        marginLeft: 20,
        backgroundColor: '#fff'
    },
    body: {
        flex: 12,
        backgroundColor: '#fff'
    }
})
export default SearchScreen;
