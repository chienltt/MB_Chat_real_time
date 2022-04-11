const MessageLimit = 15;
import firestore from "@react-native-firebase/firestore";

export const getMessagesRealtime = async (roomId) => {
  let data = [];
  await firestore()
    .collection("Chatrooms")
    .doc(roomId)
    .collection("message")
    .orderBy("createdTime", "asc")
    .onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        data.push(doc.data());
      });
      console.log('du lieu realtime la',data[data.length-1])
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
export const getListRoomChats = (ListRoomID) => {
  const listRoomData = ListRoomID.map((id) => {
    firestore().collection("Chatrooms").where("id", "==", id)
      .get().then((querySnapshot) => {
      querySnapshot.forEach(function(doc) {
        listRoomData.push(doc.data());
      });
    });
  });
  return listRoomData;
};
