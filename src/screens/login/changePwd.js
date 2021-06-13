import React, { useState, useRef, useEffect, useContext } from "react";
import { ProgressContext, UserContext } from "../../contexts";
import styled from "styled-components/native";
import { Input, Button } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail, removeWhitespace } from "../../utils/common";
import { Alert } from "react-native";
import { useScrollToTop } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const changePwd = ({ navigation, route }) => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const [id, setId] = useState(route.params.id);
  const [name, setName] = useState(route.params.name);
  const [email, setEmail] = useState(route.params.email);
  const [usr_Id, setUser_Id] = useState(route.params.usr_Id);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const passwordConfirmRef = useRef();


  const didMountRef = useRef();
  useEffect(()=>{
    console.log("Route",route);
    console.log("value" ,route.params.id);
  },[])
  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = "";
      if (!name) {
        _errorMessage = "Please enter your name.";
      } else if (password.length < 7) {
        _errorMessage = "The password must contain 6 characters at least.";
      }else if (password === route.params.usr_Pwd) {
        _errorMessage = "can't use that password";
      } else if (password !== passwordConfirm) {
        _errorMessage = "Passwords need to match.";
      } else {
        _errorMessage = "";
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, email, password, passwordConfirm]);

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [name, email, password, passwordConfirm, errorMessage]);

  const _handleSignupButtonPress = async () => {
    try {
      spinner.start();
      change(id, password, name, email, usr_Id);
    } catch (e) {
      Alert.alert("Signup Error", e.message);
    } finally {
      spinner.stop();
    }
  };

  change =  (Id, password, name, email, usr_Id)  => {
    fetch('http://34.64.235.196:3344/login/changePwd',{
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Id,
        pwd: password,
        name: name,
        email: email,
        usr_Id : usr_Id
      }),
    }).then((response) => response.json()).then((response) => {
       console.log("데이터 넘어오는거 확인", route, id,name );
        Alert.alert("비밀번호가 변경되었습니다.\n 로그인해주세요!");
        navigation.navigate("Login");
    });
  };

  return (
      <Container>
        <Input
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(removeWhitespace(text))}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          placeholder="7자리이상의 비밀번호"
          returnKeyType="done"
          isPassword
        />
        <Input
          ref={passwordConfirmRef}
          label="Password Confirm"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(removeWhitespace(text))}
          onSubmitEditing={_handleSignupButtonPress}
          placeholder="비밀번호 재확인"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="변경하기"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
          containerStyle={{marginBotton:20}}
        />
        <Button title="GoBack" onPress={() => navigation.navigate("Login")} />
      </Container>
  );
};

export default changePwd;
