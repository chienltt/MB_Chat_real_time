import React, {useState} from "react";
import AppContext from "./AppContext";
import Routes from "./Routes";
import {login, logout, register} from "./auth/methods";
import {getUserById} from "../helpers/firebase/databases/ReadData";

const AppProviders = (props) => {
    const [user, setUser] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [isChangeRoomList,setIsChangeRoomList] = useState(true)
    const setThisUserData = async ()=>{
        const _userInfo = await getUserById(user.uid)
        if (_userInfo) {
            setUserInfo({
                ..._userInfo,
                userId:user.uid
            })
        }
    }
    return (
        <AppContext.Provider
            value={{
                user,
                userInfo,
                setUserInfo,
                setUser,
                setIsChangeRoomList,
                isChangeRoomList,
                setThisUserData,
                login,
                register,
                logout
            }}>
            <Routes/>
        </AppContext.Provider>
    )
}
export default AppProviders
