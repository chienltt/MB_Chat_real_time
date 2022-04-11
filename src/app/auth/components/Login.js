import React, { useContext,  useState} from "react";
import { Button, Text, View, TextInput } from "react-native";
import AppContext from "../../AppContext";

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //state = {
    //username: '',
    //password: ''
  //};
  const { login, logout } = useContext(AppContext);
  return (
    <View>
      <Text>day la trang dang nhap</Text>
      <TextInput
        placeholder="Tài khoản"
        //onChangeText={(value) => setState({username: value}).bind(this)}
        //value={state.username}
        onChangeText={(username => setUsername(username))}
      />
      <TextInput
       placeholder="Mật khẩu"
       secureTextEntry={true}
       //onChangeText={(value) => setState({password: value}).bind(this)}
       //value={state.password}
       onChangeText={(password => setPassword(password))}
       />
      <Button title={"dang nhap"} onPress={() => {
        // alert('You tapped the button!');
        //test
        login(username, password);
      }} />
    </View>
  );
};
export default Login;
