import React from "react";
const options = {
    dark:{
        text:"#fff",
        background:'#000'
    },
    light:{
        text:"#000",
        background:'#fff'
    }
}
const GetUserView =(props)=>{
    return options.dark
}
export default GetUserView
