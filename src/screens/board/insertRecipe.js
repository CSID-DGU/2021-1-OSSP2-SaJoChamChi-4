import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext, UserContext } from '../../contexts';
import styled from 'styled-components/native';
import { Input, Button } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import moment from 'moment';

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


const insertRecipe = ({navigation}) => {
    //const { dispatch } = useContext(UserContext);
    const { spinner } = useContext(ProgressContext);
     
    const { user, dispatch } = useContext(UserContext);
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    
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
        postBoard(title,content);
      } catch (e) {
        Alert.alert('Signup Error', e.message);
      } finally {
        spinner.stop();
        alert("Success!\nLogin with new account!!");
        navigation.navigate('Board',{screen:'BoardList'});
      }
    };
  
  const postBoard =  (title,content)  => {
    var date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss');
      console.log('title : '+title);
      fetch('http://172.30.1.12:3344/board/insertBoard',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            b_Title : title,
            b_Content : content,
            b_Time : date,
            b_Hits : 0,
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
  

/*
const insertRecipe = ({navigation}) => {
    return(
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center'}}> insertRecipe </Text>
            <Button title="Home" onPress={()=>navigation.navigate('Home')}/>
        </Container>
    )
}
*/


export default insertRecipe;