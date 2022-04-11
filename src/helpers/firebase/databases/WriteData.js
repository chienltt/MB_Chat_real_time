import firestore from '@react-native-firebase/firestore';

export const createNewUserInfo = (userInfo)=>{
  firestore().collection('Users' )
    .doc(userInfo.userID)
    .set({
      name: userInfo.name|| null,
      age: userInfo.age || null,
      dateOfBirth:userInfo.dateOfBirth||null,
      description: userInfo.description||null,
      avatar:userInfo.avatar||null, // link to the address image of firebase storage
      ChatRoomLists:[]
    }).then(()=>{
      console.log('user added!')
  })
}
export const createNewRoomChat = (members)=>{
  firestore().collection('Chatrooms')
    .add({
      members:members,
      lastMessage:null,
      updateTime:null,
    }).then((room)=>{
      console.log('create room chat: ',room.id)
  })
}

export const createNewMessage = (chatRoomId,message)=>{
  firestore().collection('Chatrooms').doc(chatRoomId).collection('message')
    .add({
      type:message.type,
      content:message.content,
      createdTime:message.createdTime,//firestore.Timestamp.fromDate(new Date()),
    }).then(()=>{
    firestore().collection('Chatrooms').doc(chatRoomId).update({
      lastMessage:message,
      updateTime:message.createdTime
    }).then(()=>{
      console.log('message added!')
    })
  })
}
