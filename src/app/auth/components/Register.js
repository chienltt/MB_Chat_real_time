import React, {useState, createRef, useContext} from 'react';
import LoadingScreen from "../../../helpers/Loading/LoadingScreen";
import DatePicker from 'react-native-date-picker';
import AppContext from "../../AppContext";
import Feather from 'react-native-vector-icons/Feather';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView, Button,
} from 'react-native';

// import Loader from './Components/Loader';

const Register = (props) => {
    const { register } = useContext(AppContext);

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userDateOfBirth, setUserDateOfBirth] = useState(new Date());
    const [userDescription, setUserDescription] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [
        isRegistraionSuccess,
        setIsRegistraionSuccess
    ] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    // const [open, setOpen] = useState(false);

    const emailInputRef = createRef();
    const dateOfBirthRef = createRef();
    const descriptionInputRef = createRef();
    const passwordInputRef = createRef();

    const handleSubmitButton = async () => {
        setErrortext('');
        if (!userName) {
            alert('Please fill Name');
            return;
        }
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userEmail.match(/.+@.+/)) {
            alert('Invalid email')
        }
        if (!userDescription) {
            alert('Please fill Description');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        //Show Loader
        setLoading(true);
        const dataToSend = {
            name: userName,
            email: userEmail,
            dateOfBirth: userDateOfBirth,
            Description: userDescription,
            password: userPassword,
        };
        await register(userEmail, userPassword);
        setIsRegistraionSuccess(true);
        setLoading(false);
    };

    if (isRegistraionSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}>
                {/*<Image*/}
                {/*    // source={require('../Image/success.png')}*/}
                {/*    style={{*/}
                {/*        height: 150,*/}
                {/*        resizeMode: 'contain',*/}
                {/*        alignSelf: 'center'*/}
                {/*    }}*/}
                {/*/>*/}
                <Text style={styles.successTextStyle}>
                    Registration Successful
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('Login')}>
                    {/*onPress={() => {*/}
                    {/*    setIsRegistraionSuccess(false)*/}
                    {/*    setUserName('')*/}
                    {/*    setUserEmail('')*/}
                    {/*    setUserPassword('')*/}
                    {/*    setUserDescription(' ')*/}
                    {/*}}>*/}
                    <Text style={styles.buttonTextStyle}>Register Again</Text>
                </TouchableOpacity>
            </View>
        );
    }
    else if (loading) return <LoadingScreen/>
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
                        <Text style={styles.title_text}>Name</Text>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserName) => setUserName(UserName)}
                                underlineColorAndroid="#f000"
                                placeholder="Enter Name"
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="sentences"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    emailInputRef.current && emailInputRef.current.focus()
                                }
                                blurOnSubmit={true}
                            />
                        </View>
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
                                blurOnSubmit={false}
                            />
                            <TouchableOpacity
                                onPress={() => {setShowPassword(!showPassword)}}
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
                        <View style={styles.DateTimeContainer}>
                            <Button title="Date Of Birth" onPress={() => setShowDatePicker(true)} />
                            <Text style={styles.date_text}>{(function() {
                                let dd = String(userDateOfBirth.getDate()).padStart(2, '0');
                                let mm = String(userDateOfBirth.getMonth() + 1).padStart(2, '0');
                                let yyyy = userDateOfBirth.getFullYear();

                                return dd + '/' + mm + '/' + yyyy;

                            })()}</Text>
                            <DatePicker
                                modal
                                open={showDatePicker}
                                date={userDateOfBirth}
                                mode="date"
                                onConfirm={(date) => {
                                    setShowDatePicker(false)
                                    setUserDateOfBirth(date)
                                }}
                                onCancel={() => {
                                    setShowDatePicker(false)
                                    setUserDateOfBirth(new Date())
                                }}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserDescription) =>
                                    setUserDescription(UserDescription)
                                }
                                underlineColorAndroid="#f000"
                                placeholder="Enter Description"
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="sentences"
                                ref={descriptionInputRef}
                                returnKeyType="next"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                            />
                        </View>

                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitButton}>
                            <Text style={styles.buttonTextStyle}>REGISTER</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default Register;

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
        marginBottom: 20,
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
