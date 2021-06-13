import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Button } from '../../components';
import { Alert, Text , View,  Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MyGoodRecipePresenter from './MyGoodRecipePresenter';

const Container = styled.View`
    flex : 3;
    width : 100%;
    background-color: ${({theme}) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;



const MyGoodRecipe = ({navigation}) => {
    var {height, width} = Dimensions.get('window');

    return(
        <Container>
        <KeyboardAwareScrollView extraScrollHeight={20} style={{marginBottom:30, width:width}}>
            <Text style={{fontSize: 30, textAlign : 'center', fontWeight:'bold', backgroundColor:'#3498db', color:'white'}}> 내가 좋아요 누른 레시피 리스트 </Text>
            <MyGoodRecipePresenter navigation = {navigation}/>
        </KeyboardAwareScrollView>
        <View style={{flexDirection: 'row', marginBottom:5}}>
            <Button title="Home" onPress={()=>navigation.navigate('Home')} containerStyle={{width:130, marginBottom:20}}/>
        </View>
        </Container>
    )
}

export default MyGoodRecipe;