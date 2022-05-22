import firestore from '@react-native-firebase/firestore';

export const createNewUserInfo = (userInfo) => {
    firestore().collection('Users')
        .doc(userInfo.userId)
        .set({
            name: userInfo.name || null,
            age: userInfo.age || null,
            dateOfBirth: userInfo.dateOfBirth || null,
            description: firestore.Timestamp.fromDate(userInfo.description)  || null,
            avatar: userInfo.avatar || "https://png2.cleanpng.com/sh/c19eebe8d9f5306b216767f15eff595b/L0KzQYm3VsI0N6t1hJH0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TfF3aaVmip98b3Pscb20jfVlcZIyet54Zz3pf7B7TfF4baR0RdNBYYTkgn7wgB9vNWZnStcEOXO3RIGCVsI0NmU7TKUEMUi0QYa5Wcc5OGc8TqQBNEaxgLBu/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c4409623.4643918115297806762646.png", // link to the address image of firebase storage
            ChatRoomLists: []
        }).then(() => {
        console.log('user added!')
    })
}
export const createNewRoomChat = (newRoom) => {
    const now = new Date();
    firestore().collection('Chatrooms')
        .add({
            name: newRoom.name,
            avatar: newRoom.avatar?newRoom.avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxo5wX-gV36xL6Lxd0aOQtSqGmZQzoDAe-hA&usqp=CAU",
            members: newRoom.members,
            membersObject: newRoom.membersObject,
            avatars:newRoom.avatars,
            // lastMessage: null,
            updateTime: now,
            type: newRoom.type,
            isChecked:[],
        }).then((room) => {
        console.log('create room chat: ', room.id)
        return room
    })
}

export const createNewGroup =async (newGroup)=>{
    const now = new Date();
    const newRoom = await firestore().collection('Chatrooms')
        .add({
            name: newGroup.name,
            avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0uOCz8P-VYPNKEVkFEC1lVnz_t42LtOrLeg&usqp=CAU",
            members: newGroup.members,
            // membersObject: newGroup.membersObject,
            // lastMessage: null,
            updateTime: now,
            type: newGroup.type,
            isChecked:[],
        }).then((room) => {
        console.log('create room chat: ', room.id)
        return room
    })
    return newRoom
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
