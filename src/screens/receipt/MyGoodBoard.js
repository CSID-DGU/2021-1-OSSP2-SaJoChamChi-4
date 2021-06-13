import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext, UserContext } from '../../contexts';
import styled from 'styled-components/native';
import { Button } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert, Text, View } from 'react-native';
import MyGoodBoardPresenter from './MyGoodBoardPresenter'

const Container = styled.View`
    flex : 1;
    background-color: '#ff00ff';
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    padding: 0 20px;
`;

const MyGoodBoard = ({navigation}) => {
    return(
        <View style={{flex: 1, padding: 20, alignContent: 'center'}}>
            <View>
                <Text style={{fontSize: 28, textAlign : 'center', fontWeight:'bold', color:'black',marginBottom:20}}> 내가 좋아요 누른 게시글 리스트 </Text>
            </View>
            <View style={{ flexDirection: 'row', width : '100%'}} >
                <Text style={{fontSize: 15,width : '50%', textAlign: 'center'}}>제목</Text>
                <Text style={{fontSize: 15, width : '20%', textAlign: 'center'}}>작성자</Text>
                <Text style={{fontSize: 15, width : '20%', textAlign: 'center'}}>작성일자</Text>
                <Text style={{fontSize: 15, width : '15%', textAlign: 'center',marginBottom : 20}}>추천</Text>
            </View>
            <View style={{flex: 1}}>
                <KeyboardAwareScrollView extraHeight={20}>
                    <MyGoodBoardPresenter navigation = {navigation} />
                </KeyboardAwareScrollView>
            </View>
            <View style={{marginBottom:40, flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button title="Profile" onPress={()=>navigation.navigate('Profile')} containerStyle={{width:'45%'}}/>
                <Button title="Home" onPress={()=>navigation.navigate('Home')}containerStyle={{width:'45%'}}/>
            </View>
        </View>
    )
}



export default MyGoodBoard;