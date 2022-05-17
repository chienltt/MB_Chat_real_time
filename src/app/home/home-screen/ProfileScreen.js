import React, {useState, useEffect, useContext} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Switch,
    SafeAreaView,
} from 'react-native';
import avatar from './image/avatar.png';
import firestore from '@react-native-firebase/firestore';
// import PostCard from '../components/PostCard';
import AppContext from "../../AppContext";


const ProfileScreen = ({navigation, route}) => {
    const {user, logout} = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const getUser = async() => {
        await firestore()
            .collection('Users')
            .doc( route.params ? route.params.userId : "FOajGnNk8K4CiLGyk4Ik")
            .get()
            .then((documentSnapshot) => {
                if( documentSnapshot.exists ) {
                    console.log('User Data', documentSnapshot.data());
                    setUserData(documentSnapshot.data());
                }
            })
    }

    useEffect(() => {
        getUser();
        setLoading(!loading);
    }, []);


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                showsVerticalScrollIndicator={false}>
                <Image
                    style={styles.userImg}
                    // source={(userData ? {uri: userData.userImg} : avatar)}
                    source={(avatar)}
                />
                <Text style={styles.userName}>{userData ? userData.name || 'Test' : 'Test'}</Text>
                {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
                <Text style={styles.description}>
                    {userData ? userData.description || 'No details added.' : 'A lot of detail here'}
                </Text>
                <View style={styles.userBtnWrapper}>
                    {route.params ? (
                        <>
                            <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                                <Text style={styles.userBtnTxt}>Message</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                                <Text style={styles.userBtnTxt}>Follow</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => {
                                    navigation.navigate('EditProfileScreen');
                                }}>
                                <Text style={styles.userBtnTxt}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.userBtn} onPress={() => console.log(user)}>
                                <Text style={styles.userBtnTxt}>Logout</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                {/*<View style={styles.userInfoWrapper}>*/}
                {/*    <View style={styles.userInfoItem}>*/}
                {/*        <Text style={styles.userInfoTitle}>{posts.length}</Text>*/}
                {/*        <Text style={styles.userInfoSubTitle}>Posts</Text>*/}
                {/*    </View>*/}
                {/*    <View style={styles.userInfoItem}>*/}
                {/*        <Text style={styles.userInfoTitle}>10,000</Text>*/}
                {/*        <Text style={styles.userInfoSubTitle}>Followers</Text>*/}
                {/*    </View>*/}
                {/*    <View style={styles.userInfoItem}>*/}
                {/*        <Text style={styles.userInfoTitle}>100</Text>*/}
                {/*        <Text style={styles.userInfoSubTitle}>Following</Text>*/}
                {/*    </View>*/}
                {/*</View>*/}
                <View style={styles.devider}>
                    <Text style={styles.settingText}>Settings</Text>
                </View>
                <TouchableOpacity
                    style={{width: '100%'}}
                    onPress={() => { }}>
                    <View
                        style={styles.buttonView}>
                        <Text style={{fontSize: 17}}>Dark mode</Text>
                        <Switch
                        style={{marginLeft: 'auto'}}
                        value={darkMode}
                        onValueChange={() => {setDarkMode(prevState => !prevState)}}/>
                    </View>
                    <View style={{height: 3, backgroundColor: 'lightgrey'}} />

                </TouchableOpacity>
                <TouchableOpacity
                    style={{alignSelf: 'flex-start', width: '100%'}}
                    onPress={() => { }}>
                    <View
                        style={styles.buttonView}>
                        <Text style={{fontSize: 17, }}>Detail Information</Text>
                    </View>
                    <View style={{height: 3, backgroundColor: 'lightgrey'}} />

                </TouchableOpacity>
                {/*<View style={{height: 3, backgroundColor: 'grey', width: '100%'}} />*/}

            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        // paddingHorizontal: 20,
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 100,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
        marginBottom: 10,
    },
    description: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnTxt: {
        color: '#2e64e5',
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    devider: {
        height: 50,
        width: '100%',
        backgroundColor: 'lightgray',
        alignSelf: 'center',
        marginTop: 5,
    },
    settingText: {
        fontSize: 20,
        color: 'gray',
        height: '100%',
        textAlignVertical: 'bottom',
        paddingLeft: 10,
    },
    buttonView: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 20,
        flexDirection: 'row',
    },
});
