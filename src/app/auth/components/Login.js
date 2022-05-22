import React, {createRef, useContext, useState} from "react";
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView, StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import AppContext from "../../AppContext";
import LoadingScreen from "../../../helpers/Loading/LoadingScreen";
import Feather from "react-native-vector-icons/Feather";

const Login = ({navigation}) => {
    const {login} = useContext(AppContext);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(true)

    const [showPassword, setShowPassword] = useState(true);

    const emailInputRef = createRef();
    const passwordInputRef = createRef();
    const confirmPasswordInputRef = createRef();

    const handleSubmitButton = async () => {
        if (!userEmail) {
            alert('Please fill Email');
            return;
        } else if (!userEmail.match(/.+@.+/)) {
            alert('Invalid email')
        } else if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        //Show Loader
        else {
            setLoading(true);
            const signin = await login(userEmail, userPassword)
            console.log('okokkhong tin dc', signin)
            if (!signin) setIsLoginSuccess(false)
            else setIsLoginSuccess(true);
            setLoading(false);
        }
    };

    if (!isLoginSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}>
                <Text style={styles.successTextStyle}>
                    Email or Password invalid!
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    // onPress={() => props.navigation.navigate('Login')}>
                    onPress={() => {
                        setIsLoginSuccess(true)
                        setUserEmail('')
                        setUserPassword('')
                    }}>
                    <Text style={styles.buttonTextStyle}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    // onPress={() => props.navigation.navigate('Login')}>
                    onPress={() => {
                        navigation.navigate('Register')
                    }}>
                    <Text style={styles.buttonTextStyle}>Register</Text>
                </TouchableOpacity>
            </View>
        );
    } else if (loading) return <LoadingScreen/>
    else return (
            <View style={{flex: 1, backgroundColor: '#307ecc'}}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>
                    <KeyboardAvoidingView enabled>
                        <View style={styles.container}>
                            <Text style={styles.title_text}>Email</Text>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                    underlineColorAndroid="#f000"
                                    placeholder="Enter Email"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="email-address"
                                    ref={emailInputRef}
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        passwordInputRef.current &&
                                        passwordInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            </View>
                            <Text style={styles.title_text}>Password</Text>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(UserPassword) =>
                                        setUserPassword(UserPassword)
                                    }
                                    underlineColorAndroid="#f000"
                                    placeholder="Enter Password"
                                    placeholderTextColor="#8b9cb5"
                                    ref={passwordInputRef}
                                    returnKeyType="next"
                                    secureTextEntry={showPassword}
                                    onSubmitEditing={() =>
                                        confirmPasswordInputRef.current &&
                                        confirmPasswordInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowPassword(!showPassword)
                                    }}
                                >
                                    {showPassword ?
                                        <Feather
                                            name="eye-off"
                                            color='#dadae8'
                                            size={20}
                                        />
                                        :
                                        <Feather
                                            name="eye"
                                            color='#dadae8'
                                            size={20}
                                        />
                                    }
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                onPress={handleSubmitButton}>
                                <Text style={styles.buttonTextStyle}>Sign in</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                onPress={()=>navigation.navigate('Register')}>
                                <Text style={styles.buttonTextStyle}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    title_text: {
        color: 'white',
        fontSize: 18,
        marginLeft: 35,
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
        paddingRight: 10,
    },
    DateTimeContainer: {
        flexDirection: 'row',
        height: 40,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    date_text: {
        color: 'white',
        fontSize: 18,
        marginLeft: 50,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 0,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,

    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    datePickerStyle: {
        width: 230,
    },
});

export default Login;
