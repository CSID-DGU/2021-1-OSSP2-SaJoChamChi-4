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

const findId = ({ navigation }) => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const [name, setName] = useState();
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const nicknameRef = useRef();
  const emailRef = useRef();

  const didMountRef = useRef();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = "";
      if (!name) {
        _errorMessage = "Please enter your name.";
      } else if (!validateEmail(email)) {
        _errorMessage = "Please verify your email.";
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, email]);

  useEffect(() => {
    setDisabled(!(name && email && !errorMessage));
  }, [name, email, errorMessage]);

  const _handleSignupButtonPress = async () => {
    try {
      spinner.start();
      getID(name, email);
    } catch (e) {
      Alert.alert("Signup Error", e.message);
    } finally {
      spinner.stop();
    }
  };

  getID = (name, email) => {
    fetch("http://192.168.0.190:3344/login/getId", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.length == 0) {
          Alert.alert("해당정보로 아이디를 찾을 수 없습니다.");
        } else {
          Alert.alert(
            response[0].user_Id + "입니다.\n 해당정보를 이용해 로그인해주세요"
          );
          navigation.navigate("Login");
        }
      });
  };

  return (
    <Container>
      <Input
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
        title="아이디 찾기"
        onPress={_handleSignupButtonPress}
        disabled={disabled}
        containerStyle={{ marginBottom: 20 }}
      />
      <Button title="GoBack" onPress={() => navigation.navigate("Login")} />
    </Container>
  );
};

export default findId;
