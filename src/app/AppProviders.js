import React, {useState} from "react";
import AppContext from "./AppContext";
import Routes from "./Routes";
import {login, logout, register} from "./auth/methods";

const AppProviders = (props) => {
    const [user, setUser] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [isChangeRoomList,setIsChangeRoomList] = useState(true)
    return (
        <AppContext.Provider
            value={{
                user,
                userInfo,
                setUserInfo,
                setUser,
                setIsChangeRoomList,
                isChangeRoomList,
                login,
                register,
                logout
            }}>
            <Routes/>
        </AppContext.Provider>
    )
}
export default AppProviders
