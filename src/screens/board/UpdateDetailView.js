import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext, UserContext } from '../../contexts';
import styled from 'styled-components/native';
import { Input, Button } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import moment from 'moment';
import {CommonActions} from "@react-navigation/native";

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


const UpdateDetailView = ({navigation, route}) => {
    //const { dispatch } = useContext(UserContext);
    const { spinner } = useContext(ProgressContext);
     
    const { user, dispatch } = useContext(UserContext);
    const [title, setTitle] = useState(route.params.data.b_Title);
    const [content, setContent] = useState(route.params.data.b_Content);
    
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
  
    const titleRef = useRef();
    const contentRef = useRef();
    
    const didMountRef = useRef();
  
    useEffect(() => {
      if (didMountRef.current) {
        let _errorMessage = '';
        if (!title) {
          _errorMessage = 'Please enter your title.';
        } else {
          _errorMessage = '';
        }
        setErrorMessage(_errorMessage);
      } else {
        didMountRef.current = true;
      }
    }, [title]);
  
    useEffect(() => {
      setDisabled(
        !(title && !errorMessage)
      );
    }, [title]);
  
    const _handleSignupButtonPress = async () => {
      try {
        spinner.start();
        updateBoard(title,content);
      } catch (e) {
        Alert.alert('Signup Error', e.message);
      } finally {
        spinner.stop();
        alert("Success!\n 게시글이 수정되었습니다");
        //navigation.navigate('Board',{screen:'BoardList'});
        navigation.dispatch(CommonActions.reset({index : 1, routes:[ {name : 'BoardList'}]}));
      }
    };
  
  const updateBoard =  (title,content)  => {
      fetch('http://34.64.235.196:3344/board/updateBoard',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            title : title,
            content : content,
            b_Id : route.params.data.b_Id,
            b_Writer : user.usr_Id
        })
   });
  };
  
    return (
        <Container>
        <Input
            label="Title"
            value={title}
            onChangeText={text => setTitle(text)}
            onSubmitEditing={() => {
                console.log("title: "+title);
              setTitle(title);
              contentRef.current.focus();
            }}
            onBlur={() => setTitle(title)}
            placeholder="Title"
            returnKeyType="next"
          />
          <Input
            ref={contentRef}
            label="Content"
            value={content}
            onChangeText={text => setContent(text)}
            onSubmitEditing={() => {
              setContent(content);
            }}
            onBlur={() => setContent(content)}
            placeholder="Content"
            returnKeyType="done"
          />
          
          <ErrorText>{errorMessage}</ErrorText>
          <Button
            title="Signup"
            onPress={_handleSignupButtonPress}
            disabled={disabled}
          />
          <Button title="GoBack" onPress={()=>navigation.navigate('Board',{screen:'BoardList'})}/>
        </Container>
    );
  };
  


export default UpdateDetailView;