import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import { UploadFile } from "./firebase/storages/UploadFile";

export const ChooseFileLaunchLibrary = async () => {
  const { url,response } = await launchImageFromLibrary()
  console.log('fileUrl',url)
  return { url,response }
};
const launchImageFromLibrary = ()=>{
  let options = {
    title: 'Select Image or Video',
    // customButtons: [
    //   {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    // ],
    storageOptions: {
      skipBackup: true, // do not backup to iCloud
      path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
    },
    mediaType: 'mixed',
    videoQuality: 'high',
    quality: 1,
  };
  return new Promise((resolve,reject)=>{
    launchImageLibrary(options, async response=> {
      if (response.didCancel) {
        console.log('User cancelled image picker', storage());
        reject(null)
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        reject(null)
      } else {
        console.log('File picked:', response);
        const url = await UploadFile(response.assets[0])
        resolve({ url, response })
      }
    })
  })
}
const launchImageFromCamera=()=>{
  let options = {
    title: 'Select Image or Video',
    // customButtons: [
    //   {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    // ],
    storageOptions: {
      skipBackup: true, // do not backup to iCloud
      path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
    },
    mediaType: 'mixed',
    videoQuality: 'high',
    quality: 1,
  };
  return new Promise((resolve => {
    launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker', storage());
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log('File took:', response);
        const url = await UploadFile(response.assets[0])
        resolve(url)
      }
    })
  }))
}
export const ChooseFileLaunchCamera=async ()=>{
  let options = {
    // title: 'Select Image',
    // customButtons: [
    //   {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    // ],
    storageOptions: {
      skipBackup: true, // do not backup to iCloud
      path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
    },
    mediaType: 'photo',
    quality: 1,
  };
  const url = await launchImageFromCamera()
  console.log('fileUrl',url)
  return url
}


