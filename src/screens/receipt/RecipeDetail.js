import React, { useState, useRef, useEffect, useContext } from "react";
import styled from 'styled-components/native'
import {Text, View, Image, Dimensions, Alert } from 'react-native'
import { Button } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {CommonActions} from "@react-navigation/native";
import { UserContext } from '../../contexts';

const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;


const RecipeDetail = ({route,navigation}) => {
    console.log("consolelog",route);
    const { user, dispatch } = useContext(UserContext);

   const [good,setGood] = useState('');

    const detail = route.params.params.detailrecipe.map( data => 
            <View style={{ textAlign: 'center', marginBottom:15}}>
            <Image source={{uri:data.img}} style={{width:'100%',height:300}} ></Image>
            <Text style={{fontSize: 15, textAlign: 'center', fontWeight:'bold'}}>{data.txt}</Text>
            </View>
        );

        const ingre = route.params.params.ingre.map( data => 
            <View style={{ textAlign: 'center', marginBottom:15}}>
            <Text style={{fontSize: 15,height:20, textAlign: 'center', fontWeight:'bold'}}>{data.ingre_name}{data.ingre_count}{data.ingre_unit}</Text>    
            </View>
        );
        
        const info = route.params.params.info.map( data => 
            <View style={{ textAlign: 'center', marginBottom:15}}>
            <Text style={{fontSize: 15,height:20, textAlign: 'center', fontWeight:'bold'}}>인분:{data.info1}</Text>
            <Text style={{fontSize: 15,height:20, textAlign: 'center', fontWeight:'bold'}}>{data.info3}{data.info2}</Text>        
            </View>
        );
        const like = () => {
            fetch('http://172.30.1.21:3344/recipegood/Insert',{
              method: "post",
              headers :{
                "content-Type" : "application/json",
              },
              body : JSON.stringify({
                  usr_Id : user.usr_Id,
                  rno : route.params.params.id,
              }) 
            });
          };
          
          const unlike = () => {
            fetch('http://172.30.1.21:3344/recipegood/Delete',{
              method: "post",
              headers :{
                "content-Type" : "application/json",
              },
              body : JSON.stringify({
                usr_Id : user.usr_Id,
                rno : route.params.params.id,
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
              navigation.dispatch(CommonActions.reset({index : 1, routes:[ {name : 'RecipeDetail'
              , params: {params:{id:route.params.params.id, summary:route.params.params.summary,
                detailrecipe:route.params.params.detailrecipe, info:route.params.params.info, ingre:route.params.params.ingre, data2:true} }}]}));
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
              navigation.dispatch(CommonActions.reset({index : 1, routes:[
             {name : 'RecipeDetail', params:{params : {id:route.params.params.id, summary:route.params.params.summary,
                detailrecipe:route.params.params.detailrecipe, info:route.params.params.info, ingre:route.params.params.ingre, data2:null}}}]}));
            }
          };

    return(
        <KeyboardAwareScrollView extraScrollHeight={20} style={{marginBottom:30}}>
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center', marginBottom:30}}> RecipeDetail </Text>
            <Text style={{fontSize: 24, textAlign : 'center'}}>요약: {route.params.params.summary}{"\n"} </Text>
            {info}
            {ingre}
            {<View>{detail}</View>}
            {console.log("Detail View Frehsh", route)}
            {route.params.params.data2 == null?  <Button
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
            <Button title="RecipeMain" onPress={()=>navigation.navigate('RecipeMain')} containerStyle={{width:250, marginBottom:20}}/>
            <Button title="Home" onPress={()=>navigation.navigate('Home')} containerStyle={{width:250}}/>
        </Container>
        </KeyboardAwareScrollView>
    )
}

export default RecipeDetail;
