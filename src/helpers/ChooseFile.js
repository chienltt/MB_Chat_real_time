import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import { UploadFile } from "./firebase/storages/UploadFile";

export const ChooseFileLaunchLibrary = async () => {
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
  await launchImageLibrary(options, async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker', storage());
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      console.log('File picked:', response);
      await UploadFile(response.assets[0])
    }
  })
};
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
  await launchCamera(options, async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker', storage());
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      console.log('File took:', response);
      // await UploadFile(response.assets[0])
    }
  })
}


