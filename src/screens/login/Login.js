import React, { useState, useRef, useEffect, useContext } from "react";
import { ProgressContext, UserContext } from "../../contexts";
import styled from "styled-components/native";
import { Input, Button } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail, removeWhitespace } from "../../utils/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Alert, Text, Image } from "react-native";

let imagepath = require("../../../assets/Myrefri.png");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;





const Login = ({ navigation }) => {
  const { user, dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const insets = useSafeAreaInsets();
  const [user1, setUser] = useState({});
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    //console.log("user useEffect");
    if(user[0]!= undefined) dispatch(user[0]);
  }, [user]);

  useEffect(() => {
    setDisabled(!(ID && password));
  }, [ID, password]);

  useEffect(() => {
    console.log("Login User useEffect : ", user1);
    if (user1[0] != undefined) {
      dispatch(user1[0]);
    }
  }, [user1]);

  const _handleIDChange = (ID) => {
    const changedID = removeWhitespace(ID);
    setID(changedID);
  };
  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };

  const _handleLoginButtonPress = async () => {
    try {
      login(ID, password);
      console.log("user state : ", user1);
      console.log("context: ", user.usr_Id);
      login(ID, password);
      console.log("user state : ", user1);
      console.log("context: ", user.usr_Id);
      spinner.start();
      console.log("userlog", user1);
      console.log("context: ", user.usr_Id);
    } catch (e) {
      Alert.alert("로그인되었습니다");
      _handleLoginButtonPress;
    } finally {
      spinner.stop();
    }
  };

  
  login = async (Id, password)  => {
     await fetch('http://192.168.0.145:3344/login/Login',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            id : Id,
            pwd : password,
        })
   }).then(response=>response.json()).then((response) => {setUser(response); console.log("response",user1);}
   );
    console.log("loginfunction : ", user1);
};
 



  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container insets={insets}>
        <Image
          source={imagepath}
          style={{
            borderRadius: 8,
            width: 100,
            height: 100,
            marginBottom: 50,
            marginLeft: 30,
          }}
        />
        <Text
          style={{ fontSize: 40, textAlign: "center", paddingBottom: 70 }}
          onPress={() => navigation.navigate("Start")}
        >
          My Refrigerator
        </Text>
        <Input
          label="ID"
          value={ID}
          onChangeText={_handleIDChange}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="ID"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="Sign up with email"
          onPress={() => navigation.navigate("Signup")}
          isFilled={false}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
