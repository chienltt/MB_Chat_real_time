import { Platform } from "react-native";
import storage from "@react-native-firebase/storage";
import RNFS from "react-native-fs";

export const UploadFile = async (fileData)=>{
  if (fileData.type === 'image/jpeg')  return  await UploadImage(fileData.uri)
  if (fileData.type === 'video/mpeg') return  await UploadVideo(fileData.uri)
}

export const UploadImage= async (uri) => {
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  try {
    const task = await storage().ref(filename).putFile(uploadUri);
    if(task) {
      const url = await storage().ref(filename).getDownloadURL().catch((e)=>{console.log('cannot get url')})
      console.log('Upload image successfully!')
      return url
    }
  }catch (e){
    console.log('Error :',e)
    return null
  }

}
export const UploadVideo= async (uri) =>{
  const filename = uri.substring(uri.lastIndexOf('/')+1);
  const data = await RNFS.readFile(uri, 'base64');
  try {
    const task =     await storage().ref(filename).putString(data, 'base64');
    if(task) {
      const url = await storage().ref(filename).getDownloadURL().catch((e)=>{console.log('cannot get url')})
      console.log('Upload video successfully!')
      return url
    }
  }catch (e){
    console.log('Error :',e)
    return null
  }
}
