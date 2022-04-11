import React, { useState } from "react";
import AppContext from "./AppContext";
import Routes from "./Routes";
import { login, logout, register } from "./auth/methods";

const AppProviders=(props)=>{
  const [user,setUser] = useState(null)
  return(
    <AppContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout
      }}>
      <Routes />
    </AppContext.Provider>
  )
}
export default AppProviders
