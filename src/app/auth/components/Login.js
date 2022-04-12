import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import AppContext from "../../AppContext";

const Login = (props) => {
  const {login, logout } = useContext(AppContext);
  return (
    <View>
      <Text>day la trang dang nhap</Text>
      <Button title={"dang nhap"} onPress={() => {
        // alert('You tapped the button!');
        //test
        login("chientest3@gmail.com", "12345678");
      }} />
    </View>
  );
};
export default Login;
