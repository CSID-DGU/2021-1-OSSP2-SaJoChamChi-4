import React, { useState, useRef, useEffect, useContext } from "react";
import { ProgressContext, UserContext } from "../../contexts";
import styled from "styled-components/native";
import { Input, Button } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail, removeWhitespace } from "../../utils/common";
import { Alert } from "react-native";

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

const findPwd = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);

  const [id, setId] = useState("");
  const [name, setName] = useState();
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);


  const emailRef = useRef();
  const nameRef = useRef();

  const didMountRef = useRef();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = "";
      if (!name) {
        _errorMessage = "Please enter your name.";
      } else if (!validateEmail(email)) {
        _errorMessage = "Please verify your email.";
      }else{
        _errorMessage = "";
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, email]);

  useEffect(() => {
    setDisabled(
      !(name && email && !errorMessage)
    );
  }, [name, email, errorMessage]);

  check =  (Id, name, email)  => {
    fetch('http://172.30.1.21:3344/login/userCheck',{
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        user_Id: Id,
        name: name,
        email: email,
      }),
    }).then((response) => response.json()).then((response) => {
      console.log(response);
        if(response.length==0){
            Alert.alert("해당 정보로 유저정보를 찾을 수 없습니다.!\n 다시확인해주세요");
        }else{
            navigation.navigate('changePwd', { id : response[0].user_Id, name : response[0].usr_Name,
            email : response[0].usr_Email, usr_Id : response[0].usr_Id, pwd : response[0].usr_Pwd});
        }
    });
  };

  const _handleSignupButtonPress = async () => {
    try {
      spinner.start();
      check(id, name, email);
    } catch (e) {
      Alert.alert("Signup Error", e.message);
    } finally {
      spinner.stop();
    }
  };

   

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Input
          label="Id"
          value={id}
          onChangeText={(text) => setId(removeWhitespace(text))}
          onSubmitEditing={() => {
            setId(id.trim());
            nameRef.current.focus();
          }}
          onBlur={() => setId(id.trim())}
          placeholder="Id"
          returnKeyType="next"
        />
        <Input
          ref={nameRef}
          label="Name"
          value={name}
          onChangeText={(text) => setName(removeWhitespace(text))}
          onSubmitEditing={() => {
            setName(name.trim());
            emailRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="Name"
          returnKeyType="next"
        />
        <Input
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(removeWhitespace(text))}
          onSubmitEditing={() => _handleSignupButtonPress}
          placeholder="Email"
          returnKeyType="done"
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="비밀번호 찾기"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
          containerStyle={{marginBottom:20}}
        />
        <Button title="로그인화면으로 이동" onPress={() => navigation.navigate("Login")} />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default findPwd;
