const MessageLimit = 15
import firestore from "@react-native-firebase/firestore";
export const getMessages = (roomId)=>{
  firestore()
    .collection('Chatrooms')
    .doc(roomId)
    .collection("message")
    .orderBy('createdTime','desc')
    .limit(MessageLimit)
    .onSnapshot(function(querySnapshot) {
      let datas = [];
      querySnapshot.forEach(function(doc) {
        datas.push(doc.data());
      });
      return datas
    });
}

export const getListRoomChats = (ListRoomID) =>{
  const listRoomData = ListRoomID.map((id)=>{
    firestore().collection('Chatrooms').where('id','==',id)
      .get().then((querySnapshot)=>{
      querySnapshot.forEach(function(doc) {
        listRoomData.push(doc.data());
      });
    })
  })
  return listRoomData
}
