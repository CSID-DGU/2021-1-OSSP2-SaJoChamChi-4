import React, {useState, useRef, useEffect, useContext} from 'react';
import { ProgressContext, UserContext } from '../../contexts';
import styled from 'styled-components/native'
import {ScrollView, Text, RefreshControl, View } from 'react-native'
import { Button, Input } from '../../components';
import {Alert} from 'react-native';
import moment from 'moment';
import {CommonActions} from "@react-navigation/native";
import ViewComment from './ViewComment'

const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const DetailView = ({route,navigation}) => {

    const { spinner } = useContext(ProgressContext);
    const { user, dispatch } = useContext(UserContext);

    const [comment, setComment] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [good, setGood] = useState('');

    const contentRef = useRef();
    const didMountRef = useRef();

    useEffect(() => {
      if (didMountRef.current) {
        let _errorMessage = '';
        if (!comment) {
          _errorMessage = 'No comments.';
        } else {
          _errorMessage = '';
        }
        setErrorMessage(_errorMessage);
      } else {
        didMountRef.current = true;
      }
    }, [comment]);

    useEffect(() => {
        setDisabled(
          !(comment && !errorMessage)
        );
    }, [comment]);

    const _handleSignupButtonPress = async () => {
        try {
          spinner.start();
          postComment(comment);
        } catch (e) {
          Alert.alert('Error', e.message);
        } finally {
          spinner.stop();
          alert("Success!\nNew comment!!");
          navigation.dispatch(CommonActions.reset({index : 1, routes:[ {name : 'BoardList'}, {name : 'DetailView'}]}));
        }
    };
    const like = () => {
      fetch('http://172.30.1.21:3344/good/Insert',{
        method: "post",
        headers :{
          "content-Type" : "application/json",
        },
        body : JSON.stringify({
            usr_Id : user.usr_Id,
            bno : route.params.data.b_Id,
        }) 
      });
    };
    
    const unlike = () => {
      fetch('http://172.30.1.21:3344/good/Delete',{
        method: "post",
        headers :{
          "content-Type" : "application/json",
        },
        body : JSON.stringify({
          usr_Id : user.usr_Id,
          bno : route.params.data.b_Id,
        }) 
      });
    };

    const likePressed = async () => {
      try {
        like();
      } catch (e) {
        Alert.alert("Error", e.message);
      }finally{
        alert("Success!\n좋아요 성공")
        setGood(true);
        navigation.dispatch(CommonActions.reset({index : 1, routes:[ {name : 'BoardList'}, {name : 'DetailView', params:{data2 : true}}]}));
      }
    };
    const unlikePressed = async () => {
      try {
        unlike();
      } catch (e) {
        Alert.alert("Error", e.message);
      }finally{
        alert("Success!\n좋아요 취소 성공")
        setGood(false);
        navigation.dispatch(CommonActions.reset({index : 1, routes:[ {name : 'BoardList'}, {name : 'DetailView', params:{data : route.params.data, data2 : null}}]}));
      }
    };
    

    const postComment = (comment) => {
      var date = moment()
      .utcOffset('+18:00')
      .format('YYYY-MM-DD HH:mm:ss');
      console.log('post comment : '+user.usr_Id);
      fetch('http://172.30.1.21:3344/comment/insertComment',{
        method: "post",
        headers :{
          "content-Type" : "application/json",
        },
        body : JSON.stringify({
            co_Writer : user.usr_Id,
            co_Time : date,
            co_Content : comment,
            co_Bid : route.params.data.b_Id
        }) 
      });
    };
    
    return(
      <ScrollView>
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center', marginBottom:30}}> DetailView </Text>
            <Text style={{fontSize: 24, textAlign : 'center'}}>쓴 사람: {route.params.data.usr_Name}{"\n"} </Text>
            <Text style={{fontSize: 24, textAlign : 'center'}}>추천수: {route.params.data.b_Hits}{"\n"}  </Text>
            <Text style={{fontSize: 24, textAlign : 'center'}}>제목: {route.params.data.b_Title}{"\n"}  </Text>
            <Text style={{fontSize: 24, textAlign : 'center'}}>내용: {route.params.data.b_Content}{"\n"} </Text>
            <Text style={{fontSize: 24, textAlign : 'center'}}>댓글{"\n"} </Text>
            <ViewComment route = {route} navigation = {navigation}/>
            <Input
              label="Comment"
              value={comment}
              onChangeText={text => setComment(text)}
              onSubmitEditing={() => {
                console.log("comment: "+comment);
                setComment(comment);
                //contentRef.current.focus();
              }}
              onBlur={() => setComment(comment)}
              placeholder="Comment"
              returnKeyType="done"
            />
            <ErrorText>{errorMessage}</ErrorText>
            <View>
              {console.log("Detail View Frehsh", route)}
            {route.params.data2 == null?  <Button
            title="좋아요"
            onPress={likePressed}
            containerStyle={{ width: 250, marginBottom: 20, backgroundColor:`yellow`, text : 'black' }} 

          /> :
           <Button
            title="좋아요취소"
            onPress={unlikePressed}
            containerStyle={{ width: 250, marginBottom: 20, backgroundColor:`red` }}
          />
            } 
              <Button title="AddComment" onPress={_handleSignupButtonPress} disabled={disabled} containerStyle={{width:250, marginBottom:20}}/>
              <Button title="BoardList" onPress={()=>navigation.dispatch(CommonActions.reset({index : 1, routes:[ {name : 'BoardList'}]}))} containerStyle={{width:250, marginBottom:20}}/>
              <Button title="Home" onPress={()=>navigation.navigate('Home')} containerStyle={{width:250}}/>
            </View>
        </Container>
      </ScrollView>
    )
}

export default DetailView;