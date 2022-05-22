import {validate} from "@babel/core/lib/config/validation/options";

const MessageLimit = 15;
import firestore from "@react-native-firebase/firestore";

export const getMessagesRealtime = async (roomId) => {
    let data = [];
    await firestore()
        .collection("Chatrooms")
        .doc(roomId)
        .collection("message")
        .orderBy("createdTime", "asc")
        .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                data.push(doc.data());
            });
            console.log('du lieu realtime la', data[data.length - 1])
            return data;
        });
};

export const getMessages = async (roomID) => {
    let data = [];
    await firestore().collection("Chatrooms")
        .doc(roomID)
        .collection("message")
        .orderBy("createdTime", "asc")
        .get().then((querySnapshot) => {
            querySnapshot.forEach(snapshot => {
                data.push(snapshot.data());
            });
        });
    return data;
};
export const getRoomChatsById = (ListRoomID) => {
    const listRoomData = ListRoomID.map((id) => {
        firestore().collection("Chatrooms").where("id", "==", id)
            .orderBy("updateTime", "desc")
            .get().then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                listRoomData.push(doc.data());
            });
        });
    });
    return listRoomData;
};

export const getListUserRoomChats = async (userId) => {
    let listRoomData = []
    await firestore().collection("Chatrooms").where("members", "array-contains", userId)
        .orderBy("updateTime", "desc")
        .get().then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                listRoomData.push({
                    ...doc.data(),
                    roomId:doc.id
                });
            });
        });
    return listRoomData;
};

export const checkRoomExistsByMembers = async (otherId,userId)=>{
    console.log("data",userId,otherId)
    let room =[]
    await firestore().collection("Chatrooms")
        .where("type","==","basic")
        .where(`membersObject.${userId}`, "==", true)
        .where(`membersObject.${otherId}`, "==", true)
        // .where("members","array-contains",otherId)
        .get().then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                room.push({
                    ...doc.data(),
                    roomId:doc.id
                });
                console.log('okvcl',room)
            });
        });
    return room
}

export const getUserById = async (id)=>{
    console.log('vcl id',id)
    let data = await firestore().collection("Users")
        .doc(id)
        .get()
    console.log("vcl data",data)
    return data._data;
}

export const searchUser = async (searchValue) => {
    const searchTerm = searchValue.toLowerCase();
    const strlength = searchTerm.length;
    const strFrontCode = searchTerm.slice(0, strlength - 1);
    const strEndCode = searchTerm.slice(strlength - 1, searchTerm.length);
    const endCode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
    let data = [];
    await firestore().collection("Users")
        // .where("name", "array-contains",searchValue)
        // .orderBy("name", "asc")
        .where('nametolowercase', '>=', searchTerm)
        .where('nametolowercase', '<', endCode)
        .get().then((querySnapshot) => {
            querySnapshot.forEach(snapshot => {
                data.push({
                    ...snapshot.data(),
                    userId:snapshot.id
                });
            });
        });
    return data;
}
