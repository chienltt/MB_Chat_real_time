import firestore from '@react-native-firebase/firestore';

export const createNewUserInfo = (userInfo) => {
    firestore().collection('Users')
        .doc(userInfo.userId)
        .set({
            name: userInfo.name || null,
            age: userInfo.age || null,
            dateOfBirth: userInfo.dateOfBirth || null,
            description: firestore.Timestamp.fromDate(userInfo.description)  || null,
            avatar: userInfo.avatar || null, // link to the address image of firebase storage
            ChatRoomLists: []
        }).then(() => {
        console.log('user added!')
    })
}
export const createNewRoomChat = (newRoom) => {
    console.log("newRoom", newRoom.name)
    console.log("newRoom", newRoom.avatar)
    console.log("newRoom", newRoom.members)
    console.log("newRoom", newRoom.type)
    const now = new Date();
    firestore().collection('Chatrooms')
        .add({
            name: newRoom.name,
            avatar: newRoom.avatar,
            members: newRoom.members,
            membersObject: newRoom.membersObject,
            // lastMessage: null,
            updateTime: now,
            type: newRoom.type,
        }).then((room) => {
        console.log('create room chat: ', room.id)
        return room
    })
}

export const checkSeen = (roomInfo,userId,getRoomList)=>{
    if(roomInfo.isChecked.includes(userId)===false) {
        roomInfo.isChecked.push(userId)
        firestore().collection('Chatrooms').doc(roomInfo.roomId).update({
            isChecked: roomInfo.isChecked
        }).then(() => {
            getRoomList()
            console.log('seen checked!')
        })
    }
}

export const createNewMessage = (chatRoomId, message, userId) => {
    firestore().collection('Chatrooms').doc(chatRoomId).collection('message')
        .add({
            type: message.type,
            content: message.content,
            createdTime: firestore.Timestamp.fromDate(message.createdTime),//firestore.Timestamp.fromDate(new Date()),
            user: message.user
        }).then((doc) => {
        firestore().collection('Chatrooms').doc(chatRoomId).update({
            lastMessage: {
                ...message,
                id: doc.id
            },
            updateTime: firestore.Timestamp.fromDate(message.createdTime)
        })
    }).then((doc) => {
        firestore().collection('Chatrooms').doc(chatRoomId).update({
            isChecked: [message.user]
            // lastMessage: {
            //     ...message,
            //     id:doc.id
            // },
            // updateTime: firestore.Timestamp.fromDate(message.createdTime)
        }).then(() => {
            console.log('message added!')
        })
    })
}

// .then((doc) => {
//     if(user.uid !== message.user)
//         console.log('okok 123')
//     else console.log('okok 456')
// firestore().collection('Chatrooms').doc(chatRoomId).update({
//     isChecked:{
//         [user.id] : false,
//         [message.user] : true
//     }
//     // lastMessage: {
//     //     ...message,
//     //     id:doc.id
//     // },
//     // updateTime: firestore.Timestamp.fromDate(message.createdTime)
// }).then(() => {
//     console.log('message added!')
// })
// })
