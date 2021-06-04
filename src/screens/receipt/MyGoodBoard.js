import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext, UserContext } from '../../contexts';
import styled from 'styled-components/native';
import { Button } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert, Text, View } from 'react-native';
import MyGoodBoardPresenter from './MyGoodBoardPresenter'

const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const MyGoodBoard = ({navigation}) => {
    return(
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center', marginBottom : 30}}> BoardList </Text>
            <View style={{flexDirection: 'row', width : '100%'}} >
            <Text style={{fontSize: 15,width : '50%', textAlign: 'center'}}>제목</Text>
            <Text style={{fontSize: 15, width : '20%', textAlign: 'center'}}>작성자</Text>
            <Text style={{fontSize: 15, width : '20%', textAlign: 'center'}}>작성일자</Text>
            <Text style={{fontSize: 15, width : '15%', textAlign: 'center',marginBottom : 20}}>추천</Text>
            </View>
            <MyGoodBoardPresenter navigation = {navigation} />
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', bottom : '10%',}}>
                <Button title="insertRecipe" onPress={()=>navigation.navigate('Profile')} containerStyle={{width:'45%'}}/>
                <Button title="Home" onPress={()=>navigation.navigate('Home')}containerStyle={{width:'45%'}}/>
            </View>
        </Container>
    )
}



export default MyGoodBoard;