import {getUserById} from "../../../../helpers/firebase/databases/ReadData";

const GetUserInGroup = async (roomInfo)=>{
    let roomData=[]
    await Promise.all(roomInfo.members.map(async (userId)=>{
        const userData = await getUserById(userId)
        if(userData) roomData.push(userData)
    }))
    return roomData
}
export default GetUserInGroup
