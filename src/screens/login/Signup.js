import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext, UserContext } from '../../contexts';
import styled from 'styled-components/native';
import { Input, Button } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../../utils/common';
import { Alert } from 'react-native';

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

const Signup = ({navigation}) => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
   
  const [id, setId] = useState('');
  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [day, setDay] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const dayRef = useRef();
  const addressRef = useRef();
  const birthRef = useRef();
  const nicknameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();

  const didMountRef = useRef();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = '';
      if (!name) {
        _errorMessage = 'Please enter your name.';
      } else if (!validateEmail(email)) {
        _errorMessage = 'Please verify your email.';
      } else if (password.length < 6) {
        _errorMessage = 'The password must contain 6 characters at least.';
      } else if (password !== passwordConfirm) {
        _errorMessage = 'Passwords need to match.';
      } else {
        _errorMessage = '';
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
      signUp(id, password, name, nickname, email, birth, address, day);
    } catch (e) {
      Alert.alert('Signup Error', e.message);
    } finally {
      spinner.stop();
      alert("Success!\nLogin with new account!!");
      navigation.navigate('Login');
    }
  };

  signUp =  (Id, password, name, nickname, email, birth, address, day)  => {
    fetch('http://192.168.0.143:3344/login/Signup',{
      method: "post",
      headers :{
          "content-Type" : "application/json",
      },
      body : JSON.stringify({
          id : Id,
          pwd : password,
          name : name,
          nickname : nickname,
          email : email,
          birth : birth,
          address : address,
          day : day,    
      })
 }).then(response=>response.json()).then((response) => setUser(response));
};

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
      <Input
          label="Id"
          value={id}
          onChangeText={text => setId(removeWhitespace(text))}
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
          onChangeText={text => setName(removeWhitespace(text))}
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
          onChangeText={text => setEmail(removeWhitespace(text))}
          onSubmitEditing={() => nicknameRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          ref={nicknameRef}
          label="Nickname"
          value={nickname}
          onChangeText={text => setNickname(removeWhitespace(text))}
          onSubmitEditing={() => {
            setNickname(nickname.trim());
            birthRef.current.focus();
          }}
          onBlur={() => setNickname(nickname.trim())}
          placeholder="Nickname"
          returnKeyType="next"
        />
        <Input
          ref={birthRef}        
          label="Birth"
          value={birth}
          onChangeText={text => setBirth(removeWhitespace(text))}
          onSubmitEditing={() => {
            setBirth(birth.trim());
            addressRef.current.focus();
          }}
          onBlur={() => setBirth(birth.trim())}
          placeholder="Birth"
          returnKeyType="next"
        />
        <Input
          ref={addressRef}
          label="Address"
          value={address}
          onChangeText={text => setAddress(removeWhitespace(text))}
          onSubmitEditing={() => {
            setAddress(address.trim());
            dayRef.current.focus();
          }}
          onBlur={() => setAddress(address.trim())}
          placeholder="Address"
          returnKeyType="next"
        />
        <Input
          ref={dayRef}
          label="Day"
          value={day}
          onChangeText={text => setDay(removeWhitespace(text))}
          onSubmitEditing={() => {
            setDay(day.trim());
            passwordRef.current.focus();
          }}
          onBlur={() => setDay(day.trim())}
          placeholder="Day"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={text => setPassword(removeWhitespace(text))}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          placeholder="7자리이상의 비밀번호"
          returnKeyType="done"
          isPassword
        />
        <Input
          ref={passwordConfirmRef}
          label="Password Confirm"
          value={passwordConfirm}
          onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
          onSubmitEditing={_handleSignupButtonPress}
          placeholder="비밀번호 재확인"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Signup"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
        />
        <Button title="GoBack" onPress={()=>navigation.navigate('Login')}/>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
