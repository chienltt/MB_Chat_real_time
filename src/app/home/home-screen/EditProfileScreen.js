import React, {useEffect, useContext, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
    Alert, Button, Platform,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';

import AppContext from "../../AppContext";
import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';
import DatePicker from "react-native-date-picker";
import avatar from "./image/avatar.png";

const EditProfileScreen = ({navigation,route}) => {
    const {user, logout} = useContext(AppContext);
    // const [image, setImage] = useState(null);
    // const [uploading, setUploading] = useState(false);
    // const [transferred, setTransferred] = useState(0);
    const [userData, setUserData] = useState(route.params.userData);
    const [showDatePicker, setShowDatePicker] = useState(false);


    const getUser = async () => {
        await firestore()
            .collection('Users')
            .doc(userData.userId)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    let data = documentSnapshot.data();
                    // console.log('User Data1', data);
                    setUserData({...data});
                }
            })
    }

    const handleUpdate = async () => {
        // let imgUrl = await uploadImage();
        //
        // if( imgUrl == null && userData.userImg ) {
        //     imgUrl = userData.userImg;
        // }
        if (userData.avatar) {
            firestore()
                .collection('Users')
                .doc(userData.userId)
                .update({
                    'name': userData.name,
                    'avatar': userData.avatar,
                    'description': userData.description,
                    'dateOfBirth': userData.dateOfBirth,
                })
                .then(() => {
                    getUser()
                    console.log('User Updated!');
                    Alert.alert(
                        'Profile Updated!',
                        'Your profile has been updated successfully.'
                    );
                })
        }
        else {
            firestore()
                .collection('Users')
                .doc(userData.userId)
                .update({
                    'name': userData.name,
                    'description': userData.description,
                    'dateOfBirth': userData.dateOfBirth,
                })
                .then(() => {
                    getUser()
                    console.log('User Updated!');
                    Alert.alert(
                        'Profile Updated!',
                        'Your profile has been updated successfully.'
                    );
                })
        }
    }

    // const uploadImage = async () => {
    //     if( image == null ) {
    //         return null;
    //     }
    //     const uploadUri = image;
    //     let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    //
    //     // Add timestamp to File Name
    //     const extension = filename.split('.').pop();
    //     const name = filename.split('.').slice(0, -1).join('.');
    //     filename = name + Date.now() + '.' + extension;
    //
    //     setUploading(true);
    //     setTransferred(0);
    //
    //     const storageRef = storage().ref(`photos/${filename}`);
    //     const task = storageRef.putFile(uploadUri);
    //
    //     // Set transferred state
    //     task.on('state_changed', (taskSnapshot) => {
    //         console.log(
    //             `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    //         );
    //
    //         setTransferred(
    //             Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
    //             100,
    //         );
    //     });
    //
    //     try {
    //         await task;
    //
    //         const url = await storageRef.getDownloadURL();
    //
    //         setUploading(false);
    //         setImage(null);
    //
    //         // Alert.alert(
    //         //   'Image uploaded!',
    //         //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
    //         // );
    //         return url;
    //
    //     } catch (e) {
    //         console.log(e);
    //         return null;
    //     }
    //
    // };

    // useEffect(() => {
    //     getUser();
    // }, []);

    // const takePhotoFromCamera = () => {
    //     ImagePicker.openCamera({
    //         compressImageMaxWidth: 300,
    //         compressImageMaxHeight: 300,
    //         cropping: true,
    //         compressImageQuality: 0.7,
    //     }).then((image) => {
    //         console.log(image);
    //         const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
    //         setImage(imageUri);
    //         this.bs.current.snapTo(1);
    //     });
    // };
    //
    // const choosePhotoFromLibrary = () => {
    //     ImagePicker.openPicker({
    //         width: 300,
    //         height: 300,
    //         cropping: true,
    //         compressImageQuality: 0.7,
    //     }).then((image) => {
    //         console.log(image);
    //         const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
    //         setImage(imageUri);
    //         bs.current.snapTo(1);
    //     });
    // };

    // const renderInner = () => (
    //     <View style={styles.panel}>
    //         <View style={{alignItems: 'center'}}>
    //             <Text style={styles.panelTitle}>Upload Photo</Text>
    //             <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
    //         </View>
    //         <TouchableOpacity
    //             style={styles.panelButton}
    //             onPress={takePhotoFromCamera}>
    //             <Text style={styles.panelButtonTitle}>Take Photo</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //             style={styles.panelButton}
    //             onPress={choosePhotoFromLibrary}>
    //             <Text style={styles.panelButtonTitle}>Choose From Library</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //             style={styles.panelButton}
    //             onPress={() => bs.current.snapTo(1)}>
    //             <Text style={styles.panelButtonTitle}>Cancel</Text>
    //         </TouchableOpacity>
    //     </View>
    // );

    // const renderHeader = () => (
    //     <View style={styles.header}>
    //         <View style={styles.panelHeader}>
    //             <View style={styles.panelHandle} />
    //         </View>
    //     </View>
    // );

    // const fall = new Animated.Value(1);

    return (
        <View style={styles.container}>
            {/*<BottomSheet*/}
            {/*    ref={this.bs}*/}
            {/*    snapPoints={[330, -5]}*/}
            {/*    renderContent={this.renderInner}*/}
            {/*    renderHeader={this.renderHeader}*/}
            {/*    initialSnap={1}*/}
            {/*    callbackNode={this.fall}*/}
            {/*    enabledGestureInteraction={true}*/}
            {/*/>*/}

            {/*<Animated.View*/}
            {/*    style={{*/}
            {/*        margin: 20,*/}
            {/*        opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),*/}
            {/*    }}>*/}
            <TouchableOpacity onPress={()=>{navigation.goBack()}}><Text>back</Text></TouchableOpacity>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity>
                    <View
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ImageBackground
                            // source={{
                            //     uri: image
                            //         ? image
                            //         : userData
                            //             ? userData.userImg
                            // }}
                            source={(userData ? userData.avatar ? {uri: userData.avatar} : avatar : avatar)}

                            style={{height: 100, width: 100}}
                            imageStyle={{borderRadius: 15}}>
                            {/*<View*/}
                            {/*    style={{*/}
                            {/*        flex: 1,*/}
                            {/*        justifyContent: 'center',*/}
                            {/*        alignItems: 'center',*/}
                            {/*    }}>*/}
                            {/*    <MaterialCommunityIcons*/}
                            {/*        name="camera"*/}
                            {/*        size={35}*/}
                            {/*        color="#fff"*/}
                            {/*        style={{*/}
                            {/*            opacity: 0.7,*/}
                            {/*            alignItems: 'center',*/}
                            {/*            justifyContent: 'center',*/}
                            {/*            borderWidth: 1,*/}
                            {/*            borderColor: '#fff',*/}
                            {/*            borderRadius: 10,*/}
                            {/*        }}*/}
                            {/*    />*/}
                            {/*</View>*/}
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
                <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
                    {userData ? userData.name : ''}
                </Text>
                {/* <Text>{user.uid}</Text> */}
            </View>

            <View style={styles.action}>
                <FontAwesome name="user-o" color="#333333" size={20}/>
                <TextInput
                    placeholder="Name"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={userData ? userData.name : ''}
                    onChangeText={(txt) => setUserData({...userData, name: txt})}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <FontAwesome name="user-o" color="#333333" size={20}/>
                <TextInput
                    placeholder="Avatar url"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={userData ? userData.avatar : ''}
                    onChangeText={(txt) => setUserData({...userData, avatar: txt})}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <Ionicons name="ios-clipboard-outline" color="#333333" size={20}/>
                <TextInput
                    multiline
                    numberOfLines={3}
                    placeholder="About Me"
                    placeholderTextColor="#666666"
                    value={userData ? userData.description : ''}
                    onChangeText={(txt) => setUserData({...userData, description: txt})}
                    autoCorrect={true}
                    style={[styles.textInput]}
                />
            </View>
            <View style={styles.DateTimeContainer}>
                <Button title="Date Of Birth" onPress={() => setShowDatePicker(true)}/>
                <Text style={styles.date_text}>{(function () {
                    let dateBirth = userData ? userData.dateOfBirth.toDate() : new Date();
                    let dd = String(dateBirth.getDate()).padStart(2, '0');
                    let mm = String(dateBirth.getMonth() + 1).padStart(2, '0');
                    let yyyy = dateBirth.getFullYear();
                    return dd + '/' + mm + '/' + yyyy;

                })()}</Text>
                <DatePicker
                    modal
                    open={showDatePicker}
                    date={ new Date()}
                    mode="date"
                    onConfirm={(date) => {
                        setShowDatePicker(false)
                        setUserData({...userData, dateOfBirth: firestore.Timestamp.fromDate(date)})
                    }}
                    onCancel={() => {
                        setShowDatePicker(false)
                    }}
                />
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            {/*<FormButton buttonTitle="Update" onPress={handleUpdate} />*/}
            {/*</Animated.View>*/}
        </View>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        width: '100%',
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2e64e5',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#333333',
        height: 40,
    },
    DateTimeContainer: {
        flexDirection: 'row',
        height: 40,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    date_text: {
        color: 'black',
        fontSize: 18,
        marginLeft: 50,
    },
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: 50,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Lato-Regular',
    },
});
