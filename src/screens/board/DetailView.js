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

    const [data, setData] = useState();
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

    const getnewData = async () =>{
    res = await fetch('http://34.64.235.196:3344/board/Detail',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
          b_Id : route.params.data.b_Id, 
        })
    }).then(response=>response.json());
    return res[0];
    }

    const like = async () => {
      fetch('http://34.64.235.196:3344/good/Insert',{
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
    
    const unlike = async () => {
      fetch('http://34.64.235.196:3344/good/Delete',{
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
        await like();
      } catch (e) {
        Alert.alert("Error", e.message);
      }finally{
        alert("Success!\n좋아요 성공")
        setGood(true);
        res = await getnewData();
        console.log("DBTEST",res);
        navigation.dispatch(CommonActions.reset({index : 1, routes:[ {name : 'BoardList'}, {name : 'DetailView', params:{data: res, data2 : true}}]}));
      }
    };
    const unlikePressed = async () => {
      try {
        await unlike();
      } catch (e) {
        Alert.alert("Error", e.message);
      }finally{
        alert("Success!\n좋아요 취소 성공")
        setGood(false);
        res = await getnewData();
        console.log("DBTEST",res);
        navigation.dispatch(CommonActions.reset({index : 1, routes:[ {name : 'BoardList'}, {name : 'DetailView', params:{data : res, data2 : null}}]}));
      }
    };
    

    const postComment = (comment) => {
      var date = moment()
      .utcOffset('+18:00')
      .format('YYYY-MM-DD HH:mm:ss');
      console.log('post comment : '+user.usr_Id);
      fetch('http://34.64.235.196:3344/comment/insertComment',{
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

    const deleteBoard = () => {
      fetch('http://34.64.235.196:3344/board/deleteBoard',{
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

    const deletePressed = async () => {
      try {
        deleteBoard();
      } catch (e) {
        Alert.alert("Error", e.message);
      }finally{
        alert("Success!\n 게시글삭제 성공")
        navigation.dispatch(CommonActions.reset({index : 1, routes:[ {name : 'BoardList'}]}));
      }
    };
    
    const updatePressed = async () => {
      try {

      } catch (e) {
        Alert.alert("Error", e.message);
      }finally{
        navigation.dispatch(CommonActions.reset({index : 1, routes:[ {name : 'BoardList'}, {name : 'UpdateDetailView',
         params:{data:route.params.data, data2 : true}}]}));
      }
    };
    return (
      <ScrollView>
        <Container>
          <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 10 }}>
            DetailView
          </Text>
          <Container style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ fontSize: 15, textAlign: "left", marginRight: 30 }}>
              쓴 사람: {route.params.data.usr_Name}
              {"\n"}{" "}
            </Text>
            <Text style={{ fontSize: 15, textAlign: "center" }}>
              추천수: {route.params.data.b_Hits}
              {"\n"}{" "}
            </Text>
          </Container>
          <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 20 }}>
            제목: {route.params.data.b_Title}
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontFamily: "Cochin",
              marginBottom: 50,
            }}
          >
            내용:{" "}
            {route.params.data.b_Content +
              ""}
            {"\n"}{" "}
          </Text>
          <Text style={{ fontSize: 24, textAlign: "center" }}>댓글{"\n"} </Text>
          <ViewComment route={route} />
          <Input
            label="Comment"
            value={comment}
            onChangeText={(text) => setComment(text)}
            onSubmitEditing={() => {
              console.log("comment: " + comment);
              setComment(comment);
              //contentRef.current.focus();
            }}
            onBlur={() => setComment(comment)}
            placeholder="Comment"
            returnKeyType="done"
          />
          <ErrorText>{errorMessage}</ErrorText>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}>
           {route.params.data.b_Writer === user.usr_Id ?
            <View  style={{flex:1,flexDirection:'row', width: '70%', justifyContent: 'space-evenly'}}>
              <Button
                title="게시글 수정"
                onPress={updatePressed}
                containerStyle={{ width: 100, marginBottom: 20, backgroundColor:`red`, text : 'black' }} />
              <Button
                title="게시글 삭제"
                onPress={deletePressed}
                containerStyle={{ width: 100, marginBottom: 20, backgroundColor:`red`, text : 'black' }}/>
          </View> : null}
          </View>
          <View style={{flex:1,flexDirection:'row', width:'100%', justifyContent:"space-between"}}>
            {console.log("Detail View Frehsh", route)}
            {route.params.data2 == null?  <Button
            title="unlike"
            onPress={likePressed}
            containerStyle={{ width: 100, marginBottom: 20, backgroundColor:`yellow`, text : 'black' }} 
          /> :
           <Button
            title="like"
            onPress={unlikePressed}
            containerStyle={{ width: 100, marginBottom: 20, backgroundColor:`red` }}
          />
            }  
            <Button
              title="AddComment"
              onPress={_handleSignupButtonPress}
              disabled={disabled}
              containerStyle={{ width: 100, marginBottom: 20 }}
            />
            <Button
              title="BoardList"
              onPress={() => navigation.navigate("BoardList")}
              containerStyle={{ width: 100, marginBottom: 20 }}
            />
          </View>
          <View>
            <Button
              title="Home"
              onPress={() => navigation.navigate("Home")}
              containerStyle={{ width: 250 }}
            />
          </View>
        </Container>
      </ScrollView>
    );
}

export default DetailView;