import React, {useState} from "react";
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {searchUser} from "../../../helpers/firebase/databases/ReadData";
import UserList from "./component/UserList";

const SearchScreen = (props) => {
    const {navigation} = props
    const [value,setValue] = useState('')
    const [data,setData] = useState([])
    const onchangeSearchValue = async (value)=>{
        if(value==='') {
            setValue('')
            setData([])
        }
        else {
            setValue(value)
            const _data = await searchUser(value)
            if(_data) {
                setData(_data)
            }
        }
    }
    return (
        <View style={style.wrap}>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon size={25} style={style.icon_goback} name={'left'}/>
                </TouchableOpacity>
                <View style={style.topSearchSection}>
                    <TextInput
                        placeholder="Search user or group ..."
                        value={value}
                        onChangeText={(value)=>onchangeSearchValue(value)}
                    />
                </View>
            </View>
            <View style={{height: 3, backgroundColor: 'lightgrey'}}/>
            <View style={style.body}>
                <UserList navigation={navigation} data={data}/>
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
        marginLeft: 20,
        backgroundColor: '#fff'
    },
    body:{
        flex:12,
        backgroundColor: '#fff'
    }
})
export default SearchScreen;
