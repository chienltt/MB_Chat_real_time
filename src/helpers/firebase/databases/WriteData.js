import firestore from '@react-native-firebase/firestore';

export const createNewUserInfo = (userInfo) => {
    firestore().collection('Users')
        .doc(userInfo.userId)
        .set({
            name: userInfo.name || null,
            age: userInfo.age || null,
            dateOfBirth: userInfo.dateOfBirth || null,
            description: userInfo.description || null,
            avatar: userInfo.avatar || null, // link to the address image of firebase storage
            ChatRoomLists: []
        }).then(() => {
        console.log('user added!')
    })
}
export const createNewRoomChat = (newRoom) => {
    console.log("newRoom",newRoom.name)
    console.log("newRoom",newRoom.avatar)
    console.log("newRoom",newRoom.members)
    console.log("newRoom",newRoom.type)
    const now = new Date();
    firestore().collection('Chatrooms')
        .add({
            name:newRoom.name,
            avatar:newRoom.avatar,
            members: newRoom.members,
            membersObject: newRoom.membersObject,
            // lastMessage: null,
            updateTime:now,
            type:newRoom.type,
        }).then((room) => {
        console.log('create room chat: ', room.id)
        return room
    })
}

export const createNewMessage = (chatRoomId, message) => {
    firestore().collection('Chatrooms').doc(chatRoomId).collection('message')
        .add({
            type: message.type,
            content: message.content,
            createdTime: firestore.Timestamp.fromDate(message.createdTime),//firestore.Timestamp.fromDate(new Date()),
            user: message.user
        }).then(() => {
        firestore().collection('Chatrooms').doc(chatRoomId).update({
            lastMessage: message,
            updateTime: firestore.Timestamp.fromDate(message.createdTime)
        }).then(() => {
            console.log('message added!')
        })
    })
}
