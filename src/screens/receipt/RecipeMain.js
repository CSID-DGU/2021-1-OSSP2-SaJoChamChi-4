import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Button } from '../../components';
import { Alert, Text , View } from 'react-native';
import RecipePresenter from './RecipePresenter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;



const RecipeMain = ({navigation}) => {

    return(
        <KeyboardAwareScrollView extraScrollHeight={20} style={{marginBottom:30}}>
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center'}}> RecipeMain </Text>
            <RecipePresenter navigation = {navigation}/>
            <Button title="Home" onPress={()=>navigation.navigate('Home')}/>
        </Container>
        </KeyboardAwareScrollView>
    )
}

export default RecipeMain;